import { FiPhone, FiMail, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { darkMode } = useTheme();
  
  return (
    <footer className={`py-8 ${darkMode ? 'bg-black' : 'bg-white'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left side - Name and Copyright */}
          <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 ${darkMode ? 'bg-white text-black' : 'bg-black text-white'} rounded-full flex items-center justify-center font-bold text-lg`}>
              HK
            </div>
            <div className={`${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              <h3 className="font-bold text-lg">Hasitha K Thennakoon</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © {new Date().getFullYear()} All rights reserved
              </p>
            </div>
          </div>

          {/* Center - Contact Info */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-6">
              <a 
                href="tel:+94773351707" 
                className={`flex items-center space-x-2 ${
                  darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                } transition-colors`}
              >
                <FiPhone className="text-xl" />
                <span>+94 773351707</span>
              </a>
              <a 
                href="mailto:harshakumara1998030944@gmail.com" 
                className={`flex items-center space-x-2 ${
                  darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                } transition-colors`}
              >
                <FiMail className="text-xl" />
                <span>harshakumara1998030944@gmail.com</span>
              </a>
            </div>
            <div className={`flex items-center space-x-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <FiMapPin className="text-xl" />
              <span>malabe, Sri Lanka</span>
            </div>
          </div>

          {/* Right side - Social Links */}
          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-2xl transition-colors ${
                darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <FiGithub />
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-2xl transition-colors ${
                darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <FiLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 