'use client';

import { useEffect, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  current: boolean;
}

export function Experience() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/portfolio');
        const data = await response.json();
        setExperiences(data.experiences || []);
      } catch (error) {
        console.error('Error fetching experience:', error);
        // Fallback data
        setExperiences([
          {
            id: '1',
            company: 'Tech Innovations Corp',
            position: 'Senior Full Stack Developer',
            duration: '2022 - Present',
            description: 'Leading development of AI-powered web applications using React, Node.js, and machine learning technologies. Architected and built scalable microservices handling 100k+ daily users.',
            current: true
          },
          {
            id: '2',
            company: 'StartupXYZ',
            position: 'Full Stack Developer',
            duration: '2020 - 2022',
            description: 'Built and maintained multiple web applications using modern tech stack. Collaborated with cross-functional teams to deliver high-quality products on tight deadlines.',
            current: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Work Experience
            </h2>
            <div className="animate-pulse">Loading experience...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Work Experience
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            My professional journey and the impact I've made at various organizations.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative flex items-start">
                {/* Timeline Dot */}
                <div className={`absolute left-6 w-4 h-4 rounded-full border-4 ${
                  experience.current 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'bg-white dark:bg-slate-800 border-blue-400'
                }`}></div>

                {/* Content */}
                <div className="ml-16 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                        {experience.position}
                      </h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                        {experience.company}
                      </p>
                    </div>
                    
                    <div className="flex items-center text-slate-500 dark:text-slate-400 mt-2 sm:mt-0">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">{experience.duration}</span>
                      {experience.current && (
                        <span className="ml-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {experience.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
            Interested in working together?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
}

