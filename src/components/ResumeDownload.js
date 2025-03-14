import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';

// Resume mapping for different roles
const RESUME_MAPPING = {
  'Full Stack Developer': {
    file: '/resumes/Harsha-Kumarasingha-FullStack.pdf',
    label: 'Download Full Stack CV'
  },
  'DevOps Engineer': {
    file: '/resumes/Harsha-Kumarasingha-DevOps.pdf',
    label: 'Download DevOps CV'
  },
  'Quality Assurence': {
    file: '/resumes/Harsha-Kumarasingha-QA.pdf',
    label: 'Download QA CV'
  },
  'Problem Solver & Quick Learner': {
    file: '/resumes/Harsha-Kumarasingha-General.pdf',
    label: 'Download Resume'
  }
};

const ResumeDownload = ({ currentRole }) => {
  // Get current resume info based on role
  const getCurrentResumeInfo = () => {
    return RESUME_MAPPING[currentRole] || RESUME_MAPPING['Full Stack Developer'];
  };

  return (
    <motion.div
      key={currentRole}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={getCurrentResumeInfo().file}
        className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] flex items-center"
        download
      >
        <span>{getCurrentResumeInfo().label}</span>
        <motion.span 
          className="ml-2"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiDownload />
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default ResumeDownload; 