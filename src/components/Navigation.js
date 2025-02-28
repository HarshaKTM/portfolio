import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiTwitter, FiGithub, FiLinkedin, FiInstagram, FiMenu, FiX } from 'react-icons/fi';
import { FaPinterest } from 'react-icons/fa';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const { darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path) => router.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/articles', label: 'Articles' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? `${darkMode ? 'bg-black/90 shadow-lg backdrop-blur-sm' : 'bg-white/90 shadow-lg backdrop-blur-sm'}` 
        : `${darkMode ? 'bg-black' : 'bg-white'}`
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Left side - Logo */}
          <Link href="/" className="text-2xl font-bold">
            <div className={`w-12 h-12 ${
              darkMode ? 'bg-white text-black' : 'bg-black text-white'
            } rounded-full flex items-center justify-center transition-colors duration-300`}>
              HK
            </div>
          </Link>

          {/* Center - Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ path, label }) => (
              <Link 
                key={path}
                href={path}
                className={`relative px-2 py-1 transition-colors duration-300 ${
                  darkMode 
                    ? 'text-gray-100 hover:text-white' 
                    : 'text-gray-800 hover:text-black'
                } ${isActive(path) ? 'font-bold' : ''}`}
              >
                <span>{label}</span>
                {isActive(path) && (
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                    darkMode ? 'bg-blue-500' : 'bg-black'
                  }`}></span>
                )}
              </Link>
            ))}
          </div>

          {/* Right side - Social Links & Theme Toggle (Desktop) */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-6">
              {/* Social icons */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-100' : 'text-gray-600'} hover:text-blue-400 transition-colors`}>
                <FiTwitter size={24} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-100' : 'text-gray-600'} hover:text-gray-300 transition-colors`}>
                <FiGithub size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-100' : 'text-gray-600'} hover:text-blue-400 transition-colors`}>
                <FiLinkedin size={24} />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-100' : 'text-gray-600'} hover:text-red-500 transition-colors`}>
                <FaPinterest size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-100' : 'text-gray-600'} hover:text-pink-500 transition-colors`}>
                <FiInstagram size={24} />
              </a>
            </div>

            <div className={`mx-8 h-8 w-px ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>

            <button 
              onClick={toggleDarkMode}
              className={`${darkMode ? 'text-gray-100' : 'text-gray-600'} hover:text-yellow-400 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <BsFillSunFill size={24} /> : <BsFillMoonFill size={24} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className={`${darkMode ? 'text-gray-100' : 'text-gray-600'} hover:text-yellow-400 transition-colors p-2`}
            >
              {darkMode ? <BsFillSunFill size={24} /> : <BsFillMoonFill size={24} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden ${darkMode ? 'bg-black' : 'bg-white'}`}
            >
              <div className="flex flex-col items-center space-y-4 py-6">
                {navLinks.map(({ path, label }) => (
                  <Link
                    key={path}
                    href={path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-2 w-full text-center ${
                      darkMode 
                        ? 'text-gray-100 hover:bg-gray-800' 
                        : 'text-gray-800 hover:bg-gray-100'
                    } ${isActive(path) ? 'font-bold' : ''}`}
                  >
                    {label}
                  </Link>
                ))}
                
                {/* Social Links for Mobile */}
                <div className="flex items-center space-x-6 pt-4">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-100' : 'text-gray-600'} hover:text-blue-400`}>
                    <FiTwitter size={24} />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-100' : 'text-gray-600'} hover:text-gray-300`}>
                    <FiGithub size={24} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-100' : 'text-gray-600'} hover:text-blue-400`}>
                    <FiLinkedin size={24} />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-100' : 'text-gray-600'} hover:text-pink-500`}>
                    <FiInstagram size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
} 