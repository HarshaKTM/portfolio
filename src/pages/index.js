import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { FiExternalLink, FiServer, FiGitBranch, FiCloud, FiSettings, FiCheckCircle, FiCode, FiShield, FiTrendingUp, FiDatabase, FiLayers, FiMonitor, FiSmartphone, FiDownload } from 'react-icons/fi';
import Typewriter from 'typewriter-effect';
import { useTheme } from '../context/ThemeContext';
import { SiKubernetes, SiDocker, SiJenkins, SiAnsible, SiSelenium, SiJest, SiPostman, SiCypress, SiReact, SiNodedotjs, SiMongodb, SiPostgresql } from 'react-icons/si';
import Head from 'next/head';
import Hero from '../sections/Hero';
import Terminal from '../sections/Terminal';
import Projects from '../sections/Projects';
import dynamic from 'next/dynamic';
import Contact from '../sections/Contact';

// Dynamically import Skills component with no SSR
const Skills = dynamic(() => import('../sections/Skills'), { ssr: false });

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
      devops: '/resumes/Harsha Kumarasingha-DevOps.pdf',
      qa: '/resumes/Harsha Kumarasingha-QA.pdf',
      fullstack: '/resumes/Harsha Kumarasingha-SE.pdf'
    };

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = resumeLinks[type];
    link.download = `Harsha Kumarasingha_${type.toUpperCase()}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <Head>
        <title>Harsha Kumarasingha | DevOps Engineer & Full Stack Developer</title>
        <meta name="description" content="Portfolio of Harsha Kumarasingha - DevOps Engineer and Full Stack Developer specializing in infrastructure automation, CI/CD, and modern web applications." />
      </Head>

      <main>
        <Hero />
        <Terminal />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </Layout>
  );
} 