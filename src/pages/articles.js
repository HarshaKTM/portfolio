import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { FiSearch, FiClock, FiTag, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';
import ArticleForm from '../components/ArticleForm';
import { initialArticles } from '../data/articles';

export default function Articles() {
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [articles, setArticles] = useState(initialArticles);

  useEffect(() => {
    // Load articles from localStorage or use initial articles if none exist
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    } else {
      localStorage.setItem('articles', JSON.stringify(initialArticles));
    }
  }, []);

  const handleCreateArticle = (newArticle) => {
    const updatedArticles = [newArticle, ...articles];
    setArticles(updatedArticles);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
  };

  const handleDeleteArticle = (articleId) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const updatedArticles = articles.filter(article => article.id !== articleId);
      setArticles(updatedArticles);
      // Update localStorage
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
    }
  };

  // Filter articles based on search term and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['All', ...new Set(articles.map(article => article.category))];

  return (
    <Layout>
      <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Add Article Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-end mb-8"
          >
            <button
              onClick={() => setShowForm(true)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                darkMode 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition-colors`}
            >
              <FiPlus />
              <span>Create Article</span>
            </button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Articles & Insights
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Explore technical articles, tutorials, and insights about software development
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Search Bar */}
              <div className="relative w-full md:w-1/2">
                <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                    darkMode 
                      ? 'bg-gray-800 text-gray-100 border-gray-700' 
                      : 'bg-white text-gray-800 border-gray-200'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedCategory === category
                        ? darkMode 
                          ? 'bg-blue-500 text-white'
                          : 'bg-blue-600 text-white'
                        : darkMode
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-lg overflow-hidden shadow-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } group hover:shadow-xl transition-all duration-300`}
              >
                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteArticle(article.id);
                  }}
                  className={`absolute top-2 right-2 p-2 rounded-full ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-red-500' 
                      : 'bg-white hover:bg-red-500'
                  } hover:text-white transition-colors z-10 opacity-0 group-hover:opacity-100`}
                >
                  <FiTrash2 />
                </button>

                <Link href={`/articles/${article.id}`}>
                  <div className="cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]">
                    <div className="relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 ${
                        darkMode ? 'bg-black' : 'bg-white'
                      } opacity-0 group-hover:opacity-20 transition-opacity duration-300`}/>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`text-sm flex items-center gap-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <FiClock className="inline" />
                          {article.readTime}
                        </span>
                        <span className={`text-sm flex items-center gap-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <FiTag className="inline" />
                          {article.category}
                        </span>
                      </div>
                      <h2 className={`text-xl font-bold mb-2 ${
                        darkMode ? 'text-gray-100' : 'text-gray-800'
                      } group-hover:text-blue-500 transition-colors`}>
                        {article.title}
                      </h2>
                      <p className={`mb-4 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {article.excerpt}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm font-semibold ${
                            darkMode 
                              ? 'text-blue-400 group-hover:text-blue-300' 
                              : 'text-blue-600 group-hover:text-blue-700'
                          } transition-colors`}
                        >
                          Read More
                        </span>
                        <motion.span
                          initial={{ x: 0 }}
                          animate={{ x: 5 }}
                          transition={{
                            duration: 0.3,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Article Form Modal */}
          {showForm && (
            <ArticleForm
              onClose={() => setShowForm(false)}
              onSubmit={handleCreateArticle}
            />
          )}

          {/* No Results Message */}
          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                No articles found matching your search criteria.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
} 