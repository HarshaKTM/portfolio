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
import Head from 'next/head';
import Skills from '../sections/Skills';
import Image from 'next/image';

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
      <Head>
        <title>About Me | Harsha Kumarasingha</title>
        <meta name="description" content="Learn more about Harsha Kumarasingha - Full Stack Developer and DevOps Engineer" />
      </Head>

      <main>
        {/* About Hero Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/3"
              >
                <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-xl shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent z-10" />
                  <Image
                    src="/images/profile-artistic.jpg"
                    alt="Harsha Kumarasingha"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-2/3"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h1>

                <div className="space-y-6 text-gray-300">
                  <p className="text-xl">
                    I'm an Associate DevOps & Cloud Engineer at JAM Entertainment, specializing in infrastructure automation, CI/CD pipelines, and cloud platforms.
                  </p>

                  <p>
                    I completed my BSc in Software Engineering at CINEC Campus, where I developed expertise in DevOps practices, containerization, and full-stack development. My 6-month internship at CIMA Company gave me hands-on experience with CI/CD pipelines, Docker, Kubernetes, and cloud infrastructure.
                  </p>

                  <p>
                    I'm passionate about automating infrastructure, building reliable systems, and implementing best practices in DevOps and cloud engineering.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div>
                      <h3 className="text-purple-400 font-medium mb-2">Core Expertise</h3>
                      <ul className="space-y-2">
                        <li>CI/CD Pipelines (Jenkins, GitHub Actions, ArgoCD)</li>
                        <li>Containerization (Docker, Kubernetes, Helm)</li>
                        <li>Infrastructure as Code (Terraform, Ansible)</li>
                        <li>Cloud Platforms (AWS, GCP, Azure)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-purple-400 font-medium mb-2">Education</h3>
                      <ul className="space-y-2">
                        <li>BSc in Software Engineering, CINEC Campus</li>
                        <li>AWS, Docker & Kubernetes Certifications</li>
                        <li>DevOps & Cloud Engineering Training</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <Skills />

        {/* Timeline Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">My Journey</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                My professional path in DevOps and Cloud Engineering.
              </p>
            </motion.div>

            <div className="relative max-w-3xl mx-auto">
              {/* Vertical Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-700/30" />

              {[
                {
                  year: "Oct 2025 - Present",
                  title: "Associate DevOps & Cloud Engineer",
                  company: "JAM Entertainment",
                  description: "Managing cloud infrastructure, implementing CI/CD pipelines, and automating deployment workflows. Working with Docker, Kubernetes, Terraform, and AWS."
                },
                {
                  year: "Apr 2025 - Sep 2025",
                  title: "Software Engineering Intern",
                  company: "CIMA Company",
                  description: "6-month internship focusing on software development, CI/CD pipeline integration, and gaining hands-on experience with modern development practices and cloud technologies."
                },
                {
                  year: "2022 - 2025",
                  title: "BSc in Software Engineering",
                  company: "CINEC Campus",
                  description: "Completed degree with focus on software development, DevOps practices, and cloud technologies. Built multiple projects showcasing full-stack and DevOps skills."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`relative z-10 mb-16 flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Content */}
                  <div className={`w-1/2 px-4 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <p className="text-purple-400 font-medium">{item.company}</p>
                      <p className="text-gray-500 text-sm mb-2">{item.year}</p>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>

                  {/* Circle */}
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-5 h-5 rounded-full bg-purple-600 border-4 border-gray-900" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
} 