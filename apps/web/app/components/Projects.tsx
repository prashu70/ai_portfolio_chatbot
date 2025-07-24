'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/portfolio');
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback data
        setProjects([
          {
            id: '1',
            name: 'AI-Powered Chatbot Platform',
            description: 'Built an intelligent chatbot platform using NLP and machine learning that can understand context and provide personalized responses.',
            technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'PostgreSQL'],
            githubUrl: 'https://github.com/prashu70/ai-chatbot-platform',
            liveUrl: 'https://chatbot-demo.prashu.dev',
            featured: true
          },
          {
            id: '2',
            name: 'E-commerce Analytics Dashboard',
            description: 'Developed a comprehensive analytics dashboard for e-commerce businesses with real-time data visualization.',
            technologies: ['React', 'D3.js', 'Express', 'MongoDB'],
            githubUrl: 'https://github.com/prashu/ecommerce-dashboard',
            liveUrl: 'https://analytics.prashu.dev',
            featured: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Featured Projects
            </h2>
            <div className="animate-pulse">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A showcase of my recent work and the technologies I've used to build them.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Project Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {project.name}
                  </h3>
                  {project.featured && (
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  )}
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {projects.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {showAll ? 'Show Less' : `Show All Projects (${projects.length})`}
            </button>
          </div>
        )}

        {/* GitHub CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
            Want to see more of my work?
          </p>
          <a
            href="https://github.com/prashu70"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            <Github className="w-5 h-5 mr-2" />
            View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}

