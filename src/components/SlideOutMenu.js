import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';

const SlideOutMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // Close menu on route change
    useEffect(() => {
        const handleRouteChange = () => setIsOpen(false);
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => router.events.off('routeChangeComplete', handleRouteChange);
    }, [router]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const menuLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/#projects', label: 'Projects' },
        { href: '/#skills', label: 'Skills' },
        { href: '/#terminal', label: 'DevOps' },
        { href: '/articles', label: 'Articles' },
        { href: '/#contact', label: 'Contact' },
    ];

    const handleLinkClick = (e, href) => {
        setIsOpen(false);

        // Handle hash links
        if (href.includes('#')) {
            e.preventDefault();
            const [path, hash] = href.split('#');

            if (router.pathname === path || (path === '/' && router.pathname === '/')) {
                // Same page, just scroll
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Navigate to page then scroll
                router.push(href);
            }
        }
    };

    return (
        <>
            {/* Menu Button - Top Left */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => setIsOpen(true)}
                className="fixed top-6 left-8 z-[100] font-raleway text-xs tracking-[0.2em] uppercase text-white/70 hover:text-[#c9a227] transition-colors duration-300 cursor-pointer"
            >
                Menu
            </motion.button>

            {/* Slide-out Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150]"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
                            className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-[#0a0a0a] z-[160] border-r border-white/5"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-6 right-6 font-raleway text-xs tracking-[0.2em] uppercase text-white/70 hover:text-[#c9a227] transition-colors"
                            >
                                Close
                            </button>

                            {/* Nav Links */}
                            <nav className="flex flex-col justify-center h-full px-12">
                                {menuLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={(e) => handleLinkClick(e, link.href)}
                                            className={`block py-4 font-cinzel text-2xl tracking-[0.1em] transition-all duration-300 ${router.pathname === link.href ||
                                                    (link.href.startsWith('/#') && router.pathname === '/')
                                                    ? 'text-[#c9a227]'
                                                    : 'text-white/70 hover:text-white hover:pl-4'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Social Links */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex space-x-6 mt-12 pt-8 border-t border-white/10"
                                >
                                    <a href="https://github.com/HarshaKTM" target="_blank" rel="noopener noreferrer"
                                        className="text-white/50 hover:text-[#c9a227] transition-colors">
                                        <FiGithub size={20} />
                                    </a>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                        className="text-white/50 hover:text-[#c9a227] transition-colors">
                                        <FiLinkedin size={20} />
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                        className="text-white/50 hover:text-[#c9a227] transition-colors">
                                        <FiTwitter size={20} />
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                                        className="text-white/50 hover:text-[#c9a227] transition-colors">
                                        <FiInstagram size={20} />
                                    </a>
                                </motion.div>
                            </nav>

                            {/* Decorative line */}
                            <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default SlideOutMenu;
