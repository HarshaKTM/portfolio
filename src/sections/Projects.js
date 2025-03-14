import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from 'react-icons/fi';
import githubProjects from '../data/githubProjects';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Get all unique tags from projects
  const allTags = ['All', ...new Set(githubProjects.flatMap(project => project.tags))];
  
  useEffect(() => {
    if (filter === 'All') {
      setFilteredProjects(githubProjects);
    } else {
      setFilteredProjects(githubProjects.filter(project => 
        project.tags.includes(filter)
      ));
    }
  }, [filter]);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            My GitHub Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Check out my latest projects on <a 
              href="https://github.com/HarshaKTM" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              GitHub
            </a>
          </motion.p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {allTags.map((tag, index) => (
            <motion.button
              key={tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              viewport={{ once: true }}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex space-x-3">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white bg-gray-900/80 hover:bg-gray-900 p-2 rounded-full transition-colors duration-200"
                      aria-label={`GitHub repository for ${project.name}`}
                    >
                      <FiGithub size={18} />
                    </a>
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white bg-blue-600/80 hover:bg-blue-600 p-2 rounded-full transition-colors duration-200"
                        aria-label={`Live demo for ${project.name}`}
                      >
                        <FiExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center mr-4">
                    <FiStar className="mr-1" />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center">
                    <FiGitBranch className="mr-1" />
                    <span>{project.forks}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 