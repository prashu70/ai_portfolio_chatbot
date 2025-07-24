'use client';

import { useEffect, useState } from 'react';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: string;
}

interface SkillsData {
  [category: string]: Skill[];
}

export function Skills() {
  const [skills, setSkills] = useState<SkillsData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/skills');
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
        // Fallback data
        setSkills({
          'Frontend': [
            { id: '1', name: 'React', category: 'Frontend', level: 'Expert' },
            { id: '2', name: 'Next.js', category: 'Frontend', level: 'Advanced' },
            { id: '3', name: 'Tailwind CSS', category: 'Frontend', level: 'Advanced' },
          ],
          'Backend': [
            { id: '4', name: 'Node.js', category: 'Backend', level: 'Advanced' },
            { id: '5', name: 'Express', category: 'Backend', level: 'Advanced' },
          ],
          'Language': [
            { id: '6', name: 'TypeScript', category: 'Language', level: 'Advanced' },
            { id: '7', name: 'Python', category: 'Language', level: 'Advanced' },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert':
        return 'bg-green-500';
      case 'advanced':
        return 'bg-blue-500';
      case 'intermediate':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert':
        return 'w-full';
      case 'advanced':
        return 'w-4/5';
      case 'intermediate':
        return 'w-3/5';
      default:
        return 'w-2/5';
    }
  };

  if (loading) {
    return (
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Skills & Technologies
            </h2>
            <div className="animate-pulse">Loading skills...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, categorySkills]) => (
            <div
              key={category}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 text-center">
                {category}
              </h3>
              
              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {skill.level}
                      </span>
                    </div>
                    
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${getLevelColor(skill.level)} ${getLevelWidth(skill.level)}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div className="mt-12 text-center">
          <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">
            Other Technologies I Work With
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {['Git', 'Docker', 'AWS', 'MongoDB', 'Redis', 'GraphQL', 'Jest', 'Cypress'].map((tech) => (
              <span
                key={tech}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

