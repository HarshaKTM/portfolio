import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [trail, setTrail] = useState([]);
    const [sparkles, setSparkles] = useState([]);
    const trailRef = useRef([]);
    const sparkleId = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });

            // Add to trail
            trailRef.current.push({ x: e.clientX, y: e.clientY, id: Date.now() });
            if (trailRef.current.length > 20) {
                trailRef.current.shift();
            }
            setTrail([...trailRef.current]);

            // Random sparkles (less frequent)
            if (Math.random() > 0.85) {
                const newSparkle = {
                    id: sparkleId.current++,
                    x: e.clientX + (Math.random() - 0.5) * 40,
                    y: e.clientY + (Math.random() - 0.5) * 40,
                };
                setSparkles(prev => [...prev.slice(-10), newSparkle]);

                // Remove sparkle after animation
                setTimeout(() => {
                    setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
                }, 1000);
            }
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, [role="button"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <>
            {/* Hide default cursor */}
            <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

            {/* Trail effect */}
            {trail.map((point, index) => (
                <motion.div
                    key={point.id}
                    className="fixed pointer-events-none z-[9999]"
                    style={{
                        left: point.x,
                        top: point.y,
                        transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div
                        className="rounded-full"
                        style={{
                            width: `${4 + (index / trail.length) * 4}px`,
                            height: `${4 + (index / trail.length) * 4}px`,
                            background: `rgba(201, 162, 39, ${0.1 + (index / trail.length) * 0.3})`,
                            filter: 'blur(1px)',
                        }}
                    />
                </motion.div>
            ))}

            {/* Sparkles */}
            <AnimatePresence>
                {sparkles.map((sparkle) => (
                    <motion.div
                        key={sparkle.id}
                        className="fixed pointer-events-none z-[9999]"
                        style={{
                            left: sparkle.x,
                            top: sparkle.y,
                            transform: 'translate(-50%, -50%)',
                        }}
                        initial={{ opacity: 1, scale: 0 }}
                        animate={{
                            opacity: [1, 1, 0],
                            scale: [0, 1, 0.5],
                            y: -30,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path
                                d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
                                fill="#c9a227"
                                style={{ filter: 'drop-shadow(0 0 3px rgba(201, 162, 39, 0.8))' }}
                            />
                        </svg>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Main cursor - outer ring */}
            <motion.div
                className="fixed pointer-events-none z-[10000]"
                style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    transform: 'translate(-50%, -50%)',
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{ duration: 0.2 }}
            >
                <div
                    className="rounded-full"
                    style={{
                        width: '40px',
                        height: '40px',
                        border: '1px solid rgba(201, 162, 39, 0.4)',
                        boxShadow: isHovering
                            ? '0 0 20px rgba(201, 162, 39, 0.4), inset 0 0 20px rgba(201, 162, 39, 0.1)'
                            : 'none',
                        transition: 'all 0.3s ease',
                    }}
                />
            </motion.div>

            {/* Main cursor - center dot */}
            <motion.div
                className="fixed pointer-events-none z-[10000]"
                style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    transform: 'translate(-50%, -50%)',
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
            >
                <div
                    className="rounded-full"
                    style={{
                        width: '6px',
                        height: '6px',
                        background: '#c9a227',
                        boxShadow: '0 0 10px rgba(201, 162, 39, 0.8)',
                    }}
                />
            </motion.div>
        </>
    );
};

export default CustomCursor;
