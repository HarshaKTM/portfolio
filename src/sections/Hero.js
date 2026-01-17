import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the GeminiFlowAnimation to avoid SSR issues
const GeminiFlowAnimation = dynamic(() => import('../components/GeminiFlowAnimation'), { ssr: false });

// Resume mapping for different roles
const RESUME_MAPPING = {
  'Full Stack Developer': {
    file: '/resumes/Harsha Kumarasingha-SE.pdf',
    label: 'Download Full Stack CV'
  },
  'DevOps Engineer': {
    file: '/resumes/Harsha Kumarasingha-DevOps.pdf',
    label: 'Download DevOps CV'
  },
  'Quality Assurence': {
    file: '/resumes/Harsha Kumarasingha-QA.pdf',
    label: 'Download QA CV'
  },
  'Problem Solver & Quick Learner': {
    file: '/resumes/Harsha-Kumarasingha-General.pdf',
    label: 'Download Resume'
  }
};

const Hero = () => {
  const [imageError, setImageError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRole, setCurrentRole] = useState('Full Stack Developer');
  const heroRef = useRef(null);

  // Track mouse position for parallax effect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate transform values for parallax effect
  const calculateTransform = (depth = 1) => {
    const maxMovement = 20;
    const xMovement = (mousePosition.x - 0.5) * maxMovement * depth;
    const yMovement = (mousePosition.y - 0.5) * maxMovement * depth;
    
    return {
      transform: `translate(${xMovement}px, ${yMovement}px)`,
    };
  };

  // Get current resume info based on role
  const getCurrentResumeInfo = () => {
    return RESUME_MAPPING[currentRole] || RESUME_MAPPING['Full Stack Developer'];
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black to-gray-900"
    >
      {/* Google AI Gemini-style flowing line animation */}
      <GeminiFlowAnimation />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-gray-900/20 to-black/40 z-1" />

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left flex-1"
            style={calculateTransform(0.5)}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              animate={{
                textShadow: ['0 0 15px rgba(139, 92, 246, 0)', '0 0 25px rgba(139, 92, 246, 0.5)', '0 0 15px rgba(139, 92, 246, 0)']
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Hi, I'm <span className="text-purple-500">Harsha Kumarasingha</span>
            </motion.h1>
            
            <div className="text-3xl md:text-5xl font-semibold text-gray-300 mb-8">
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  2000,
                  () => setCurrentRole('Full Stack Developer'),
                  'DevOps Engineer',
                  2000,
                  () => setCurrentRole('DevOps Engineer'),
                  'Quality Assurence',
                  2000,
                  () => setCurrentRole('Quality Assurence'),
                  'Problem Solver & Quick Learner',
                  2000,
                  () => setCurrentRole('Problem Solver & Quick Learner'),
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xl text-gray-400 mb-8 max-w-2xl">
                I build scalable, reliable web applications by integrating DevOps automation, optimizing infrastructure,
                and ensuring high-quality software through comprehensive testing.
                Passionate about continuous learning and applying new technologies to enhance development and user experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 justify-center md:justify-start"
            >
              <motion.div
                key={currentRole}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={getCurrentResumeInfo().file}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] flex items-center"
                  download
                >
                  <span>{getCurrentResumeInfo().label}</span>
                  <motion.span 
                    className="ml-2"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ↓
                  </motion.span>
                </Link>
              </motion.div>
              <a
                href="#contact"
                className="px-8 py-3 border border-purple-600 text-purple-400 rounded-full hover:bg-purple-600/10 transition-colors hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              >
                Contact Me
              </a>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-64 h-64 md:w-96 md:h-96"
            style={calculateTransform(-0.8)}
          >
            {/* Floating animation */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="relative w-full h-full"
            >
              {/* Glow effect */}
              <motion.div 
                className="absolute inset-0 bg-purple-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              />
              
              <div className="relative rounded-full overflow-hidden border-4 border-purple-500/20 w-full h-full">
                {!imageError ? (
                  <img
                    src="/images/profile-artistic.jpg"
                    alt="Harsha Kumarasingha"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-purple-600/20 flex items-center justify-center">
                    <span className="text-4xl font-bold text-purple-400">HK</span>
                  </div>
                )}
              </div>
              
              {/* Orbiting particle */}
              <motion.div
                className="absolute w-6 h-6 rounded-full bg-purple-500/80 shadow-lg shadow-purple-500/50"
                animate={{
                  x: [0, 100, 0, -100, 0],
                  y: [0, -100, 0, 100, 0],
                  scale: [1, 1.2, 1, 0.8, 1],
                  opacity: [0.7, 1, 0.7, 0.4, 0.7],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {/* Small orbiting particle */}
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-indigo-500/80 shadow-lg shadow-indigo-500/50"
                animate={{
                  x: [0, -60, 0, 60, 0],
                  y: [0, 60, 0, -60, 0],
                  scale: [1, 0.8, 1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5, 1, 0.5],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-purple-500 rounded-full p-2">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-1.5 h-1.5 bg-purple-500 rounded-full mx-auto"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 