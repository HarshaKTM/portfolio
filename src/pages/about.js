import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import {
  SiReact, SiNodedotjs, SiMongodb, SiDocker,
  SiKubernetes, SiPython, SiJavascript, SiTypescript,
  SiAmazonaws, SiGit, SiJenkins, SiTerraform,
  SiNginx, SiPostgresql, SiRedis, SiLinux,
  SiAngular, SiVuedotjs, SiGraphql, SiFirebase
} from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';

const technologies = [
  {
    name: 'React',
    icon: SiReact,
    url: 'https://reactjs.org/',
    color: '#61DAFB',
    bgHover: 'hover:bg-[#61DAFB]/10'
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    url: 'https://nodejs.org/',
    color: '#339933',
    bgHover: 'hover:bg-[#339933]/10'
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    url: 'https://www.mongodb.com/',
    color: '#47A248',
    bgHover: 'hover:bg-[#47A248]/10'
  },
  {
    name: 'Docker',
    icon: SiDocker,
    url: 'https://www.docker.com/',
    color: '#2496ED',
    bgHover: 'hover:bg-[#2496ED]/10'
  },
  {
    name: 'Kubernetes',
    icon: SiKubernetes,
    url: 'https://kubernetes.io/',
    color: '#326CE5',
    bgHover: 'hover:bg-[#326CE5]/10'
  },
  {
    name: 'Python',
    icon: SiPython,
    url: 'https://www.python.org/',
    color: '#3776AB',
    bgHover: 'hover:bg-[#3776AB]/10'
  },
  {
    name: 'JavaScript',
    icon: SiJavascript,
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    color: '#F7DF1E',
    bgHover: 'hover:bg-[#F7DF1E]/10'
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    url: 'https://www.typescriptlang.org/',
    color: '#3178C6',
    bgHover: 'hover:bg-[#3178C6]/10'
  },
  {
    name: 'AWS',
    icon: SiAmazonaws,
    url: 'https://aws.amazon.com/',
    color: '#FF9900',
    bgHover: 'hover:bg-[#FF9900]/10'
  },
  {
    name: 'Git',
    icon: SiGit,
    url: 'https://git-scm.com/',
    color: '#F05032',
    bgHover: 'hover:bg-[#F05032]/10'
  },
  {
    name: 'Jenkins',
    icon: SiJenkins,
    url: 'https://www.jenkins.io/',
    color: '#D24939',
    bgHover: 'hover:bg-[#D24939]/10'
  },
  {
    name: 'Terraform',
    icon: SiTerraform,
    url: 'https://www.terraform.io/',
    color: '#7B42BC',
    bgHover: 'hover:bg-[#7B42BC]/10'
  },
  {
    name: 'Nginx',
    icon: SiNginx,
    url: 'https://nginx.org/',
    color: '#009639',
    bgHover: 'hover:bg-[#009639]/10'
  },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    url: 'https://www.postgresql.org/',
    color: '#4169E1',
    bgHover: 'hover:bg-[#4169E1]/10'
  },
  {
    name: 'Redis',
    icon: SiRedis,
    url: 'https://redis.io/',
    color: '#DC382D',
    bgHover: 'hover:bg-[#DC382D]/10'
  },
  {
    name: 'Linux',
    icon: SiLinux,
    url: 'https://www.linux.org/',
    color: '#FCC624',
    bgHover: 'hover:bg-[#FCC624]/10'
  },
  {
    name: 'Angular',
    icon: SiAngular,
    url: 'https://angular.io/',
    color: '#DD0031',
    bgHover: 'hover:bg-[#DD0031]/10'
  },
  {
    name: 'Vue.js',
    icon: SiVuedotjs,
    url: 'https://vuejs.org/',
    color: '#4FC08D',
    bgHover: 'hover:bg-[#4FC08D]/10'
  },
  {
    name: 'GraphQL',
    icon: SiGraphql,
    url: 'https://graphql.org/',
    color: '#E10098',
    bgHover: 'hover:bg-[#E10098]/10'
  },
  {
    name: 'Firebase',
    icon: SiFirebase,
    url: 'https://firebase.google.com/',
    color: '#FFCA28',
    bgHover: 'hover:bg-[#FFCA28]/10'
  }
];

export default function About() {
  const { darkMode } = useTheme();
  
  return (
    <Layout>
      <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* About Me Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h1 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              About Me
            </h1>
            <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-lg p-8 mb-8`}>
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I am a highly motivated Software Engineering student with a strong foundation in full-stack development, DevOps, and cloud computing. Passionate about building scalable, efficient, and user-friendly applications, I have hands-on experience with Java, Python, React.js, Node.js, PostgreSQL, and MongoDB. Additionally, I am skilled in CI/CD pipelines, containerization, and cloud platforms like AWS and Azure.

                With a keen interest in modern web technologies, automation, and problem-solving, I am eager to contribute to real-world projects and collaborate with teams to deliver innovative solutions. Always open to learning and improving, I strive to enhance my technical and professional skills in a dynamic environment.
              </p>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I believe in continuous learning and staying updated with the latest
                technologies to deliver efficient and scalable solutions.
              </p>
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className={`text-4xl font-bold mb-12 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Education
            </h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className={`absolute left-0 w-0.5 h-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              
              {/* Education Items */}
              <div className="space-y-12">
                {/* Bachelor's Degree */}
                <div className="relative pl-8">
                  {/* Timeline Dot */}
                  <div className={`absolute left-[-8px] w-4 h-4 rounded-full ${
                    darkMode ? 'bg-blue-500' : 'bg-black'
                  } border-4 ${darkMode ? 'border-black' : 'border-white'}`}></div>
                  
                  <div className={`${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    <h3 className="text-2xl font-bold mb-2">
                      Bachelor Of Science In Software Engineering
                    </h3>
                    <p className={`text-lg mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      2022-2026 | CINEC Campus (CINEC)
                    </p>
                    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Relevant courses included Data Structures and Algorithms, Computer
                      Systems Engineering,Database Management Systems,Web Development,and Artificial Intelligence.
                    </p>
                  </div>
                </div>

                {/* Master's Degree */}
                <div className="relative pl-8">
                  {/* Timeline Dot */}
                  <div className={`absolute left-[-8px] w-4 h-4 rounded-full ${
                    darkMode ? 'bg-blue-500' : 'bg-black'
                  } border-4 ${darkMode ? 'border-black' : 'border-white'}`}></div>
                  
                  <div className={`${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    <h3 className="text-2xl font-bold mb-2">
                      Advance Level 
                    </h3>
                    <p className={`text-lg mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      2015-2017 | Badulla Central College
                    </p>
                    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Mathematics, Physics, Chemistry, English.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Technology Stack Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className={`text-4xl font-bold mb-12 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Technology Stack
            </h2>
            <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-lg p-8`}>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {technologies.map((tech) => (
                  <motion.a
                    key={tech.name}
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 
                      ${tech.bgHover} hover:shadow-lg group ${darkMode ? 'hover:bg-opacity-20' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <tech.icon
                      className={`text-4xl mb-2 transition-colors duration-300`}
                      style={{ color: tech.color }}
                    />
                    <span
                      className={`text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-600 group-hover:text-black'
                      }`}
                    >
                      {tech.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 