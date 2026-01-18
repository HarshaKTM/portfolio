import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const CornerNav = () => {
    const router = useRouter();
    const [currentSection, setCurrentSection] = useState(0);

    // Define sections for the home page
    const sections = [
        { id: 'home', label: 'Home' },
        { id: 'terminal', label: 'DevOps' },
        { id: 'projects', label: 'Projects' },
        { id: 'skills', label: 'Skills' },
        { id: 'contact', label: 'Contact' },
    ];

    // Track current section based on scroll
    useEffect(() => {
        if (router.pathname !== '/') return;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i].id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= windowHeight / 2) {
                        setCurrentSection(i);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, [router.pathname]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        if (router.pathname !== '/') {
            router.push('/');
            return;
        }
        if (currentSection > 0) {
            scrollToSection(sections[currentSection - 1].id);
        }
    };

    const handleNext = () => {
        if (router.pathname !== '/') {
            router.push('/#projects');
            return;
        }
        if (currentSection < sections.length - 1) {
            scrollToSection(sections[currentSection + 1].id);
        }
    };

    const prevSection = currentSection > 0 ? sections[currentSection - 1] : null;
    const nextSection = currentSection < sections.length - 1 ? sections[currentSection + 1] : null;

    // Only show on home page
    if (router.pathname !== '/') return null;

    return (
        <>
            {/* Previous Section - Bottom Left */}
            {prevSection && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    onClick={handlePrev}
                    className="fixed bottom-6 left-8 z-50 font-raleway text-xs tracking-[0.2em] uppercase text-white/50 hover:text-[#c9a227] transition-colors duration-300 group flex items-center gap-3"
                >
                    <span className="text-[0.65rem] opacity-50 group-hover:opacity-100 transition-opacity">←——</span>
                    <span>{prevSection.label}</span>
                </motion.button>
            )}

            {/* Next Section - Bottom Right */}
            {nextSection && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    onClick={handleNext}
                    className="fixed bottom-6 right-8 z-50 font-raleway text-xs tracking-[0.2em] uppercase text-white/50 hover:text-[#c9a227] transition-colors duration-300 group flex items-center gap-3"
                >
                    <span>{nextSection.label}</span>
                    <span className="text-[0.65rem] opacity-50 group-hover:opacity-100 transition-opacity">——→</span>
                </motion.button>
            )}
        </>
    );
};

export default CornerNav;
