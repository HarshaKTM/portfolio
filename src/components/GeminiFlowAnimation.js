import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GeminiFlowAnimation = () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (!containerRef.current) return;
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    };

    // Initial dimensions
    updateDimensions();

    // Update dimensions on resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Array of curve data for flowing lines
  const curves = [
    // Main Google Gemini Blue/Purple curves
    { color: '#8C67E9', opacity: 0.6, offset: 0, duration: 30 },
    { color: '#6D4FF0', opacity: 0.5, offset: 0.2, duration: 40 },
    { color: '#3B82F6', opacity: 0.4, offset: 0.4, duration: 35 },
    // Subtle additional colors
    { color: '#A78BFA', opacity: 0.3, offset: 0.6, duration: 45 },
    { color: '#4F46E5', opacity: 0.35, offset: 0.8, duration: 38 },
    // Light accents
    { color: '#C4B5FD', opacity: 0.25, offset: 1, duration: 42 },
  ];

  // Generate wave-like SVG path
  const generatePath = (width, height, offset = 0) => {
    if (!width || !height) return '';

    const segments = 5;
    const segmentWidth = width / segments;
    const waveHeight = height * 0.15;
    const verticalOffset = height * 0.5 + (offset * height * 0.2);

    let path = `M 0 ${verticalOffset}`;

    for (let i = 0; i <= segments; i++) {
      const x = i * segmentWidth;
      const yOffset = Math.sin((i / segments) * Math.PI * 2 + offset * Math.PI * 2) * waveHeight;
      path += ` L ${x} ${verticalOffset + yOffset}`;
    }

    return path;
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
    >
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-radial-gradient-dark opacity-70" />
      
      {/* Left highlight */}
      <div className="absolute -left-20 top-1/4 w-40 h-40 rounded-full bg-purple-600/20 blur-3xl" />
      
      {/* Right highlight */}
      <div className="absolute -right-20 bottom-1/4 w-40 h-40 rounded-full bg-blue-600/20 blur-3xl" />
      
      {/* SVG container */}
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${dimensions.width || 1000} ${dimensions.height || 1000}`} 
        className="absolute inset-0"
      >
        {/* Flowing lines from left to right */}
        {dimensions.width > 0 && dimensions.height > 0 && curves.map((curve, index) => (
          <motion.path
            key={`curve-left-to-right-${index}`}
            d={generatePath(dimensions.width, dimensions.height, curve.offset)}
            fill="none"
            stroke={curve.color}
            strokeWidth={2}
            strokeOpacity={curve.opacity}
            initial={{ pathLength: 0, x: -dimensions.width * 0.2 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              x: [
                -dimensions.width * 0.2,
                0,
                dimensions.width * 0.2,
                dimensions.width * 0.4
              ],
            }}
            transition={{
              duration: curve.duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              times: [0, 0.4, 0.6, 1],
            }}
          />
        ))}

        {/* Flowing lines from right to left, slight variation */}
        {dimensions.width > 0 && dimensions.height > 0 && curves.slice(0, 4).map((curve, index) => (
          <motion.path
            key={`curve-right-to-left-${index}`}
            d={generatePath(dimensions.width, dimensions.height, curve.offset + 0.5)}
            fill="none"
            stroke={curve.color}
            strokeWidth={1.5}
            strokeOpacity={curve.opacity * 0.8}
            initial={{ pathLength: 0, x: dimensions.width * 0.2 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              x: [
                dimensions.width * 0.4,
                dimensions.width * 0.2,
                0,
                -dimensions.width * 0.2
              ],
            }}
            transition={{
              duration: curve.duration * 1.2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              times: [0, 0.4, 0.6, 1],
              delay: curve.duration * 0.1,
            }}
          />
        ))}
      </svg>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
};

export default GeminiFlowAnimation; 