import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Define all the icons you'll need
const allIcons = {
  // Frontend
  React: dynamic(() => import('react-icons/si').then(mod => mod.SiReact), { ssr: false }),
  Nextjs: dynamic(() => import('react-icons/si').then(mod => mod.SiNextdotjs), { ssr: false }),
  TailwindCSS: dynamic(() => import('react-icons/si').then(mod => mod.SiTailwindcss), { ssr: false }),
  JavaScript: dynamic(() => import('react-icons/si').then(mod => mod.SiJavascript), { ssr: false }),
  TypeScript: dynamic(() => import('react-icons/si').then(mod => mod.SiTypescript), { ssr: false }),
  
  // Backend
  Nodejs: dynamic(() => import('react-icons/si').then(mod => mod.SiNodedotjs), { ssr: false }),
  Express: dynamic(() => import('react-icons/si').then(mod => mod.SiExpress), { ssr: false }),
  MongoDB: dynamic(() => import('react-icons/si').then(mod => mod.SiMongodb), { ssr: false }),
  PostgreSQL: dynamic(() => import('react-icons/si').then(mod => mod.SiPostgresql), { ssr: false }),
  Python: dynamic(() => import('react-icons/si').then(mod => mod.SiPython), { ssr: false }),
  Java: dynamic(() => import('react-icons/si').then(mod => mod.SiJava), { ssr: false }),
  
  // DevOps
  Docker: dynamic(() => import('react-icons/si').then(mod => mod.SiDocker), { ssr: false }),
  Kubernetes: dynamic(() => import('react-icons/si').then(mod => mod.SiKubernetes), { ssr: false }),
  Jenkins: dynamic(() => import('react-icons/si').then(mod => mod.SiJenkins), { ssr: false }),
  Git: dynamic(() => import('react-icons/si').then(mod => mod.SiGit), { ssr: false }),
  GitHub: dynamic(() => import('react-icons/si').then(mod => mod.SiGithub), { ssr: false }),
  Terraform: dynamic(() => import('react-icons/si').then(mod => mod.SiTerraform), { ssr: false }),
  Ansible: dynamic(() => import('react-icons/si').then(mod => mod.SiAnsible), { ssr: false }),
  Prometheus: dynamic(() => import('react-icons/si').then(mod => mod.SiPrometheus), { ssr: false }),
  Grafana: dynamic(() => import('react-icons/si').then(mod => mod.SiGrafana), { ssr: false }),
  ArgoCD: dynamic(() => import('react-icons/si').then(mod => mod.SiArgo), { ssr: false }),
  Helm: dynamic(() => import('react-icons/si').then(mod => mod.SiHelm), { ssr: false }),
  
  // QA/Testing Tools
  Selenium: dynamic(() => import('react-icons/si').then(mod => mod.SiSelenium), { ssr: false }),
  Postman: dynamic(() => import('react-icons/si').then(mod => mod.SiPostman), { ssr: false }),
  SonarQube: dynamic(() => import('react-icons/si').then(mod => mod.SiSonarqube), { ssr: false }),
  Jest: dynamic(() => import('react-icons/si').then(mod => mod.SiJest), { ssr: false }),
  Cypress: dynamic(() => import('react-icons/si').then(mod => mod.SiCypress), { ssr: false }),
  TestingLibrary: dynamic(() => import('react-icons/si').then(mod => mod.SiTestinglibrary), { ssr: false }),
  JUnit: dynamic(() => import('react-icons/si').then(mod => mod.SiJunit5), { ssr: false }),
  
  // Cloud & Others
  AWS: dynamic(() => import('react-icons/si').then(mod => mod.SiAmazonaws), { ssr: false }),
  GoogleCloud: dynamic(() => import('react-icons/si').then(mod => mod.SiGooglecloud), { ssr: false }),
  Azure: dynamic(() => import('react-icons/si').then(mod => mod.SiMicrosoftazure), { ssr: false }),
  Firebase: dynamic(() => import('react-icons/si').then(mod => mod.SiFirebase), { ssr: false }),
  Linux: dynamic(() => import('react-icons/si').then(mod => mod.SiLinux), { ssr: false }),
  Nginx: dynamic(() => import('react-icons/si').then(mod => mod.SiNginx), { ssr: false }),
  ElasticSearch: dynamic(() => import('react-icons/si').then(mod => mod.SiElasticsearch), { ssr: false }),
  Kibana: dynamic(() => import('react-icons/si').then(mod => mod.SiKibana), { ssr: false }),
  Logstash: dynamic(() => import('react-icons/si').then(mod => mod.SiLogstash), { ssr: false }),
  GitHubActions: dynamic(() => import('react-icons/si').then(mod => mod.SiGithubactions), { ssr: false }),
};

const skillsData = [
  {
    category: "Frontend",
    technologies: [
      { name: "React", iconKey: "React", color: "#61DAFB", url: "https://reactjs.org/" },
      { name: "Next.js", iconKey: "Nextjs", color: "#000000", url: "https://nextjs.org/" },
      { name: "Tailwind CSS", iconKey: "TailwindCSS", color: "#06B6D4", url: "https://tailwindcss.com/" },
      { name: "JavaScript", iconKey: "JavaScript", color: "#F7DF1E", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "TypeScript", iconKey: "TypeScript", color: "#3178C6", url: "https://www.typescriptlang.org/" }
    ]
  },
  {
    category: "Backend",
    technologies: [
      { name: "Node.js", iconKey: "Nodejs", color: "#339933", url: "https://nodejs.org/" },
      { name: "Express", iconKey: "Express", color: "#000000", url: "https://expressjs.com/" },
      { name: "MongoDB", iconKey: "MongoDB", color: "#47A248", url: "https://www.mongodb.com/" },
      { name: "PostgreSQL", iconKey: "PostgreSQL", color: "#336791", url: "https://www.postgresql.org/" },
      { name: "Python", iconKey: "Python", color: "#3776AB", url: "https://www.python.org/" },
      { name: "Java", iconKey: "Java", color: "#007396", url: "https://www.java.com/" }
    ]
  },
  {
    category: "DevOps & Infrastructure",
    technologies: [
      { name: "Docker", iconKey: "Docker", color: "#2496ED", url: "https://www.docker.com/" },
      { name: "Kubernetes", iconKey: "Kubernetes", color: "#326CE5", url: "https://kubernetes.io/" },
      { name: "Terraform", iconKey: "Terraform", color: "#7B42BC", url: "https://www.terraform.io/" },
      { name: "Ansible", iconKey: "Ansible", color: "#EE0000", url: "https://www.ansible.com/" },
      { name: "Jenkins", iconKey: "Jenkins", color: "#D24939", url: "https://www.jenkins.io/" },
      { name: "GitHub Actions", iconKey: "GitHubActions", color: "#2088FF", url: "https://github.com/features/actions" },
      { name: "ArgoCD", iconKey: "ArgoCD", color: "#EF7B4D", url: "https://argoproj.github.io/argo-cd/" },
      { name: "Helm", iconKey: "Helm", color: "#0F1689", url: "https://helm.sh/" }
    ]
  },
  {
    category: "QA & Testing",
    technologies: [
      { name: "Selenium", iconKey: "Selenium", color: "#43B02A", url: "https://www.selenium.dev/" },
      { name: "Postman", iconKey: "Postman", color: "#FF6C37", url: "https://www.postman.com/" },
      { name: "SonarQube", iconKey: "SonarQube", color: "#4E9BCD", url: "https://www.sonarqube.org/" },
      { name: "Jest", iconKey: "Jest", color: "#C21325", url: "https://jestjs.io/" },
      { name: "Cypress", iconKey: "Cypress", color: "#17202C", url: "https://www.cypress.io/" },
      { name: "Testing Library", iconKey: "TestingLibrary", color: "#E33332", url: "https://testing-library.com/" },
      { name: "JUnit", iconKey: "JUnit", color: "#25A162", url: "https://junit.org/" }
    ]
  },
  {
    category: "Monitoring & Logging",
    technologies: [
      { name: "Prometheus", iconKey: "Prometheus", color: "#E6522C", url: "https://prometheus.io/" },
      { name: "Grafana", iconKey: "Grafana", color: "#F46800", url: "https://grafana.com/" },
      { name: "ElasticSearch", iconKey: "ElasticSearch", color: "#005571", url: "https://www.elastic.co/elasticsearch/" },
      { name: "Kibana", iconKey: "Kibana", color: "#00BFB3", url: "https://www.elastic.co/kibana/" },
      { name: "Logstash", iconKey: "Logstash", color: "#FEC514", url: "https://www.elastic.co/logstash/" }
    ]
  },
  {
    category: "Cloud Platforms",
    technologies: [
      { name: "AWS", iconKey: "AWS", color: "#FF9900", url: "https://aws.amazon.com/" },
      { name: "Google Cloud", iconKey: "GoogleCloud", color: "#4285F4", url: "https://cloud.google.com/" },
      { name: "Azure", iconKey: "Azure", color: "#0078D4", url: "https://azure.microsoft.com/" },
      { name: "Firebase", iconKey: "Firebase", color: "#FFCA28", url: "https://firebase.google.com/" },
      { name: "Linux", iconKey: "Linux", color: "#FCC624", url: "https://www.linux.org/" },
      { name: "Nginx", iconKey: "Nginx", color: "#009639", url: "https://www.nginx.com/" }
    ]
  }
];

const Skills = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [clickedSkill, setClickedSkill] = useState(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle click on skill icon
  const handleSkillClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Don't render until client-side
  if (!mounted) {
    return (
      <section id="skills" className="py-20 bg-gray-800 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">My Skills</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Loading skills...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">My Skills</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I specialize in DevOps engineering and full-stack development, with expertise in infrastructure automation, 
            containerization, CI/CD pipelines, monitoring, and cloud platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillsData.map((skillCategory, categoryIndex) => (
            <motion.div
              key={skillCategory.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-gradient-to-br from-gray-700/70 to-gray-800/70 dark:from-gray-800/70 dark:to-gray-900/70 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700/30"
            >
              <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6">{skillCategory.category}</h3>
              
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 gap-6"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {skillCategory.technologies.map((tech) => {
                  const IconComponent = allIcons[tech.iconKey];
                  const isHovered = hoveredSkill === tech.name;
                  const isClicked = clickedSkill === tech.name;
                  
                  return (
                    <motion.div
                      key={tech.name}
                      variants={item}
                      whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setHoveredSkill(tech.name)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      onClick={() => {
                        setClickedSkill(tech.name);
                        handleSkillClick(tech.url);
                        setTimeout(() => setClickedSkill(null), 500);
                      }}
                      className="flex flex-col items-center gap-3 cursor-pointer"
                      role="button"
                      aria-label={`Learn more about ${tech.name}`}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleSkillClick(tech.url);
                        }
                      }}
                    >
                      <motion.div 
                        className={`w-20 h-20 rounded-2xl bg-gray-800/80 dark:bg-gray-700/80 flex items-center justify-center shadow-lg ${isHovered ? 'shadow-xl shadow-' + tech.color + '/20' : ''} relative overflow-hidden group`}
                        animate={{
                          backgroundColor: isHovered ? 'rgba(30, 30, 40, 0.9)' : 'rgba(30, 30, 40, 0.5)',
                          borderColor: isHovered ? tech.color : 'rgba(75, 75, 90, 0.3)',
                          y: isHovered ? -5 : 0,
                          scale: isClicked ? 0.9 : 1
                        }}
                        transition={{ duration: 0.2 }}
                        style={{
                          border: '2px solid',
                          borderColor: isHovered ? tech.color : 'rgba(75, 75, 90, 0.3)'
                        }}
                      >
                        {/* Remove the overlay with link icon on hover */}
                        
                        {IconComponent && (
                          <motion.div
                            animate={{ 
                              scale: isHovered ? 1.2 : 1,
                              rotate: isHovered ? 5 : 0
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <IconComponent 
                              className="w-10 h-10" 
                              style={{ 
                                color: isHovered ? tech.color : 'rgba(255, 255, 255, 0.7)',
                                filter: isHovered ? 'drop-shadow(0 0 8px ' + tech.color + ')' : 'none'
                              }} 
                            />
                          </motion.div>
                        )}
                      </motion.div>
                      <motion.span 
                        className="text-gray-300 font-medium"
                        animate={{
                          color: isHovered ? tech.color : '#d1d5db'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {tech.name}
                      </motion.span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Skill Meter Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-12">Proficiency</h3>
          
          <div className="space-y-8 max-w-3xl mx-auto">
            {[
              { name: "DevOps & Infrastructure Automation", percentage: 90 },
              { name: "Containerization & Orchestration", percentage: 85 },
              { name: "CI/CD & Deployment Pipelines", percentage: 88 },
              { name: "Monitoring & Observability", percentage: 82 },
              { name: "Cloud Architecture", percentage: 85 },
              { name: "Frontend Development", percentage: 75 },
              { name: "Backend Development", percentage: 80 },
              { name: "Security & Compliance", percentage: 78 }
            ].map((skill, index) => (
              <motion.div 
                key={skill.name} 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-medium">{skill.name}</span>
                  <span className="text-gray-400 font-semibold">{skill.percentage}%</span>
                </div>
                <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, rgba(139, 92, 246, 0.9) 0%, rgba(236, 72, 153, 0.9) 100%)`
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.2,
                      ease: "easeOut"
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 