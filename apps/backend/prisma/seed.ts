import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      title: 'Full Stack Developer & AI Enthusiast',
      email: 'john.doe@example.com',
      bio: 'Passionate full-stack developer with 4+ years of experience building scalable web applications and AI-powered solutions. I love creating innovative products that solve real-world problems.',
      avatar: '/images/avatar.jpg',
    },
  });

  // Create skills
  const skills = [
    { name: 'React', category: 'Frontend', level: 'Expert' },
    { name: 'Next.js', category: 'Frontend', level: 'Advanced' },
    { name: 'TypeScript', category: 'Language', level: 'Advanced' },
    { name: 'Node.js', category: 'Backend', level: 'Advanced' },
    { name: 'Express', category: 'Backend', level: 'Advanced' },
    { name: 'PostgreSQL', category: 'Database', level: 'Intermediate' },
    { name: 'Prisma', category: 'Database', level: 'Intermediate' },
    { name: 'Python', category: 'Language', level: 'Advanced' },
    { name: 'TensorFlow', category: 'AI/ML', level: 'Intermediate' },
    { name: 'Docker', category: 'DevOps', level: 'Intermediate' },
    { name: 'AWS', category: 'Cloud', level: 'Intermediate' },
    { name: 'Tailwind CSS', category: 'Frontend', level: 'Advanced' },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { id: `${user.id}-${skill.name}` },
      update: {},
      create: {
        ...skill,
        userId: user.id,
      },
    });
  }

  // Create experiences
  const experiences = [
    {
      company: 'Tech Innovations Corp',
      position: 'Senior Full Stack Developer',
      duration: '2022 - Present',
      description: 'Leading development of AI-powered web applications using React, Node.js, and machine learning technologies. Architected and built scalable microservices handling 100k+ daily users.',
      startDate: new Date('2022-01-01'),
      current: true,
    },
    {
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      duration: '2020 - 2022',
      description: 'Built and maintained multiple web applications using modern tech stack. Collaborated with cross-functional teams to deliver high-quality products on tight deadlines.',
      startDate: new Date('2020-06-01'),
      endDate: new Date('2021-12-31'),
      current: false,
    },
    {
      company: 'Digital Solutions Inc',
      position: 'Frontend Developer',
      duration: '2019 - 2020',
      description: 'Developed responsive web interfaces using React and modern CSS frameworks. Improved application performance by 40% through code optimization and best practices.',
      startDate: new Date('2019-03-01'),
      endDate: new Date('2020-05-31'),
      current: false,
    },
  ];

  for (const experience of experiences) {
    await prisma.experience.create({
      data: {
        ...experience,
        userId: user.id,
      },
    });
  }

  // Create projects
  const projects = [
    {
      name: 'AI-Powered Chatbot Platform',
      description: 'Built an intelligent chatbot platform using NLP and machine learning that can understand context and provide personalized responses. Features include conversation memory, sentiment analysis, and multi-language support.',
      technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://github.com/johndoe/ai-chatbot-platform',
      liveUrl: 'https://chatbot-demo.johndoe.dev',
      featured: true,
    },
    {
      name: 'E-commerce Analytics Dashboard',
      description: 'Developed a comprehensive analytics dashboard for e-commerce businesses with real-time data visualization, sales forecasting, and customer behavior analysis.',
      technologies: ['React', 'D3.js', 'Express', 'MongoDB', 'Redis', 'AWS'],
      githubUrl: 'https://github.com/johndoe/ecommerce-dashboard',
      liveUrl: 'https://analytics.johndoe.dev',
      featured: true,
    },
    {
      name: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Socket.io'],
      githubUrl: 'https://github.com/johndoe/task-manager',
      liveUrl: 'https://tasks.johndoe.dev',
      featured: false,
    },
    {
      name: 'Weather Prediction API',
      description: 'Machine learning-powered weather prediction API that provides accurate forecasts using historical data and advanced algorithms.',
      technologies: ['Python', 'FastAPI', 'Scikit-learn', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://github.com/johndoe/weather-api',
      featured: false,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({
      data: {
        ...project,
        userId: user.id,
      },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

