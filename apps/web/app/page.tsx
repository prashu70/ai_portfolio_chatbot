import { Chatbot } from './components/Chatbot';

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="hero">
          <h1>Prasanth Kumar</h1>
          <p>Full Stack Developer & AI Enthusiast</p>
          <a href="#contact" className="btn">Get In Touch</a>
        </div>
        
        <div className="card">
          <h2>About Me</h2>
          <p>
            Full Stack Developer skilled in Next.js, Node.js, PostgreSQL, and TypeScript, with a solid foundation in Data Science. I build scalable, real-time web apps using Prisma, Socket.IO, and Tailwind CSS, and apply tools like Pandas, NumPy, and Seaborn for data analysis and visualization. Passionate about clean code, smart systems, and data-driven solutions.
          </p>
        </div>
        
        <div className="card">
          <h2>Skills</h2>
          <ul>
            <li>React & Next.js</li>
            <li>Node.js & Express</li>
            <li>TypeScript</li>
            <li>PostgreSQL & Prisma</li>
            <li>Python</li>
            <li>Data Analysis (Pandas, NumPy)</li>
            <li>Data Visualization (Matplotlib, Seaborn)</li>
            <li>Statistics, Probability</li>
          </ul>
        </div>
        
        <div className="card">
          <h2>Featured Projects</h2>
          <div>
            <h3>AI-Powered Portfolio Chatbot :</h3> <a href="https://github.com/prashu70/ai_portfolio_chatbot.git" target="_blank" rel="noopener noreferrer">Link</a>
            <p>An interactive chatbot integrated into my portfolio, designed to answer questions about my skills, projects, and experience. Built using Next.js, Node.js, Socket.IO, it delivers real-time, intelligent responses and enhances user engagement. Backend uses PostgreSQL with Prisma ORM for data management, and a responsive UI with Tailwind CSS.</p>
          </div>
          <div>
            <h3>Food Delivery App :</h3> <a href="https://github.com/prashu70/food-delivery-app.git" target="_blank" rel="noopener noreferrer">Link</a>
            <p>The Food Delivery App is a full-stack web application that allows users to browse menus, place orders, and track deliveries in real time. Built using React, Node.js, and Express.js, the app features a clean and responsive user interface powered by Tailwind CSS. It uses PostgreSQL for structured data management, storing user profiles, order details, and menu items. The project includes secure user authentication, dynamic cart functionality, and role-based access for both customers and admins, enabling seamless order placement and admin-level control for menu and order management.</p>
          </div>
          <div>
            <h3>Customer Purchase Behavior :</h3> <a href="https://github.com/prashu70/customer_purchase_behavior_eda.git" target="_blank" rel="noopener noreferrer">Link</a>
            <p>The Customer Purchase Behavior EDA project explores consumer purchasing patterns using Python-based data analysis. It leverages tools like Pandas, NumPy, Matplotlib, and Seaborn to perform exploratory data analysis (EDA) on transaction datasets. The project uncovers trends in customer spending, product preferences, and seasonal buying behavior, while applying statistical techniques, distributions, and hypothesis testing to extract meaningful insights and guide business decisions.</p>
          </div>
        </div>
        
        <div className="card" id="contact">
          <h2>Contact</h2>
          <p>Email: prashu1432004@gmail.com</p>
          <p>Phone: +91 9573734836</p>
          <p>Location: Rajahmundry</p>
          <p style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #0ea5e9', color: '#0c4a6e' }}>
            💡 <strong>Try the AI chatbot!</strong> Click the chat button in the bottom right corner to ask questions about my experience, skills, and projects.
          </p>
        </div>
      </div>
      
      <Chatbot />
    </>
  );
}

