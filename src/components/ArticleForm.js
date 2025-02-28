import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function ArticleForm({ onClose, onSubmit }) {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now(), // temporary ID generation
      date: new Date().toISOString(),
      readTime: '5 min read' // You could calculate this based on content length
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className={`w-full max-w-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            Create New Article
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700' : ''}`}
          >
            <FiX className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label 
              className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-100' 
                  : 'bg-white border-gray-300 text-gray-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label 
              className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Category
            </label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-100' 
                  : 'bg-white border-gray-300 text-gray-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label 
              className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Excerpt
            </label>
            <textarea
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows="3"
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-100' 
                  : 'bg-white border-gray-300 text-gray-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label 
              className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Content
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows="6"
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-100' 
                  : 'bg-white border-gray-300 text-gray-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label 
              className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Image URL
            </label>
            <input
              type="text"
              required
              value={formData.image || ''}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-100' 
                  : 'bg-white border-gray-300 text-gray-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-2 rounded-lg border ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Create Article
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
} 