import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiTwitter, FiGithub, FiLinkedin, FiInstagram, FiMenu, FiX } from 'react-icons/fi';
import { FaPinterest } from 'react-icons/fa';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import components with no SSR
const ThemeToggle = dynamic(() => import('./ThemeToggle'), { ssr: false });
const Clock = dynamic(() => import('./Clock'), { ssr: false });
const MusicPlayer = dynamic(() => import('./MusicPlayer'), { ssr: false });

export default function Navigation() {
  const { theme, mounted } = useTheme();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const isActive = (path) => router.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    
    // If not on home page, navigate to home page first
    if (router.pathname !== '/') {
      router.push('/').then(() => {
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      });
    } else {
      // Already on home page, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { path: '/', label: 'Home', action: null },
    { path: '/about', label: 'About', action: null },
    { path: '#terminal', label: 'DevOps', action: () => scrollToSection('terminal') },
    { path: '#projects', label: 'Projects', action: () => scrollToSection('projects') },
    { path: '#skills', label: 'Skills', action: () => scrollToSection('skills') },
    { path: '/articles', label: 'Articles', action: null }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            <div className="w-12 h-12 bg-purple-600 dark:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors duration-300">
              HK
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ path, label, action }) => (
              action ? (
                <button 
                  key={path}
                  onClick={action}
                  className={`relative px-2 py-1 text-gray-300 hover:text-white transition-colors duration-300 ${
                    (path === '#projects' || path === '#terminal' || path === '#skills') && router.pathname === '/' ? 'font-bold' : ''
                  }`}
                >
                  <span>{label}</span>
                  {(path === '#projects' || path === '#terminal' || path === '#skills') && router.pathname === '/' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500"></span>
                  )}
                </button>
              ) : (
                <Link 
                  key={path}
                  href={path}
                  className={`relative px-2 py-1 text-gray-300 hover:text-white transition-colors duration-300 ${
                    isActive(path) ? 'font-bold' : ''
                  }`}
                >
                  <span>{label}</span>
                  {isActive(path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500"></span>
                  )}
                </Link>
              )
            ))}
          </div>

          {/* Right side - Clock, MusicPlayer, Social Links & Theme Toggle (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Clock Component */}
            <div className="mr-2">
              {mounted && <Clock />}
            </div>
            
            {/* Music Player */}
            <div className="mr-2">
              {mounted && <MusicPlayer />}
            </div>
          
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
              <FiTwitter size={20} />
            </a>
            <a href="https://github.com/HarshaKTM" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
              <FiGithub size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
              <FiLinkedin size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
              <FiInstagram size={20} />
            </a>
            
            <div className="ml-4">
              {mounted && <ThemeToggle />}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-900"
            >
              <div className="flex flex-col items-center space-y-4 py-6">
                {navLinks.map(({ path, label, action }) => (
                  action ? (
                    <button
                      key={path}
                      onClick={action}
                      className={`px-4 py-2 w-full text-center text-gray-300 hover:bg-gray-800 ${
                        (path === '#projects' || path === '#terminal' || path === '#skills') && router.pathname === '/' ? 'font-bold' : ''
                      }`}
                    >
                      {label}
                    </button>
                  ) : (
                    <Link
                      key={path}
                      href={path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-4 py-2 w-full text-center text-gray-300 hover:bg-gray-800 ${
                        isActive(path) ? 'font-bold' : ''
                      }`}
                    >
                      {label}
                    </Link>
                  )
                ))}
                
                {/* Clock and MusicPlayer for mobile */}
                <div className="flex items-center space-x-4 pt-2">
                  {mounted && <Clock />}
                  {mounted && <MusicPlayer />}
                </div>
                
                {/* Theme toggle and social links for mobile */}
                <div className="flex items-center space-x-6 pt-4">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                    <FiTwitter size={20} />
                  </a>
                  <a href="https://github.com/HarshaKTM" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                    <FiGithub size={20} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                    <FiLinkedin size={20} />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                    <FiInstagram size={20} />
                  </a>
                  {mounted && <ThemeToggle />}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
} 