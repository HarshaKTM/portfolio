import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const PARTICLE_COUNT = 50;
const COLORS = ['#8B5CF6', '#6366F1', '#3B82F6', '#5B21B6', '#7C3AED'];

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [particles, setParticles] = useState([]);
  const animationControls = useAnimation();

  // Initialize particles
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    // Set initial dimensions
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    // Start animation
    animationControls.start({
      background: [
        'radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.15) 0%, rgba(30, 41, 59, 0) 70%)',
        'radial-gradient(circle at 80% 30%, rgba(99, 102, 241, 0.15) 0%, rgba(30, 41, 59, 0) 70%)',
        'radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.15) 0%, rgba(30, 41, 59, 0) 70%)',
        'radial-gradient(circle at 60% 50%, rgba(124, 58, 237, 0.15) 0%, rgba(30, 41, 59, 0) 70%)',
        'radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.15) 0%, rgba(30, 41, 59, 0) 70%)',
      ],
    }, { duration: 20, repeat: Infinity, ease: "linear" });
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, [animationControls]);
  
  // Create particles when dimensions change
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    const newParticles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 4 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    
    setParticles(newParticles);
  }, [dimensions]);
  
  // Animation loop for particles
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    
    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Update and draw particles
      setParticles(currentParticles => 
        currentParticles.map(particle => {
          // Move particle
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;
          
          // Bounce off edges
          if (newX < 0 || newX > dimensions.width) {
            particle.speedX *= -1;
            newX = particle.x + particle.speedX;
          }
          
          if (newY < 0 || newY > dimensions.height) {
            particle.speedY *= -1;
            newY = particle.y + particle.speedY;
          }
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
          ctx.fill();
          
          // Return updated particle
          return {
            ...particle,
            x: newX,
            y: newY,
          };
        })
      );
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [particles, dimensions]);
  
  // Add connections between nearby particles
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    
    const drawConnections = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      
      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(149, 129, 255, ${0.15 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = window.requestAnimationFrame(drawConnections);
    };
    
    drawConnections();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [particles, dimensions]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        animate={animationControls}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 z-1"
      />
    </div>
  );
};

export default AnimatedBackground; 