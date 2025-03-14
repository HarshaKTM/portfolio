import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === 'dark';

  // Don't render anything until client-side
  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center cursor-pointer overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle dark mode"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Sun */}
        <motion.div
          className="absolute w-6 h-6"
          animate={{
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <BsFillSunFill className="w-full h-full text-yellow-400" />
        </motion.div>

        {/* Moon */}
        <motion.div
          className="absolute w-6 h-6"
          animate={{
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <BsFillMoonFill className="w-full h-full text-blue-300" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle; 