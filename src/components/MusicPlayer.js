import { useState, useEffect } from 'react';
import { FiMusic, FiPlay, FiPause } from 'react-icons/fi';
import { FaYoutube } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Create a global event system for music control
export const musicEvents = {
  TOGGLE_PLAY: 'TOGGLE_PLAY',
  SET_PLAYING: 'SET_PLAYING',
  SET_PAUSED: 'SET_PAUSED',
  UPDATE_STATUS: 'UPDATE_STATUS',
  GET_TRACK_INFO: 'GET_TRACK_INFO',
  TRACK_INFO: 'TRACK_INFO'
};

// Global state for music player status
let globalMusicState = {
  isPlaying: false,
  isYouTube: false,
  currentTrack: null
};

// Global event listeners
const listeners = new Set();

// Function to dispatch events to all listeners
export const dispatchMusicEvent = (eventType, data) => {
  listeners.forEach(listener => listener(eventType, data));
};

// Function to subscribe to music events
export const subscribeMusicEvents = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

// Function to update global state
export const updateMusicState = (newState) => {
  globalMusicState = { ...globalMusicState, ...newState };
  dispatchMusicEvent(musicEvents.UPDATE_STATUS, globalMusicState);
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isYouTube, setIsYouTube] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Subscribe to music events
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
    
    // Request current track info
    dispatchMusicEvent(musicEvents.GET_TRACK_INFO);
    
    return () => {
      unsubscribe();
    };
  }, []);

  const togglePlay = () => {
    dispatchMusicEvent(musicEvents.TOGGLE_PLAY);
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <motion.button 
        onClick={togglePlay}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`flex items-center space-x-1 px-3 py-1.5 rounded-full ${
          isPlaying 
            ? 'bg-purple-600 text-white' 
            : 'bg-gray-800 dark:bg-gray-700 text-gray-300 hover:text-white'
        } transition-colors duration-300`}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isYouTube ? <FaYoutube size={16} className="text-red-500 mr-1" /> : <FiMusic size={16} className="mr-1" />}
        {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
      </motion.button>
      
      <AnimatePresence>
        {showTooltip && currentTrack && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-lg z-50"
            style={{ minWidth: '150px' }}
          >
            <div className="text-center">
              <p className="font-medium">{currentTrack.title}</p>
              <p className="text-gray-400 text-xs">{currentTrack.artist}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicPlayer; 