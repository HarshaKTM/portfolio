import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { projects } from '../utils/projects';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import Image from 'next/image';

export default function Projects() {
  const { darkMode } = useTheme();

  return (
    <Layout>
      <div className={`min-h-screen py-12 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'} mb-8`}>
              Projects
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-lg overflow-hidden shadow-lg ${
                    darkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white hover:bg-gray-50'
                  } transition-all duration-300`}
                >
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-semibold mb-2 ${
                      darkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>
                      {project.title}
                    </h3>
                    <p className={`mb-4 ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>
                    <div className="flex space-x-4">
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center ${
                          darkMode 
                            ? 'text-blue-400 hover:text-blue-300' 
                            : 'text-blue-600 hover:text-blue-700'
                        }`}
                      >
                        <FiExternalLink className="mr-2" />
                        Demo
                      </a>
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center ${
                          darkMode 
                            ? 'text-gray-300 hover:text-gray-100' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        <FiGithub className="mr-2" />
                        Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 