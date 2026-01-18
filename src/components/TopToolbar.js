import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { FiMusic, FiPlay, FiPause } from 'react-icons/fi';
import { FaYoutube } from 'react-icons/fa';
import { subscribeMusicEvents, dispatchMusicEvent, musicEvents } from './MusicPlayer';

const TopToolbar = () => {
    const { theme, toggleTheme, mounted } = useTheme();
    const [time, setTime] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isYouTube, setIsYouTube] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);

    const isDark = theme === 'dark';

    // Clock effect
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            setTime(timeString);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Music player effect
    useEffect(() => {
        const unsubscribe = subscribeMusicEvents((eventType, data) => {
            if (eventType === musicEvents.UPDATE_STATUS) {
                setIsPlaying(data.isPlaying);
                setIsYouTube(data.isYouTube);
                if (data.currentTrack) {
                    setCurrentTrack(data.currentTrack);
                }
            }
            if (eventType === musicEvents.TRACK_INFO) {
                setCurrentTrack(data);
            }
        });

        dispatchMusicEvent(musicEvents.GET_TRACK_INFO);

        return () => unsubscribe();
    }, []);

    const togglePlay = () => {
        dispatchMusicEvent(musicEvents.TOGGLE_PLAY);
    };

    if (!mounted) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="fixed top-4 right-4 z-50 flex items-center gap-3"
        >
            {/* Clock */}
            <motion.div
                className="px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md"
                whileHover={{ scale: 1.05, borderColor: 'rgba(201, 162, 39, 0.3)' }}
            >
                <span className="font-raleway text-sm tracking-wider text-white/70">
                    {time}
                </span>
            </motion.div>

            {/* Music Player */}
            <div className="relative">
                <motion.button
                    onClick={togglePlay}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300 ${isPlaying
                            ? 'bg-[#c9a227]/20 border-[#c9a227]/50 text-[#c9a227]'
                            : 'bg-black/40 border-white/10 text-white/70 hover:border-[#c9a227]/30 hover:text-white'
                        }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isPlaying ? 'Pause music' : 'Play music'}
                >
                    {isYouTube ? (
                        <FaYoutube size={16} className="text-red-500" />
                    ) : (
                        <FiMusic size={16} />
                    )}
                    {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
                </motion.button>

                {/* Tooltip */}
                {showTooltip && currentTrack && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full mt-2 right-0 bg-black/90 border border-[#c9a227]/30 text-white text-xs rounded-sm py-2 px-3 whitespace-nowrap backdrop-blur-md"
                        style={{ minWidth: '150px' }}
                    >
                        <p className="font-medium text-[#c9a227]">{currentTrack.title}</p>
                        <p className="text-white/50 text-[10px]">{currentTrack.artist}</p>
                    </motion.div>
                )}
            </div>

            {/* Theme Toggle */}
            <motion.button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:border-[#c9a227]/30 hover:text-[#c9a227] transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
            >
                <motion.div
                    animate={{ rotate: isDark ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                >
                    {isDark ? (
                        <BsFillMoonFill size={18} />
                    ) : (
                        <BsFillSunFill size={18} className="text-yellow-400" />
                    )}
                </motion.div>
            </motion.button>
        </motion.div>
    );
};

export default TopToolbar;
