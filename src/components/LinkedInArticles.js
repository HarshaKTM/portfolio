import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiLinkedin, FiExternalLink, FiBookOpen, FiCalendar, FiEye } from 'react-icons/fi';
import Image from 'next/image';
import articleImages from '../data/articleImages';

const LinkedInArticles = ({ linkedInProfile, linkedInArticles }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 mb-5">
            <FiLinkedin className="text-lg" />
            <span className="text-sm font-medium">LinkedIn Articles</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Publications on LinkedIn
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Articles I've published on LinkedIn about DevOps practices, cloud infrastructure, and other technical topics.
          </p>
        </motion.div>

        {/* LinkedIn Profile Section */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 relative rounded-full overflow-hidden shadow-md">
                <Image 
                  src={linkedInProfile.profileImage || "/images/profile.jpg"} 
                  alt="LinkedIn Profile" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">{linkedInProfile.name || "Harsha Kumarasingha"}</h3>
                <p className="text-blue-600 dark:text-blue-400 text-lg mb-3">{linkedInProfile.headline || "DevOps Engineer"}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{linkedInProfile.summary || "DevOps professional with expertise in Kubernetes, cloud infrastructure, and CI/CD pipelines."}</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <a 
                    href={linkedInProfile.profileUrl || "https://www.linkedin.com/in/harshakumarasingha/"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FiLinkedin /> View Profile
                  </a>
                  {linkedInProfile.connectUrl && (
                    <a 
                      href={linkedInProfile.connectUrl}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      Connect
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* LinkedIn Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {linkedInArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-0 left-0 w-full p-4">
                  <div className="flex items-center">
                    <FiLinkedin className="text-blue-500 mr-2" size={18} />
                    <span className="text-white text-sm font-medium">LinkedIn Article</span>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{article.excerpt}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <FiCalendar className="mr-1" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center">
                    <FiEye className="mr-1" />
                    <span>{article.views} views</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    Read on LinkedIn
                    <FiExternalLink className="ml-2" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Articles Link */}
        {linkedInProfile.articlesUrl && (
          <div className="text-center mt-10">
            <a
              href={linkedInProfile.articlesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <FiBookOpen />
              View All LinkedIn Articles
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

// Default props with sample data
LinkedInArticles.defaultProps = {
  linkedInProfile: {
    name: "Harsha Kumarasingha",
    headline: "DevOps Engineer | Cloud Infrastructure Specialist",
    summary: "Passionate about optimizing development workflows and building scalable cloud infrastructure. I write about DevOps best practices, Kubernetes, CI/CD, and cloud technologies in both English and Sinhala.",
    profileImage: "/images/profile.jpg",
    profileUrl: "https://www.linkedin.com/in/harshakumarasingha/",
    connectUrl: "https://www.linkedin.com/in/harshakumarasingha/",
    articlesUrl: "https://www.linkedin.com/in/harshakumarasingha/detail/recent-activity/posts/"
  },
  linkedInArticles: [
    {
      id: 1,
      title: "DevOps Road Map",
      excerpt: "A step-by-step roadmap to becoming a DevOps Engineer, written in a mix of Sinhala and English for better understanding.",
      image: articleImages.devopsRoadmap,
      url: "https://www.linkedin.com/pulse/devops-road-map-harsha-k-thennakoon-jtv4c/",
      date: "March 5, 2025",
      views: "4,872"
    },
    {
      id: 2,
      title: "Docker: Basic to Advanced Concepts 2024",
      excerpt: "A comprehensive guide to Docker concepts from basic to advanced, covering everything you need to know about containerization.",
      image: articleImages.docker,
      url: "https://dev.to/prodevopsguytech/docker-basic-to-advanced-concepts-2024-5aa9",
      date: "October 8, 2024",
      views: "3,542"
    },
    {
      id: 3,
      title: "Unleashing the Power of DevOps: Transforming Collaboration and Efficiency",
      excerpt: "Discover how DevOps bridges the gap between development and operations teams to enhance software delivery speed and quality.",
      image: articleImages.devopsCollaboration,
      url: "https://dev.to/kubeha_18/unleashing-the-power-of-devops-transforming-collaboration-and-efficiency-31m2",
      date: "September 6, 2024",
      views: "2,876"
    }
  ]
};

export default LinkedInArticles; 