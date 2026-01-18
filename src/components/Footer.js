import Link from 'next/link';
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: 'https://github.com/HarshaKTM', icon: FiGithub, label: 'GitHub' },
    { href: 'https://twitter.com', icon: FiTwitter, label: 'Twitter' },
    { href: 'https://linkedin.com', icon: FiLinkedin, label: 'LinkedIn' },
    { href: 'https://instagram.com', icon: FiInstagram, label: 'Instagram' },
  ];

  return (
    <footer className="bg-[#050505] text-white/70 py-16 relative">
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />

      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-cinzel text-2xl tracking-[0.15em] text-white">HK</span>
            </Link>
            <p className="font-raleway text-white/40 text-sm leading-relaxed max-w-xs">
              Building modern applications with a focus on performance, scalability, and premium user experience.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:border-[#c9a227] hover:text-[#c9a227] transition-all duration-300"
                  whileHover={{ y: -3 }}
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-raleway text-xs tracking-[0.2em] uppercase text-white/50 mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-raleway text-white/40 hover:text-[#c9a227] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-raleway text-xs tracking-[0.2em] uppercase text-white/50 mb-6">
              Contact
            </h3>
            <ul className="space-y-3 font-raleway text-white/40 text-sm">
              <li>Harshakumara1998030944@gmail.com</li>
              <li>+94 773351707</li>
              <li>Malabe, Sri Lanka</li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-raleway text-white/30 text-xs tracking-wider">
            © {currentYear} Harsha Kumarasingha. All rights reserved.
          </p>
          <p className="font-raleway text-white/30 text-xs tracking-wider">
            Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 