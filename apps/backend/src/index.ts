import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const prisma = new PrismaClient();
const PORT = parseInt(process.env.PORT || '3001');

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Portfolio Chatbot Backend is running' });
});

// Get user portfolio data
app.get('/api/portfolio', async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      include: {
        skills: true,
        experiences: {
          orderBy: { startDate: 'desc' }
        },
        projects: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get featured projects
app.get('/api/projects/featured', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get skills by category
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { level: 'desc' }]
    });
    
    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category]!.push(skill);
      return acc;
    }, {} as Record<string, typeof skills>);

    res.json(groupedSkills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get conversation history
app.get('/api/conversations/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const conversation = await prisma.conversation.findUnique({
      where: { sessionId },
      include: {
        messages: {
          orderBy: { timestamp: 'asc' }
        }
      }
    });

    if (!conversation) {
      return res.json({ messages: [] });
    }

    res.json(conversation);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  let sessionId: string = '';

  socket.on('join_session', async (data) => {
    sessionId = data.sessionId || uuidv4();
    socket.join(sessionId);
    
    // Create or get conversation
    let conversation = await prisma.conversation.findUnique({
      where: { sessionId: sessionId },
      include: { messages: { orderBy: { timestamp: 'asc' } } }
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: { sessionId: sessionId },
        include: { messages: true }
      });
    }

    socket.emit('session_joined', { 
      sessionId, 
      messages: conversation.messages 
    });
  });

  socket.on('chat_message', async (data) => {
    if (!sessionId) {
      socket.emit('error', { message: 'No session found' });
      return;
    }

    try {
      // Get conversation
      const conversation = await prisma.conversation.findUnique({
        where: { sessionId: sessionId }
      });

      if (!conversation) {
        socket.emit('error', { message: 'Conversation not found' });
        return;
      }

      // Save user message
      const userMessage = await prisma.message.create({
        data: {
          content: data.message,
          role: 'USER',
          conversationId: conversation.id
        }
      });

      // Generate AI response
      const aiResponse = await generateAIResponse(data.message, sessionId);
      
      // Save AI response
      const aiMessage = await prisma.message.create({
        data: {
          content: aiResponse,
          role: 'ASSISTANT',
          conversationId: conversation.id
        }
      });

      // Emit both messages to the client
      socket.emit('message_saved', userMessage);
      socket.emit('ai_response', aiMessage);
      
    } catch (error) {
      console.error('Error handling chat message:', error);
      socket.emit('error', { message: 'Failed to process message' });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Enhanced AI response function with database context
async function generateAIResponse(message: string, sessionId: string): Promise<string> {
  const lowerMessage = message.toLowerCase();
  
  try {
    // Get portfolio data for context
    const user = await prisma.user.findFirst({
      include: {
        skills: true,
        experiences: true,
        projects: true
      }
    });

    if (!user) {
      return "I'm sorry, I couldn't find the portfolio information right now. Please try again later.";
    }

    // Get conversation history for context
    const conversation = await prisma.conversation.findUnique({
      where: { sessionId },
      include: {
        messages: {
          orderBy: { timestamp: 'desc' },
          take: 5 // Last 5 messages for context
        }
      }
    });

    if (lowerMessage.includes('skills') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
      const skillsByCategory = user.skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category]!.push(`${skill.name} (${skill.level})`);
        return acc;
      }, {} as Record<string, string[]>);

      let response = `${user.name} has expertise in various technologies:\n\n`;
      Object.entries(skillsByCategory).forEach(([category, skills]) => {
        response += `**${category}**: ${skills.join(', ')}\n`;
      });
      response += `\nI'm particularly strong in React, TypeScript, and Node.js, and I'm always learning new technologies!`;
      return response;
    }

    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
      const currentJob = user.experiences.find(exp => exp.current);
      const totalExperience = user.experiences.length;
      
      let response = `${user.name} has ${totalExperience} professional experiences:\n\n`;
      
      if (currentJob) {
        response += `**Currently**: ${currentJob.position} at ${currentJob.company} (${currentJob.duration})\n`;
        response += `${currentJob.description}\n\n`;
      }
      
      const pastJobs = user.experiences.filter(exp => !exp.current).slice(0, 2);
      if (pastJobs.length > 0) {
        response += `**Previous roles**:\n`;
        pastJobs.forEach(exp => {
          response += `• ${exp.position} at ${exp.company} (${exp.duration})\n`;
        });
      }
      
      return response;
    }

    if (lowerMessage.includes('projects') || lowerMessage.includes('portfolio') || lowerMessage.includes('built')) {
      const featuredProjects = user.projects.filter(p => p.featured);
      const allProjects = user.projects;
      
      let response = `${user.name} has built ${allProjects.length} projects. Here are the featured ones:\n\n`;
      
      featuredProjects.forEach(project => {
        response += `**${project.name}**\n`;
        response += `${project.description}\n`;
        response += `Technologies: ${project.technologies.join(', ')}\n`;
        if (project.liveUrl) response += `Live: ${project.liveUrl}\n`;
        if (project.githubUrl) response += `GitHub: ${project.githubUrl}\n`;
        response += `\n`;
      });
      
      return response;
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('email')) {
      return `I'd love to hear from you! You can reach ${user.name} at ${user.email}. I'm always open to discussing new opportunities, collaborations, or just chatting about technology!`;
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hello! I'm ${user.name}'s AI assistant. I can help you learn about my skills, experience, projects, or how to get in touch. What would you like to know?`;
    }

    if (lowerMessage.includes('about') || lowerMessage.includes('who')) {
      return `${user.name} is a ${user.title}. ${user.bio}\n\nI love building innovative solutions and I'm always excited to take on new challenges. What specific aspect would you like to know more about?`;
    }

    // Default response with context awareness
    const recentTopics = conversation?.messages
      .filter(m => m.role === 'USER')
      .slice(0, 3)
      .map(m => m.content.toLowerCase());

    if (recentTopics?.some(topic => topic.includes('project'))) {
      return "Would you like to know more details about any specific project? I can tell you about the technologies used, challenges faced, or the impact of the work.";
    }

    return `That's an interesting question! I can help you learn about ${user.name}'s skills, experience, projects, or how to get in touch. I can also provide more specific details about any particular area you're curious about. What would you like to explore?`;
    
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I'm sorry, I encountered an error while processing your question. Please try again.";
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

