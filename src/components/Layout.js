import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components to avoid SSR issues
const BackgroundMusic = dynamic(() => import('./BackgroundMusic'), { ssr: false });
const ChatBot = dynamic(() => import('./ChatBot'), { ssr: false });
const IntroSplash = dynamic(() => import('./IntroSplash'), { ssr: false });
const SlideOutMenu = dynamic(() => import('./SlideOutMenu'), { ssr: false });
const CornerNav = dynamic(() => import('./CornerNav'), { ssr: false });
const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });
const TopToolbar = dynamic(() => import('./TopToolbar'), { ssr: false });

export default function Layout({ children }) {
  const { theme, mounted } = useTheme();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if already entered
    const hasEntered = sessionStorage.getItem('hasEntered');
    if (hasEntered) {
      setShowContent(true);
    }
  }, []);

  const handleEnter = () => {
    setShowContent(true);
  };

  // Skip rendering until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-[#0a0a0a]"></div>;
  }

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-gray-100 text-gray-900'
      }`}>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Top Toolbar - Clock, Music, Theme Toggle */}
      <TopToolbar />

      {/* Cinematic Intro Splash */}
      <IntroSplash onEnter={handleEnter} />

      {/* Slide-out Menu */}
      <SlideOutMenu />

      {/* Corner Navigation */}
      <CornerNav />

      {/* Main Content */}
      <div className="transition-opacity duration-500">
        {children}
      </div>

      <Footer />

      {/* Background music player */}
      <BackgroundMusic />
      <ChatBot />
    </div>
  );
} 