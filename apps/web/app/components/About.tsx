'use client';

import { Code, Lightbulb, Users, Zap } from 'lucide-react';

export function About() {
  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full Stack Development",
      description: "Expert in modern web technologies including React, Node.js, and TypeScript"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "AI & Machine Learning",
      description: "Building intelligent applications with TensorFlow and modern ML frameworks"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Leadership",
      description: "Leading development teams and mentoring junior developers"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance Optimization",
      description: "Optimizing applications for speed, scalability, and user experience"
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            I'm a passionate full-stack developer with over 1 year of experience building 
            scalable web applications and AI-powered solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              My journey in software development began with a curiosity about how things work 
              under the hood. Today, I specialize in creating innovative solutions that bridge 
              the gap between complex technology and user-friendly experiences.
            </p>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              I'm particularly passionate about AI and machine learning, and I love exploring 
              how these technologies can be integrated into web applications to create more 
              intelligent and personalized user experiences.
            </p>

            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              When I'm not coding, you can find me contributing to open-source projects, 
              writing technical articles, or exploring the latest developments in web 
              technologies and artificial intelligence.
            </p>

            <div className="pt-6">
              <a
                href="/resume.pdf"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Right Column - Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200 dark:border-slate-700"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  {highlight.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

