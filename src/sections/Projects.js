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
    <section id="projects" className="section-cinematic bg-[#0a0a0a] relative">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(201, 162, 39, 0.03) 0%, transparent 50%)',
        }}
      />

      <div className="container px-4 mx-auto relative z-10">
        {/* Section Header */}
        <div className="section-header mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="section-number"
          >
            02
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-cinzel text-white tracking-[0.1em]"
          >
            Projects
          </motion.h2>
          <div className="divider-gold" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/50 font-raleway tracking-wider max-w-xl mx-auto mt-4"
          >
            Explore my work on{' '}
            <a
              href="https://github.com/HarshaKTM"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a227] hover:underline"
            >
              GitHub
            </a>
          </motion.p>
        </div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {allTags.map((tag, index) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-5 py-2 font-raleway text-xs tracking-[0.15em] uppercase transition-all duration-300 border ${filter === tag
                  ? 'bg-[#c9a227] text-[#0a0a0a] border-[#c9a227]'
                  : 'bg-transparent text-white/60 border-white/20 hover:border-[#c9a227] hover:text-[#c9a227]'
                }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="project-card group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                {/* Hover overlay with links */}
                <div className="absolute inset-0 bg-[#0a0a0a]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-[#c9a227] hover:text-[#c9a227] transition-colors"
                    aria-label={`GitHub repository for ${project.name}`}
                  >
                    <FiGithub size={20} />
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-[#c9a227] hover:text-[#c9a227] transition-colors"
                      aria-label={`Live demo for ${project.name}`}
                    >
                      <FiExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-cinzel text-xl text-white mb-3 tracking-wide">
                  {project.name}
                </h3>
                <p className="text-white/50 font-raleway text-sm mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-[0.65rem] font-raleway tracking-wider uppercase border border-white/10 text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-white/30 font-raleway">
                  <div className="flex items-center gap-1">
                    <FiStar size={12} />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiGitBranch size={12} />
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