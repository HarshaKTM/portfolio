import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdMusicalNote, IoMdPause, IoMdSkipForward, IoMdSkipBackward, IoMdVolumeHigh } from 'react-icons/io';
import { FaRegListAlt, FaYoutube } from 'react-icons/fa';
import { HiOutlineVolumeUp, HiOutlineVolumeOff } from 'react-icons/hi';
import YouTube from 'react-youtube';
import { musicEvents, subscribeMusicEvents, dispatchMusicEvent, updateMusicState } from './MusicPlayer';

// Helper function to extract YouTube video ID from URL
const getYouTubeId = (url) => {
  if (!url) return null;
  
  // Match YouTube URL patterns
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
};

// Check if a URL is a YouTube URL
const isYouTubeUrl = (url) => {
  return url && (
    url.includes('youtube.com') || 
    url.includes('youtu.be') || 
    url.includes('youtube-nocookie.com')
  );
};

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [volume, setVolume] = useState(0.6); // Higher default volume
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [lastVolume, setLastVolume] = useState(0.6);
  const [isLoading, setIsLoading] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentGenre, setCurrentGenre] = useState('all');
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const [isYouTubeReady, setIsYouTubeReady] = useState(false);
  
  const audioRef = useRef(null);

  // Music tracks organized by genre with more reliable audio sources and YouTube videos
  const musicLibrary = {
    
    lofi: [
      {
        title: "Lofi Hip Hop Radio",
        artist: "Lofi Girl",
        url: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
        duration: "Live",
        type: "youtube"
      }
    ],
    electronic: [
      {
        title: "Electronic Mix",
        artist: "Various Artists",
        url: "https://www.youtube.com/watch?v=36YnV9STBqc",
        duration: "1:23:45",
        type: "youtube"
      }
    ],
    relaxing: [
      {
        title: "Relaxing Piano",
        artist: "Piano Relaxation",
        url: "https://www.youtube.com/watch?v=77ZozI0rw7w",
        duration: "3:00:00",
        type: "youtube"
      }
    ]
  };

  // Flatten all tracks for continuous play
  const allTracks = Object.values(musicLibrary).flat();
  
  const currentTrack = allTracks[currentTrackIndex];
  const isCurrentTrackYouTube = currentTrack && isYouTubeUrl(currentTrack.url);
  const youtubeVideoId = isCurrentTrackYouTube ? getYouTubeId(currentTrack.url) : null;

  // YouTube player options
  const youtubeOpts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: isPlaying ? 1 : 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0
    }
  };

  // Handle YouTube player ready event
  const onYouTubeReady = (event) => {
    console.log("YouTube player ready");
    setYoutubePlayer(event.target);
    setIsYouTubeReady(true);
    setIsLoading(false);
    
    try {
      // Set volume
      event.target.setVolume(isMuted ? 0 : volume * 100);
      
      // Auto-play if needed
      if (isPlaying) {
        setTimeout(() => {
          try {
            event.target.playVideo();
          } catch (error) {
            console.error("Error auto-playing YouTube video:", error);
          }
        }, 500); // Small delay to ensure player is fully ready
      }
    } catch (error) {
      console.error("Error initializing YouTube player:", error);
    }
  };

  // Handle YouTube player state change
  const onYouTubeStateChange = (event) => {
    // YouTube states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    try {
      switch (event.data) {
        case YouTube.PlayerState.PLAYING:
          setIsPlaying(true);
          setIsLoading(false);
          break;
        case YouTube.PlayerState.PAUSED:
          setIsPlaying(false);
          break;
        case YouTube.PlayerState.BUFFERING:
          setIsLoading(true);
          break;
        case YouTube.PlayerState.ENDED:
          handleEnded();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error handling YouTube state change:", error);
    }
  };

  // Get tracks by current genre selection
  const getCurrentTracks = useCallback(() => {
    if (currentGenre === 'all') return allTracks;
    return musicLibrary[currentGenre] || [];
  }, [currentGenre, allTracks]);

  // Define nextTrack using useCallback BEFORE it's used in any dependencies
  const nextTrack = useCallback(() => {
    const tracks = getCurrentTracks();
    const currentIndexInGenre = tracks.findIndex(track => track.url === currentTrack?.url);
    const nextIndexInGenre = (currentIndexInGenre + 1) % tracks.length;
    const nextTrack = tracks[nextIndexInGenre];
    const nextIndexInAll = allTracks.findIndex(track => track.url === nextTrack.url);
    setCurrentTrackIndex(nextIndexInAll);
  }, [getCurrentTracks, currentTrack, allTracks]);

  const prevTrack = useCallback(() => {
    const tracks = getCurrentTracks();
    const currentIndexInGenre = tracks.findIndex(track => track.url === currentTrack?.url);
    const prevIndexInGenre = (currentIndexInGenre - 1 + tracks.length) % tracks.length;
    const prevTrack = tracks[prevIndexInGenre];
    const prevIndexInAll = allTracks.findIndex(track => track.url === prevTrack.url);
    setCurrentTrackIndex(prevIndexInAll);
  }, [getCurrentTracks, currentTrack, allTracks]);

  const selectGenre = useCallback((genre) => {
    setCurrentGenre(genre);
    // If we switch genre, start with the first track in that genre
    if (genre !== 'all') {
      setCurrentTrackIndex(allTracks.findIndex(track => 
        track.url === musicLibrary[genre][0].url));
    }
  }, [allTracks, musicLibrary]);

  const selectTrack = useCallback((index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setShowPlaylist(false);
  }, []);

  const handleEnded = useCallback(() => {
    nextTrack();
  }, [nextTrack]);

  // Force play current track
  const forcePlayCurrent = useCallback(() => {
    if (audioRef.current) {
      setRetryCount(0);
      setAudioError(null);
      setIsPlaying(true);
    }
  }, []);

  // Try specified track 
  const trySpecificTrack = useCallback((genreName, trackIndex = 0) => {
    if (musicLibrary[genreName] && musicLibrary[genreName][trackIndex]) {
      const newTrack = musicLibrary[genreName][trackIndex];
      const newIndex = allTracks.findIndex(t => t.url === newTrack.url);
      if (newIndex !== -1) {
        setCurrentTrackIndex(newIndex);
        setRetryCount(0);
        setAudioError(null);
        setIsPlaying(true);
      }
    }
  }, [allTracks, musicLibrary]);

  // Function to test if an audio source is playable
  const testAudioSource = useCallback((url) => {
    return new Promise((resolve, reject) => {
      if (!url) {
        reject(new Error('Invalid URL'));
        return;
      }
      
      const audio = new Audio();
      audio.volume = 0; // Silent
      
      const onCanPlay = () => {
        cleanup();
        resolve(true);
      };
      
      const onError = () => {
        cleanup();
        reject(new Error(`Cannot play: ${url}`));
      };
      
      const cleanup = () => {
        audio.removeEventListener('canplaythrough', onCanPlay);
        audio.removeEventListener('error', onError);
        audio.src = '';
      };
      
      audio.addEventListener('canplaythrough', onCanPlay);
      audio.addEventListener('error', onError);
      
      // Set a timeout to avoid hanging
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error('Timeout testing audio source'));
      }, 5000);
      
      audio.src = url;
      audio.load();
      
      return () => {
        clearTimeout(timeout);
        cleanup();
      };
    });
  });

  useEffect(() => {
    setIsMounted(true);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Handle audio element events
  useEffect(() => {
    if (!isMounted || !audioRef.current) return;
    
    const audio = audioRef.current;
    
    const handleCanPlay = () => {
      setIsLoading(false);
      setAudioError(null);
      setRetryCount(0);
      console.log("Audio can play now");
    };
    
    const handleLoadStart = () => {
      setIsLoading(true);
      setAudioError(null);
    };
    
    const handleError = async (e) => {
      console.error("Audio error:", e);
      setIsLoading(false);
      
      if (retryCount < 3) {
        // Try the next track automatically
        setRetryCount(prev => prev + 1);
        setAudioError(`Error loading track. Trying next one... (Attempt ${retryCount + 1}/3)`);
        
        try {
          // Try to find a working track
          const genres = Object.keys(musicLibrary);
          let foundWorkingTrack = false;
          
          // First try the next track in the current genre
          const tracks = getCurrentTracks();
          const currentIndexInGenre = tracks.findIndex(track => track.url === currentTrack?.url);
          const nextIndexInGenre = (currentIndexInGenre + 1) % tracks.length;
          const nextTrackToTry = tracks[nextIndexInGenre];
          
          try {
            await testAudioSource(nextTrackToTry.url);
            setTimeout(() => nextTrack(), 1500);
            foundWorkingTrack = true;
          } catch (error) {
            console.log("Next track also has issues, trying a different genre");
          }
          
          // If that didn't work, try tracks from different genres
          if (!foundWorkingTrack) {
            for (const genre of genres) {
              if (foundWorkingTrack) break;
              
              try {
                const trackToTest = musicLibrary[genre][0];
                await testAudioSource(trackToTest.url);
                setTimeout(() => trySpecificTrack(genre, 0), 1500);
                foundWorkingTrack = true;
                break;
              } catch (genreError) {
                console.log(`Genre ${genre} track failed:`, genreError);
              }
            }
          }
          
          // If we still haven't found a working track, just try next
          if (!foundWorkingTrack) {
            setTimeout(() => nextTrack(), 1500);
          }
        } catch (testError) {
          console.error("Error finding a working track:", testError);
          setTimeout(() => nextTrack(), 1500);
        }
      } else {
        setAudioError("Multiple playback errors. Your browser might not support these audio formats.");
        setIsPlaying(false);
        setRetryCount(0);
      }
    };
    
    // Add event listeners
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('error', handleError);
    
    // Clean up
    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('error', handleError);
    };
  }, [isMounted, retryCount, nextTrack, currentTrack, getCurrentTracks, musicLibrary, trySpecificTrack, testAudioSource]);

  // Handle play/pause with better error handling
  useEffect(() => {
    if (!isMounted) return;
    
    if (isPlaying) {
      setIsLoading(true);
      
      if (isCurrentTrackYouTube) {
        // Handle YouTube playback
        if (youtubePlayer && isYouTubeReady) {
          try {
            youtubePlayer.playVideo();
          } catch (error) {
            console.error("Error playing YouTube video:", error);
            setIsLoading(false);
          }
        }
      } else if (audioRef.current) {
        // Handle audio playback
        audioRef.current.load();
        
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsLoading(false);
              console.log("Audio playing successfully");
            })
            .catch(error => {
              console.error("Error playing audio:", error);
              setIsPlaying(false);
              setIsLoading(false);
              setAudioError(`Couldn't play audio: ${error.message}`);
              
              // Auto show controls on error to help user troubleshoot
              setShowControls(true);
              
              // Try to handle common errors
              if (error.message.includes("no supported sources") || 
                  error.message.includes("Failed to load") ||
                  error.message.includes("NotAllowedError") ||
                  error.message.includes("NotSupportedError")) {
                
                // Automatically try the next track
                setTimeout(() => {
                  nextTrack();
                  setIsPlaying(true);
                }, 1000);
              }
            });
        }
      }
    } else {
      // Pause playback
      if (isCurrentTrackYouTube && youtubePlayer) {
        youtubePlayer.pauseVideo();
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isMounted, currentTrackIndex, nextTrack, isCurrentTrackYouTube, youtubePlayer, isYouTubeReady]);

  // Update volume
  useEffect(() => {
    const newVolume = isMuted ? 0 : volume;
    
    if (isCurrentTrackYouTube && youtubePlayer) {
      try {
        youtubePlayer.setVolume(newVolume * 100);
      } catch (error) {
        console.error("Error setting YouTube volume:", error);
      }
    } else if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, [volume, isMuted, isCurrentTrackYouTube, youtubePlayer]);

  // Auto-start music after user interaction
  const startAutoPlay = useCallback(() => {
    console.log("User interaction detected, attempting to play music");
    setIsPlaying(true);
    setShowControls(true);
    setTimeout(() => {
      setShowControls(false);
    }, 5000);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const handleFirstInteraction = () => {
      startAutoPlay();
      
      // Remove event listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isMounted, startAutoPlay]);

  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(lastVolume);
    } else {
      setLastVolume(volume);
      setIsMuted(true);
    }
  }, [isMuted, volume, lastVolume]);

  // Prefetch the next track when current track is playing
  useEffect(() => {
    if (isPlaying && audioRef.current && !audioError) {
      const tracks = getCurrentTracks();
      const currentIndexInGenre = tracks.findIndex(track => track.url === currentTrack?.url);
      const nextIndexInGenre = (currentIndexInGenre + 1) % tracks.length;
      const nextTrack = tracks[nextIndexInGenre];
      
      // Create a temporary audio element to prefetch
      const tempAudio = new Audio();
      tempAudio.preload = 'auto';
      tempAudio.volume = 0; // Silent
      tempAudio.src = nextTrack.url;
      
      // Cleanup
      return () => {
        tempAudio.src = '';
      };
    }
  }, [currentTrackIndex, isPlaying, audioError, currentTrack, getCurrentTracks]);

  // Update global music state when local state changes
  useEffect(() => {
    if (isMounted) {
      updateMusicState({
        isPlaying,
        isYouTube: isCurrentTrackYouTube,
        currentTrack: currentTrack
      });
    }
  }, [isPlaying, isCurrentTrackYouTube, currentTrack, isMounted]);

  // Listen for global music events
  useEffect(() => {
    if (!isMounted) return;
    
    const unsubscribe = subscribeMusicEvents((eventType, data) => {
      if (eventType === musicEvents.TOGGLE_PLAY) {
        setIsPlaying(prev => !prev);
      }
      if (eventType === musicEvents.GET_TRACK_INFO && currentTrack) {
        dispatchMusicEvent(musicEvents.TRACK_INFO, currentTrack);
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [isMounted, currentTrack]);

  if (!isMounted) return null;

  return (
    <>
      {/* Audio element for regular audio files */}
      {!isCurrentTrackYouTube && (
        <audio
          ref={audioRef}
          src={currentTrack?.url}
          onEnded={handleEnded}
          preload="auto"
          loop={false}
          crossOrigin="anonymous"
        >
          <source src={currentTrack?.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      
      {/* YouTube player (hidden) */}
      {isCurrentTrackYouTube && youtubeVideoId && (
        <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
          <YouTube
            videoId={youtubeVideoId}
            opts={{
              ...youtubeOpts,
              playerVars: {
                ...youtubeOpts.playerVars,
                autoplay: 0 // Disable autoplay in options, we'll handle it manually
              }
            }}
            onReady={onYouTubeReady}
            onStateChange={onYouTubeStateChange}
            onError={(e) => {
              console.error("YouTube error:", e);
              setAudioError("Error playing YouTube video. Trying next track...");
              setTimeout(() => nextTrack(), 1500);
            }}
          />
        </div>
      )}
      
      <div className="fixed bottom-4 right-4 z-50">
        <motion.button
          className={`w-12 h-12 rounded-full ${isPlaying ? 'bg-purple-600' : 'bg-purple-600/90'} text-white flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors relative`}
          onClick={() => setShowControls(!showControls)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={showControls ? "Hide music controls" : "Show music controls"}
        >
          {isLoading ? (
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-white border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : null}
          
          {isCurrentTrackYouTube ? <FaYoutube size={20} /> : <IoMdMusicalNote size={20} />}
        </motion.button>
        
        {/* Music Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 bg-gray-800 rounded-lg shadow-xl p-4 w-72 border border-gray-700"
            >
              {/* Current Track Info */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium truncate">{currentTrack?.title || "Unknown Track"}</h3>
                  {isCurrentTrackYouTube && (
                    <FaYoutube className="text-red-500 ml-2" size={18} />
                  )}
                </div>
                <p className="text-gray-400 text-sm truncate">{currentTrack?.artist || "Unknown Artist"}</p>
                
                {audioError && (
                  <p className="text-red-400 text-xs mt-1">{audioError}</p>
                )}
              </div>
              
              {/* Controls */}
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={prevTrack}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Previous track"
                >
                  <IoMdSkipBackward size={24} />
                </button>
                
                <button 
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <IoMdPause size={24} /> : <IoMdMusicalNote size={24} />}
                </button>
                
                <button 
                  onClick={nextTrack}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Next track"
                >
                  <IoMdSkipForward size={24} />
                </button>
                
                <button 
                  onClick={toggleMute}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <HiOutlineVolumeOff size={24} /> : <HiOutlineVolumeUp size={24} />}
                </button>
                
                <button 
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className={`text-gray-400 hover:text-white transition-colors ${showPlaylist ? 'text-purple-400' : ''}`}
                  aria-label={showPlaylist ? "Hide playlist" : "Show playlist"}
                >
                  <FaRegListAlt size={20} />
                </button>
              </div>
              
              {/* Volume Slider */}
              <div className="flex items-center space-x-2">
                <HiOutlineVolumeOff size={16} className="text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const newVolume = parseFloat(e.target.value);
                    setVolume(newVolume);
                    if (isMuted && newVolume > 0) {
                      setIsMuted(false);
                    }
                  }}
                  className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `linear-gradient(to right, #9333ea ${(isMuted ? 0 : volume) * 100}%, #374151 ${(isMuted ? 0 : volume) * 100}%)`
                  }}
                />
                <IoMdVolumeHigh size={16} className="text-gray-400" />
              </div>
              
              {/* Genre Selector */}
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => selectGenre('all')}
                    className={`px-3 py-1 text-xs rounded-full ${
                      currentGenre === 'all' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    All
                  </button>
                  {Object.keys(musicLibrary).map(genre => (
                    <button
                      key={genre}
                      onClick={() => selectGenre(genre)}
                      className={`px-3 py-1 text-xs rounded-full capitalize ${
                        currentGenre === genre 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Playlist */}
              <AnimatePresence>
                {showPlaylist && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 max-h-60 overflow-y-auto custom-scrollbar"
                  >
                    <div className="space-y-2">
                      {getCurrentTracks().map((track, index) => {
                        const trackIndex = allTracks.findIndex(t => t.url === track.url);
                        const isYouTube = isYouTubeUrl(track.url);
                        
                        return (
                          <button
                            key={track.url}
                            onClick={() => selectTrack(trackIndex)}
                            className={`w-full text-left p-2 rounded flex items-center ${
                              trackIndex === currentTrackIndex
                                ? 'bg-purple-600/20 text-purple-300'
                                : 'hover:bg-gray-700/50 text-gray-300'
                            }`}
                          >
                            <div className="mr-2">
                              {trackIndex === currentTrackIndex && isPlaying ? (
                                <div className="w-4 h-4 flex items-center justify-center">
                                  <motion.div
                                    className="w-2 h-2 bg-purple-400 rounded-full"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                  />
                                </div>
                              ) : (
                                <div className="w-4 h-4 flex items-center justify-center">
                                  {isYouTube ? (
                                    <FaYoutube className="text-red-500" size={12} />
                                  ) : (
                                    <IoMdMusicalNote className="text-gray-400" size={12} />
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="truncate text-sm">{track.title}</div>
                              <div className="text-xs text-gray-500 truncate">{track.artist}</div>
                            </div>
                            <div className="text-xs text-gray-500 ml-2">{track.duration}</div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default BackgroundMusic; 