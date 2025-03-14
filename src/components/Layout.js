import Navigation from './Navigation';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the BackgroundMusic component to avoid SSR issues
const BackgroundMusic = dynamic(() => import('./BackgroundMusic'), { ssr: false });

const ChatBot = dynamic(() => import('./ChatBot'), {
  ssr: false,
});

export default function Layout({ children }) {
  const { theme, isDarkMode, mounted } = useTheme();
  
  // Skip rendering until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-gray-900"></div>;
  }
  
  return (
    <div className={`
      min-h-screen w-full transition-colors duration-300
      ${isDarkMode
        ? 'bg-gray-900 text-gray-100'
        : 'bg-gray-50 text-gray-900'
      }
    `}>
      <Navigation />
      <div className={`
        transition-colors duration-300
        ${isDarkMode ? 'text-white' : 'text-gray-900'}
      `}>
        {children}
      </div>
      <Footer />
      
      {/* Background music player */}
      <BackgroundMusic />
      <ChatBot />
    </div>
  );
} 