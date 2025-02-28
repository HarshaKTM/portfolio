import Navigation from './Navigation';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

export default function Layout({ children }) {
  const { darkMode } = useTheme();

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-black text-gray-100' : 'bg-gray-50 text-black'} transition-colors duration-200`}>
      <Navigation />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
    </div>
  );
} 