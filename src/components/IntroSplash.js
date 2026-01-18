import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroSplash = ({ onEnter }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [hasEntered, setHasEntered] = useState(false);

    useEffect(() => {
        // Check if user has already entered
        const entered = sessionStorage.getItem('hasEntered');
        if (entered) {
            setIsVisible(false);
            setHasEntered(true);
        }
    }, []);

    const handleEnter = () => {
        sessionStorage.setItem('hasEntered', 'true');
        setHasEntered(true);
        setTimeout(() => {
            setIsVisible(false);
            if (onEnter) onEnter();
        }, 800);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    onClick={handleEnter}
                    className="fixed inset-0 z-[200] bg-[#0a0a0a] cursor-pointer flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Animated background particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-white/20"
                                initial={{
                                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                                    y: -10,
                                }}
                                animate={{
                                    y: typeof window !== 'undefined' ? window.innerHeight + 10 : 1000,
                                }}
                                transition={{
                                    duration: 6 + Math.random() * 8,
                                    repeat: Infinity,
                                    delay: Math.random() * 5,
                                    ease: 'linear',
                                }}
                            />
                        ))}
                    </div>

                    {/* Radial glow */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(201, 162, 39, 0.08) 0%, transparent 60%)',
                        }}
                    />

                    {/* Central content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="relative z-10 text-center"
                    >
                        {/* Logo/Name */}
                        <motion.h1
                            className="font-cinzel text-5xl md:text-7xl text-white mb-4 tracking-[0.2em]"
                            animate={{
                                textShadow: [
                                    '0 0 20px rgba(201, 162, 39, 0.3)',
                                    '0 0 40px rgba(201, 162, 39, 0.5)',
                                    '0 0 20px rgba(201, 162, 39, 0.3)',
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            HK
                        </motion.h1>

                        <div className="divider-gold mb-8" />

                        <motion.p
                            className="font-raleway text-white/50 text-sm tracking-[0.3em] uppercase mb-12"
                        >
                            Portfolio Experience
                        </motion.p>
                    </motion.div>

                    {/* Click to enter prompt */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
                    >
                        <motion.p
                            className="font-raleway text-white/40 text-xs tracking-[0.4em] uppercase"
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Click anywhere to enter
                        </motion.p>
                    </motion.div>

                    {/* Cinematic frame */}
                    <div className="absolute inset-0 pointer-events-none border border-white/5 m-3" />

                    {/* Exit animation overlay */}
                    {hasEntered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-[#0a0a0a] z-20"
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroSplash;
