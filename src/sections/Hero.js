import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';

// Social media links
const socialLinks = [
  { Icon: FiGithub, href: 'https://github.com/HarshaKTM', label: 'GitHub', color: '#fff' },
  { Icon: FiLinkedin, href: 'https://linkedin.com/in/harsha-kumarasingha', label: 'LinkedIn', color: '#0A66C2' },
  { Icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter', color: '#1DA1F2' },
  { Icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram', color: '#E4405F' },
  { Icon: FiMail, href: 'mailto:Harshakumara1998030944@gmail.com', label: 'Email', color: '#c9a227' },
];

// Resume mapping for different roles
const RESUME_MAPPING = {
  'DevOps Engineer': {
    file: '/resumes/Harsha Kumarasingha-DevOps.pdf',
    label: 'Download CV'
  },
  'Cloud Engineer': {
    file: '/resumes/Harsha Kumarasingha-DevOps.pdf',
    label: 'Download CV'
  },
};

const Hero = () => {
  const [currentRole, setCurrentRole] = useState('DevOps Engineer');
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);

  // Parallax scroll effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Mouse parallax effect for 3D tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getCurrentResumeInfo = () => {
    return RESUME_MAPPING[currentRole] || RESUME_MAPPING['DevOps Engineer'];
  };

  // Calculate 3D tilt based on mouse position
  const rotateX = (mousePosition.y - 0.5) * 8;
  const rotateY = (mousePosition.x - 0.5) * -8;

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050508] py-20"
      style={{ perspective: '1200px' }}
    >
      {/* Cinematic frame border */}
      <div className="cinematic-frame" />

      {/* Deep space background with multiple gradient layers */}
      <div className="absolute inset-0">
        {/* Base dark gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(20, 20, 40, 0.8) 0%, transparent 50%)',
          }}
        />
        {/* Golden spotlight from top */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% -20%, rgba(201, 162, 39, 0.15) 0%, transparent 40%)',
          }}
        />
        {/* Cinematic vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.6) 100%)',
          }}
        />
      </div>

      {/* Animated light rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[800px]"
          style={{
            background: 'linear-gradient(180deg, rgba(201, 162, 39, 0.08) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Animated particles with depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => {
          const size = Math.random() > 0.7 ? 3 : Math.random() > 0.5 ? 2 : 1;
          const depth = Math.random();
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: depth > 0.6
                  ? `rgba(201, 162, 39, ${0.2 + depth * 0.3})`
                  : `rgba(255, 255, 255, ${0.1 + depth * 0.2})`,
                filter: depth > 0.6 ? `blur(${depth}px)` : 'none',
              }}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: -20,
                scale: 0.5 + depth * 0.5,
              }}
              animate={{
                y: typeof window !== 'undefined' ? window.innerHeight + 20 : 1000,
                x: `+=${Math.random() * 100 - 50}`,
              }}
              transition={{
                duration: (15 + Math.random() * 15) / (0.5 + depth * 0.5),
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: 'linear',
              }}
            />
          );
        })}
      </div>

      {/* 3D Profile Image */}
      <motion.div
        className="relative mb-8"
        style={{ y: y2, opacity }}
        initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute -inset-8 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201, 162, 39, 0.15) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Rotating outer ring with 3D effect */}
        <motion.div
          className="absolute -inset-6 rounded-full"
          style={{
            border: '1px solid rgba(201, 162, 39, 0.3)',
            boxShadow: '0 0 30px rgba(201, 162, 39, 0.1)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />

        {/* Second rotating ring (opposite direction) */}
        <motion.div
          className="absolute -inset-3 rounded-full border border-white/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />

        {/* Profile Image Container with 3D effect */}
        <motion.div
          className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            boxShadow: `
              0 0 60px rgba(201, 162, 39, 0.3),
              0 20px 60px rgba(0, 0, 0, 0.5)
            `,
          }}
          animate={{
            boxShadow: [
              '0 0 60px rgba(201, 162, 39, 0.3), 0 20px 60px rgba(0, 0, 0, 0.5)',
              '0 0 80px rgba(201, 162, 39, 0.4), 0 20px 60px rgba(0, 0, 0, 0.5)',
              '0 0 60px rgba(201, 162, 39, 0.3), 0 20px 60px rgba(0, 0, 0, 0.5)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Gold border ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#c9a227]/50 z-10" />

          {/* Profile Image */}
          <Image
            src="/images/profile-artistic.jpg"
            alt="Harsha Kumarasingha"
            fill
            className="object-cover"
            priority
          />

          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/40 via-transparent to-[#c9a227]/5" />

          {/* Reflection highlight */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Social Media Icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex gap-4 mb-8"
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            target={social.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[#c9a227] hover:border-[#c9a227] transition-all duration-300"
            style={{
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            }}
            whileHover={{
              scale: 1.2,
              y: -3,
              boxShadow: '0 8px 30px rgba(201, 162, 39, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            aria-label={social.label}
          >
            <social.Icon size={18} />
          </motion.a>
        ))}
      </motion.div>

      {/* Name and Title Section with 3D depth */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto"
        style={{ y: y1 }}
      >
        {/* Main Name with 3D shadow */}
        <motion.h1
          initial={{ opacity: 0, y: 50, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-4"
          style={{
            textShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <span className="hero-subtitle-cinematic text-3xl sm:text-4xl md:text-5xl lg:text-6xl block mb-1">
            Harsha
          </span>
          <span
            className="hero-subtitle-cinematic text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            style={{
              background: 'linear-gradient(135deg, #c9a227 0%, #ffd700 50%, #c9a227 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 20px rgba(201, 162, 39, 0.4))',
            }}
          >
            Kumarasingha
          </span>
        </motion.h1>

        {/* Divider with glow */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="w-20 h-px mx-auto my-6"
          style={{
            background: 'linear-gradient(90deg, transparent, #c9a227, transparent)',
            boxShadow: '0 0 20px rgba(201, 162, 39, 0.5)',
          }}
        />

        {/* Role Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="font-cinzel text-base sm:text-lg md:text-xl tracking-[0.15em] text-white/70 mb-10"
        >
          <TypeAnimation
            sequence={[
              'DevOps Engineer',
              3000,
              () => setCurrentRole('DevOps Engineer'),
              'Cloud Engineer',
              3000,
              () => setCurrentRole('Cloud Engineer'),
              'Full Stack Developer',
              3000,
              () => setCurrentRole('Full Stack Developer'),
            ]}
            wrapper="span"
            speed={40}
            repeat={Infinity}
          />
        </motion.div>

        {/* CTA Buttons with 3D hover effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={getCurrentResumeInfo().file}
              className="inline-block px-8 py-4 font-raleway text-xs tracking-[0.2em] uppercase border border-[#c9a227] text-[#c9a227] hover:bg-[#c9a227] hover:text-[#050508] transition-all duration-300"
              style={{
                boxShadow: '0 5px 30px rgba(201, 162, 39, 0.2)',
              }}
              download
            >
              {getCurrentResumeInfo().label}
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
            <a
              href="#contact"
              className="inline-block px-8 py-4 font-raleway text-xs tracking-[0.2em] uppercase border border-white/20 text-white/70 hover:border-white/50 hover:text-white transition-all duration-300"
              style={{
                boxShadow: '0 5px 30px rgba(0, 0, 0, 0.3)',
              }}
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator with animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="scroll-indicator mb-3 text-white/40">Scroll</span>
        <motion.div
          className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2"
          style={{ boxShadow: '0 0 20px rgba(201, 162, 39, 0.1)' }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-[#c9a227]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;