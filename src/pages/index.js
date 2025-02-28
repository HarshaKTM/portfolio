import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { FiExternalLink, FiServer, FiGitBranch, FiCloud, FiSettings, FiCheckCircle, FiCode, FiShield, FiTrendingUp, FiDatabase, FiLayers, FiMonitor, FiSmartphone, FiDownload } from 'react-icons/fi';
import Typewriter from 'typewriter-effect';
import { useTheme } from '../context/ThemeContext';
import { SiKubernetes, SiDocker, SiJenkins, SiAnsible, SiSelenium, SiJest, SiPostman, SiCypress, SiReact, SiNodedotjs, SiMongodb, SiPostgresql } from 'react-icons/si';

export default function Home() {
  const { darkMode } = useTheme();
  
  // Add mouse movement effect handlers for Resume button
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = 100; // The size of the gradient effect

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const downloadResume = (type) => {
    const resumeLinks = {
      devops: '/resumes/DevOps_Resume.pdf',
      qa: '/resumes/QA_Resume.pdf',
      fullstack: '/resumes/Fullstack_Resume.pdf'
    };

    const link = document.createElement('a');
    link.href = resumeLinks[type];
    link.download = `Hasitha_${type.toUpperCase()}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className={`min-h-screen flex flex-col justify-center ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between py-20 md:py-32 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 relative flex justify-center"
            >
              <div className="relative w-80 h-80">
                <Image
                  src="/images/profile-artistic.jpg"
                  alt="Profile"
                  width={320}
                  height={320}
                  className={`rounded-full object-cover object-center w-full h-full border-4 ${
                    darkMode ? 'border-white' : 'border-black'
                  } shadow-xl`}
                  priority
                  unoptimized
                />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`absolute -right-4 bottom-4 w-24 h-24 rounded-full ${
                    darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-black hover:bg-gray-800'
                  } text-white flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg overflow-hidden`}
                >
                  <div className="relative group">
                    <motion.span
                      className="font-signature text-2xl font-bold tracking-wider"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      Harsha
                    </motion.span>
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 2, delay: 1 }}
              className="w-full md:w-1/2 space-y-8"
            >
              <h1 className={`text-4xl md:text-6xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'} leading-tight`}>
                <Typewriter
                  options={{
                    strings: [
                      'Turning Vision Into Reality',
                      'Building Digital Experiences',
                      'Crafting Modern Solutions'
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 150,
                    delay: 80,
                    wrapperClassName: `typewriter-wrapper ${darkMode ? 'text-gray-100' : 'text-gray-800'}`
                  }}
                />
                <span className={`${darkMode ? 'text-blue-400' : 'text-primary'}`}>With Code And Design.</span>
              </h1>
              
              <div className="text-lg">
                <Typewriter
                  options={{
                    strings: [
                      'Full Stack Developer',
                      'DevOps Engineer',
                      'Cloud Architecture Specialist',
                      'Quality Assurance'
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 100,
                    delay: 80,
                    wrapperClassName: `typewriter-role ${darkMode ? 'text-blue-400' : 'text-blue-600'}`
                  }}
                />
              </div>

              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                As a skilled full-stack developer, I am dedicated to turning ideas into
                innovative web applications. Explore my latest projects and articles,
                showcasing my expertise in React.js and web development.
              </p>

              <div className="flex gap-8 pt-4">
                <motion.div
                  className="relative"
                  onMouseMove={handleMouseMove}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/resume.pdf"
                    className={`relative inline-flex items-center px-8 py-4 ${
                      darkMode 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : 'bg-black hover:bg-gray-800'
                    } text-white rounded-lg transition-all duration-300 text-lg overflow-hidden group`}
                  >
                    <motion.div
                      className="pointer-events-none absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: useMotionTemplate`
                          radial-gradient(
                            ${radius}px circle at ${mouseX}px ${mouseY}px,
                            rgba(255,255,255,0.15),
                            transparent 80%
                          )
                        `,
                      }}
                    />
                    Resume <FiExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div
                  className="relative"
                  onMouseMove={handleMouseMove}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/contact"
                    className={`relative inline-flex items-center px-8 py-4 border-2 ${
                      darkMode 
                        ? 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white' 
                        : 'border-black text-black hover:bg-black hover:text-white'
                    } rounded-lg transition-all duration-300 text-lg overflow-hidden group`}
                  >
                    <motion.div
                      className="pointer-events-none absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: useMotionTemplate`
                          radial-gradient(
                            ${radius}px circle at ${mouseX}px ${mouseY}px,
                            rgba(59,130,246,0.15),
                            transparent 80%
                          )
                        `,
                      }}
                    />
                    Contact
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`text-4xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
                >
                  DevOps Engineering
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Streamlining development and operations with modern tools and practices
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* CI/CD Pipeline */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="flex items-center mb-4">
                    <FiGitBranch className={`text-3xl mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>CI/CD Pipeline</h3>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Automated testing, building, and deployment workflows
                  </p>
                </motion.div>

                {/* Container Orchestration */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="flex items-center mb-4">
                    <SiKubernetes className={`text-3xl mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Container Orchestration</h3>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Kubernetes and Docker for scalable applications
                  </p>
                </motion.div>

                {/* Infrastructure as Code */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="flex items-center mb-4">
                    <FiCloud className={`text-3xl mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Infrastructure as Code</h3>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Terraform and CloudFormation for infrastructure management
                  </p>
                </motion.div>

                {/* Monitoring & Logging */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="flex items-center mb-4">
                    <FiSettings className={`text-3xl mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Monitoring & Logging</h3>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Prometheus, Grafana, and ELK stack implementation
                  </p>
                </motion.div>
              </div>

              {/* DevOps Tools Animation */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-16 flex justify-center space-x-8"
              >
                {[SiDocker, SiKubernetes, SiJenkins, SiAnsible].map((Icon, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 1.2 + index * 0.1
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.6 }
                    }}
                    className={`text-5xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                  >
                    <Icon />
                  </motion.div>
                ))}
              </motion.div>

              {/* DevOps Resume Button */}
              <motion.div
                className="relative mt-8"
                onMouseMove={handleMouseMove}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => downloadResume('devops')}
                  className={`relative inline-flex items-center px-8 py-4 ${
                    darkMode 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'bg-black hover:bg-gray-800'
                  } text-white rounded-lg transition-all duration-300 text-lg overflow-hidden group`}
                >
                  <motion.div
                    className="pointer-events-none absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: useMotionTemplate`
                        radial-gradient(
                          ${radius}px circle at ${mouseX}px ${mouseY}px,
                          rgba(255,255,255,0.15),
                          transparent 80%
                        )
                      `,
                    }}
                  />
                  <span className="flex items-center">
                    Download DevOps Resume <FiDownload className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`text-4xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
                >
                  Full Stack Development
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Building end-to-end solutions with modern technologies
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Frontend Development */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="flex items-center mb-4">
                    <FiMonitor className={`text-3xl mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Frontend</h3>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    React.js, Next.js, and modern UI frameworks
                  </p>
                </motion.div>

                {/* Backend Development */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="flex items-center mb-4">
                    <FiLayers className={`text-3xl mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Backend</h3>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Node.js, Express, and RESTful APIs
                  </p>
                </motion.div>

                {/* Database Management */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="flex items-center mb-4">
                    <FiDatabase className={`text-3xl mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Database</h3>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    MongoDB, PostgreSQL, and Redis
                  </p>
                </motion.div>

                {/* Mobile Development */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="flex items-center mb-4">
                    <FiSmartphone className={`text-3xl mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Mobile</h3>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    React Native and Progressive Web Apps
                  </p>
                </motion.div>
              </div>

              {/* Full Stack Tools Animation */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-16 flex justify-center space-x-8"
              >
                {[SiReact, SiNodedotjs, SiMongodb, SiPostgresql].map((Icon, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 1.2 + index * 0.1
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.6 }
                    }}
                    className={`text-5xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                  >
                    <Icon />
                  </motion.div>
                ))}
              </motion.div>

              {/* Full Stack Resume Button */}
              <motion.div
                className="relative mt-8"
                onMouseMove={handleMouseMove}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => downloadResume('fullstack')}
                  className={`relative inline-flex items-center px-8 py-4 ${
                    darkMode 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'bg-black hover:bg-gray-800'
                  } text-white rounded-lg transition-all duration-300 text-lg overflow-hidden group`}
                >
                  <motion.div
                    className="pointer-events-none absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: useMotionTemplate`
                        radial-gradient(
                          ${radius}px circle at ${mouseX}px ${mouseY}px,
                          rgba(255,255,255,0.15),
                          transparent 80%
                        )
                      `,
                    }}
                  />
                  <span className="flex items-center">
                    Download Full Stack Resume <FiDownload className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`text-4xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
                >
                  Quality Assurance
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Ensuring software quality through comprehensive testing and automation
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Automated Testing */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="flex items-center mb-4">
                    <FiCode className={`text-3xl mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Automated Testing</h3>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    End-to-end testing with Selenium and Cypress
                  </p>
                </motion.div>

                {/* Performance Testing */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="flex items-center mb-4">
                    <FiTrendingUp className={`text-3xl mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Performance Testing</h3>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Load and stress testing with JMeter and K6
                  </p>
                </motion.div>

                {/* Security Testing */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="flex items-center mb-4">
                    <FiShield className={`text-3xl mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Security Testing</h3>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Vulnerability scanning and penetration testing
                  </p>
                </motion.div>

                {/* API Testing */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="flex items-center mb-4">
                    <FiCheckCircle className={`text-3xl mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>API Testing</h3>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    REST API testing with Postman and Jest
                  </p>
                </motion.div>
              </div>

              {/* QA Tools Animation */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-16 flex justify-center space-x-8"
              >
                {[SiSelenium, SiJest, SiPostman, SiCypress].map((Icon, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 1.2 + index * 0.1
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.6 }
                    }}
                    className={`text-5xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                  >
                    <Icon />
                  </motion.div>
                ))}
              </motion.div>

              {/* QA Resume Button */}
              <motion.div
                className="relative mt-8"
                onMouseMove={handleMouseMove}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => downloadResume('qa')}
                  className={`relative inline-flex items-center px-8 py-4 ${
                    darkMode 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'bg-black hover:bg-gray-800'
                  } text-white rounded-lg transition-all duration-300 text-lg overflow-hidden group`}
                >
                  <motion.div
                    className="pointer-events-none absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: useMotionTemplate`
                        radial-gradient(
                          ${radius}px circle at ${mouseX}px ${mouseY}px,
                          rgba(255,255,255,0.15),
                          transparent 80%
                        )
                      `,
                    }}
                  />
                  <span className="flex items-center">
                    Download QA Resume <FiDownload className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.section>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="fixed bottom-12 right-12"
        >
          <div className={`w-16 h-16 ${
            darkMode ? 'bg-blue-500' : 'bg-yellow-300'
          } rounded-full flex items-center justify-center shadow-lg`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 ${darkMode ? 'text-white' : 'text-black'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
} 