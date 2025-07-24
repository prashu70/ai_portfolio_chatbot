<<<<<<< HEAD
# ai_portfolio_chatbot
=======
# AI-Powered Portfolio Chatbot

A modern portfolio website with an integrated AI chatbot that can answer questions about skills, experience, and projects. Built with Next.js, Node.js, PostgreSQL, and WebSockets.

## 🚀 Features

- **Modern Portfolio Website**: Clean, responsive design showcasing skills, projects, and experience
- **AI-Powered Chatbot**: Interactive chatbot that can answer questions about the portfolio owner
- **Real-time Communication**: WebSocket-based chat for instant responses
- **Persistent Conversations**: Chat history is saved and can be resumed
- **Professional UI**: Modern, mobile-friendly interface with smooth animations
- **Database Integration**: PostgreSQL with Prisma ORM for data management

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, CSS3
- **Backend**: Node.js, Express, Socket.IO
- **Database**: PostgreSQL, Prisma ORM
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Real-time**: WebSockets for chat functionality

## 📁 Project Structure

```
ai-portfolio-chatbot/
├── apps/
│   ├── web/                 # Next.js frontend application
│   │   ├── app/
│   │   │   ├── components/  # React components
│   │   │   │   └── Chatbot.tsx
│   │   │   ├── globals.css  # Global styles
│   │   │   ├── layout.tsx   # App layout
│   │   │   └── page.tsx     # Main portfolio page
│   │   └── package.json
│   └── backend/             # Node.js backend service
│       ├── src/
│       │   └── index.ts     # Main server file
│       ├── prisma/
│       │   ├── schema.prisma # Database schema
│       │   └── seed.ts      # Database seeding
│       └── package.json
├── packages/                # Shared packages
├── turbo.json              # Turborepo configuration
└── package.json            # Root package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 12+
- pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-portfolio-chatbot
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up PostgreSQL**
   ```bash
   # Install PostgreSQL (Ubuntu/Debian)
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   
   # Start PostgreSQL service
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   
   # Create database and user
   sudo -u postgres createdb portfolio_chatbot
   sudo -u postgres psql -c "CREATE USER portfolio_user WITH PASSWORD 'portfolio_password';"
   sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE portfolio_chatbot TO portfolio_user;"
   ```

4. **Configure environment variables**
   ```bash
   # Create .env file in apps/backend/
   cd apps/backend
   cat > .env << EOF
   DATABASE_URL="postgresql://portfolio_user:portfolio_password@localhost:5432/portfolio_chatbot?schema=public"
   PORT=3001
   NODE_ENV=development
   EOF
   ```

5. **Set up the database**
   ```bash
   # Generate Prisma client and push schema
   cd apps/backend
   npx prisma generate
   npx prisma db push
   
   # Seed the database with sample data
   npm run db:seed
   ```

6. **Start the development servers**
   ```bash
   # Terminal 1: Start backend server
   cd apps/backend
   npm run dev
   
   # Terminal 2: Start frontend server
   cd apps/web
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3002
   - Backend API: http://localhost:3001

## 💬 Using the Chatbot

1. **Open the portfolio website** at http://localhost:3002
2. **Click the chat button** (💬) in the bottom-right corner
3. **Start chatting!** Ask questions like:
   - "What are Prashu's main skills?"
   - "Tell me about his projects"
   - "How can I contact Prashu?"
   - "What's his experience with React?"

## 🎯 Key Features Explained

### AI Chatbot Integration

The chatbot uses WebSocket connections for real-time communication:

- **Frontend**: React component with Socket.IO client
- **Backend**: Express server with Socket.IO for WebSocket handling
- **AI Responses**: Context-aware responses based on portfolio data
- **Persistence**: Conversations are saved to PostgreSQL database

### Database Schema

The application uses the following main entities:

- **Skills**: Technical skills with proficiency levels
- **Projects**: Portfolio projects with descriptions and links
- **Experience**: Work experience and education
- **Conversations**: Chat sessions and message history

### WebSocket Events

- `join_session`: Join a chat session
- `chat_message`: Send a message
- `ai_response`: Receive AI response
- `session_joined`: Session confirmation with history

## 🔧 Customization

### Updating Portfolio Data

1. **Edit the seed file**: `apps/backend/prisma/seed.ts`
2. **Update with your information**: skills, projects, experience, contact details
3. **Re-seed the database**: `npm run db:seed`

### Styling the Interface

- **Global styles**: `apps/web/app/globals.css`
- **Chatbot styles**: Inline styles in `apps/web/app/components/Chatbot.tsx`
- **Portfolio layout**: `apps/web/app/page.tsx`

### AI Response Logic

The AI responses are generated in `apps/backend/src/index.ts` in the `generateAIResponse` function. You can customize the logic to:

- Add more sophisticated NLP
- Integrate with external AI services
- Implement more complex conversation flows

## 🚀 Deployment

### Frontend Deployment

The frontend can be deployed as a static Next.js application:

```bash
cd apps/web
npm run build
# Deploy the 'out' or '.next' directory to your hosting service
```

### Backend Deployment

The backend requires a Node.js environment with PostgreSQL:

1. **Set up production database**
2. **Configure environment variables**
3. **Deploy to your preferred platform** (Heroku, DigitalOcean, AWS, etc.)

### Environment Variables for Production

```bash
DATABASE_URL="postgresql://user:password@host:port/database"
PORT=3001
NODE_ENV=production
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Portfolio website loads correctly
- [ ] Chatbot button appears and is clickable
- [ ] Chat window opens with welcome message
- [ ] Messages can be sent and received
- [ ] AI responses are contextually appropriate
- [ ] Conversation history is maintained
- [ ] WebSocket connection is stable
- [ ] Mobile responsiveness works

### API Testing

Test the backend endpoints:

```bash
# Health check
curl http://localhost:3001/health

# Get portfolio data
curl http://localhost:3001/api/portfolio
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for interactive portfolio experiences
- Demonstrates AI integration in web applications

---

**Note**: This is a demonstration project showcasing AI-powered chatbot integration in a portfolio website. Customize the content, styling, and functionality to match your specific needs.

>>>>>>> d57b6ca (my first commit)
