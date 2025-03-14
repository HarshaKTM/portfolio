import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FiSearch, FiExternalLink, FiCalendar, FiTag } from 'react-icons/fi';
import articleImages from '../data/articleImages';

const ArticlesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter articles based on search term and active filter
  const filteredArticles = devOpsArticles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = 
      activeFilter === 'all' || 
      article.tags.includes(activeFilter);
    
    return matchesSearch && matchesFilter;
  });

  // Extract unique tags for filters
  const uniqueTags = [...new Set(devOpsArticles.flatMap(article => article.tags))].sort();

  return (
    <div className="space-y-10">
      {/* Header and search */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
          
          <div className="relative max-w-md w-full">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 text-sm rounded-full transition-colors 
                      ${activeFilter === 'all'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
          >
            All
          </button>
          
          {uniqueTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-3 py-1 text-sm rounded-full transition-colors 
                        ${activeFilter === tag
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {/* Articles grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-0 left-0 w-full p-4 flex justify-between">
                  <span className="px-3 py-1 text-xs font-semibold bg-purple-600 text-white rounded-full">
                    {article.platform}
                  </span>
                  {article.featured && (
                    <span className="px-3 py-1 text-xs font-semibold bg-yellow-500 text-white rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-0.5 text-xs bg-gray-900/70 text-white rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="inline-block" />
                      {article.date}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {article.excerpt}
                  </p>
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a 
                    href={article.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                  >
                    Read Full Article
                    <FiExternalLink className="ml-2" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-xl text-gray-500 dark:text-gray-400">
            No articles found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

// Sample data - replace with your actual articles
const devOpsArticles = [
  {
    id: 1,
    title: "Building Scalable CI/CD Pipelines with Jenkins and Kubernetes",
    excerpt: "Learn how to create efficient CI/CD pipelines that can handle large-scale deployments using Jenkins and Kubernetes.",
    image: articleImages.cicdPipelines,
    url: "https://medium.com/@harshakumarasingha/building-scalable-cicd-pipelines-jenkins-kubernetes",
    platform: "Medium",
    date: "June 15, 2023",
    tags: ["CI/CD", "Kubernetes", "Jenkins"],
    featured: true
  },
  {
    id: 2,
    title: "Infrastructure as Code: Best Practices with Terraform",
    excerpt: "Discover how to manage your cloud infrastructure efficiently using Terraform and implement IaC best practices.",
    image: articleImages.terraform,
    url: "https://dev.to/harshakumarasingha/infrastructure-as-code-terraform-best-practices",
    platform: "Dev.to",
    date: "August 22, 2023",
    tags: ["Terraform", "IaC", "Cloud"]
  },
  {
    id: 3,
    title: "Kubernetes Monitoring: Prometheus and Grafana Setup Guide",
    excerpt: "A comprehensive guide to setting up robust monitoring for your Kubernetes clusters using Prometheus and Grafana.",
    image: articleImages.kubernetesMonitoring,
    url: "https://medium.com/@harshakumarasingha/kubernetes-monitoring-prometheus-grafana",
    platform: "Medium",
    date: "October 5, 2023",
    tags: ["Kubernetes", "Monitoring", "Prometheus"]
  },
  {
    id: 4,
    title: "Automating Docker Image Security Scans in Your Pipeline",
    excerpt: "Implement automated security scanning for your Docker images to identify vulnerabilities before deployment.",
    image: articleImages.dockerSecurity,
    url: "https://dev.to/harshakumarasingha/automating-docker-security-scans-cicd-pipeline",
    platform: "Dev.to",
    date: "November 12, 2023",
    tags: ["Docker", "Security", "CI/CD"]
  },
  {
    id: 5,
    title: "GitOps Workflow with ArgoCD for Kubernetes Deployments",
    excerpt: "Explore how to implement GitOps practices using ArgoCD to manage Kubernetes deployments more efficiently.",
    image: articleImages.gitops,
    url: "https://medium.com/@harshakumarasingha/gitops-workflow-argocd-kubernetes",
    platform: "Medium",
    date: "January 7, 2024",
    tags: ["GitOps", "ArgoCD", "Kubernetes"],
    featured: true
  },
  {
    id: 6,
    title: "Implementing Zero-Trust Security in Microservices Architecture",
    excerpt: "Learn how to apply zero-trust security principles to microservices architectures to enhance your security posture.",
    image: articleImages.zeroTrust,
    url: "https://dev.to/harshakumarasingha/zero-trust-security-microservices",
    platform: "Dev.to",
    date: "February 28, 2024",
    tags: ["Security", "Microservices", "DevSecOps"]
  },
  {
    id: 7,
    title: "Cost Optimization Strategies for AWS Kubernetes Deployments",
    excerpt: "Practical strategies to optimize costs when running Kubernetes clusters on AWS without sacrificing performance.",
    image: articleImages.aws,
    url: "https://medium.com/@harshakumarasingha/aws-kubernetes-cost-optimization",
    platform: "Medium",
    date: "March 15, 2024",
    tags: ["AWS", "Kubernetes", "Cost Optimization"]
  },
  {
    id: 8,
    title: "Building a Self-Healing Infrastructure with Kubernetes",
    excerpt: "Design patterns and practices for creating resilient, self-healing infrastructure using Kubernetes capabilities.",
    image: articleImages.selfHealing,
    url: "https://dev.to/harshakumarasingha/self-healing-infrastructure-kubernetes",
    platform: "Dev.to",
    date: "April 3, 2024",
    tags: ["Kubernetes", "Resilience", "Architecture"]
  },
  {
    id: 9,
    title: "Docker: Basic to Advanced Concepts 2024",
    excerpt: "A comprehensive guide to Docker concepts from basic to advanced, covering everything you need to know about containerization.",
    image: articleImages.docker,
    url: "https://dev.to/prodevopsguytech/docker-basic-to-advanced-concepts-2024-5aa9",
    platform: "Dev.to",
    date: "October 8, 2024",
    tags: ["Docker", "Containers", "DevOps"],
    featured: true
  },
  {
    id: 10,
    title: "Unleashing the Power of DevOps: Transforming Collaboration and Efficiency",
    excerpt: "Discover how DevOps bridges the gap between development and operations teams to enhance software delivery speed and quality.",
    image: articleImages.devopsCollaboration,
    url: "https://dev.to/kubeha_18/unleashing-the-power-of-devops-transforming-collaboration-and-efficiency-31m2",
    platform: "Dev.to",
    date: "September 6, 2024",
    tags: ["DevOps", "Collaboration", "Automation"]
  },
  {
    id: 11,
    title: "DevOps: Streamlining Software Development and IT Operations",
    excerpt: "An in-depth look at how DevOps practices enhance collaboration between development and operations teams.",
    image: articleImages.devopsStreamlining,
    url: "https://dev.to/paniya/devops-streamlining-software-development-and-it-operations-17nn",
    platform: "Dev.to",
    date: "August 30, 2024",
    tags: ["DevOps", "Software Development", "IT Operations"]
  },
  {
    id: 12,
    title: "DevOps Road Map",
    excerpt: "A step-by-step roadmap to becoming a DevOps Engineer, written in a mix of Sinhala and English for better understanding.",
    image: articleImages.devopsRoadmap,
    url: "https://www.linkedin.com/pulse/devops-road-map-harsha-k-thennakoon-jtv4c/",
    platform: "LinkedIn",
    date: "March 5, 2025",
    tags: ["DevOps", "Career", "Sinhala"],
    featured: true
  }
];

export default ArticlesList; 