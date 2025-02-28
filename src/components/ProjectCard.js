import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProjectCard({ title, description, image, demoLink, codeLink }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex space-x-4">
          <Link href={demoLink} className="text-blue-600 hover:text-blue-800">Demo</Link>
          <Link href={codeLink} className="text-gray-600 hover:text-gray-800">Code</Link>
        </div>
      </div>
    </motion.div>
  );
} 