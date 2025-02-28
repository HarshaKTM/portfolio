import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { FiClock, FiTag, FiArrowLeft } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import Link from 'next/link';
import { initialArticles } from '../../data/articles';

export default function Article() {
  const { darkMode } = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      // Try to get from localStorage first
      const savedArticles = localStorage.getItem('articles');
      let articles = savedArticles ? JSON.parse(savedArticles) : initialArticles;
      
      const foundArticle = articles.find(a => a.id === Number(id));
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        // If not found in localStorage, check initialArticles
        const initialArticle = initialArticles.find(a => a.id === Number(id));
        if (initialArticle) {
          setArticle(initialArticle);
        } else {
          router.push('/articles'); // Redirect if article not found
        }
      }
      setIsLoading(false);
    }
  }, [id, router]);

  if (isLoading) {
    return (
      <Layout>
        <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gray-50'} flex items-center justify-center`}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gray-50'} flex items-center justify-center`}>
          <div className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            Article not found
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/articles"
              className={`inline-flex items-center space-x-2 mb-8 ${
                darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <FiArrowLeft />
              <span>Back to Articles</span>
            </Link>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
            <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              {article.title}
            </h1>
            <div className="flex items-center gap-4 mb-8">
              <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <FiClock className="inline" />
                {article.readTime}
              </span>
              <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <FiTag className="inline" />
                {article.category}
              </span>
            </div>
            <div 
              className={`prose ${darkMode ? 'prose-invert' : ''} max-w-none`}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 