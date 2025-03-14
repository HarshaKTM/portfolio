import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
  const { darkMode } = useTheme();

  return (
    <Layout>
      <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Get in Touch
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Have a question or want to work together? Feel free to reach out!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <FiMail className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                      <a 
                        href="mailto:harshakumara1998030944@gmail.com"
                        className={`${darkMode ? 'text-gray-100' : 'text-gray-800'} hover:text-blue-500`}
                      >
                        harshakumara1998030944@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <FiPhone className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Phone</p>
                      <a 
                        href="tel:+94773351707"
                        className={`${darkMode ? 'text-gray-100' : 'text-gray-800'} hover:text-blue-500`}
                      >
                        +94 773351707
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <FiMapPin className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Location</p>
                      <p className={`${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                        220, sudarshana mawatha, malabe
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <form className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  Send Message
                </h2>
                <div className="space-y-6">
                  <div>
                    <label 
                      htmlFor="name" 
                      className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-100' 
                          : 'bg-white border-gray-300 text-gray-800'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="email" 
                      className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-100' 
                          : 'bg-white border-gray-300 text-gray-800'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="message" 
                      className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-100' 
                          : 'bg-white border-gray-300 text-gray-800'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg ${
                      darkMode 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white transition-colors`}
                  >
                    <span>Send Message</span>
                    <FiSend />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 