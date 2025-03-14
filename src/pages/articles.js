import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { FiSearch, FiClock, FiTag, FiPlus, FiTrash2, FiRss, FiBookOpen, FiServer, FiCloud, FiShield, FiGitBranch } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';
import ArticleForm from '../components/ArticleForm';
import { initialArticles } from '../data/articles';
import Head from 'next/head';
import ArticlesList from '../sections/ArticlesList';
import LinkedInArticles from '../components/LinkedInArticles';

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
      <Head>
        <title>DevOps Articles | Harsha Kumarasingha</title>
        <meta name="description" content="Explore my DevOps articles covering Kubernetes, CI/CD, Infrastructure as Code, and more." />
      </Head>

      <main className="pt-16 pb-24">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                DevOps Articles & Publications
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Sharing knowledge and insights on DevOps practices, cloud technologies, and infrastructure automation.
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <a 
                  href="#articles" 
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors inline-block"
                >
                  Browse Articles
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Articles Section */}
        <section id="articles" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <ArticlesList />
          </div>
        </section>
        
        {/* LinkedIn Articles Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <LinkedInArticles />
          </div>
        </section>
        
        {/* Topics Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6">Topics I Write About</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                My articles cover a range of DevOps and cloud-native topics, focusing on practical solutions to real-world challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topics.map((topic, index) => (
                <motion.div
                  key={topic.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                    {topic.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{topic.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{topic.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-20 bg-purple-700">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Stay Updated</h2>
              <p className="text-lg text-purple-200 mb-8">
                Subscribe to my newsletter to receive notifications when I publish new articles and tutorials.
              </p>
              <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-900 hover:bg-purple-950 text-white rounded-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

// Topics data
const topics = [
  {
    name: "Kubernetes & Container Orchestration",
    description: "Deployment strategies, cluster management, operators, and best practices for running applications on Kubernetes.",
    icon: <FiServer size={24} />
  },
  {
    name: "CI/CD Pipelines",
    description: "Building efficient, secure, and automated pipelines for continuous integration and delivery of applications.",
    icon: <FiGitBranch size={24} />
  },
  {
    name: "Infrastructure as Code",
    description: "Managing cloud infrastructure with Terraform, CloudFormation, and other IaC tools for reproducible environments.",
    icon: <FiCloud size={24} />
  },
  {
    name: "DevSecOps",
    description: "Integrating security practices throughout the development lifecycle without sacrificing speed or agility.",
    icon: <FiShield size={24} />
  },
  {
    name: "Cloud-Native Architecture",
    description: "Designing and implementing scalable, resilient applications using cloud-native principles and technologies.",
    icon: <FiRss size={24} />
  },
  {
    name: "Technical Tutorials",
    description: "Step-by-step guides for implementing DevOps tools and practices in real-world scenarios.",
    icon: <FiBookOpen size={24} />
  }
]; 