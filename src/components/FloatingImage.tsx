import React from 'react';
import { motion } from 'framer-motion';
import LazyImage from './LazyImage';

interface FloatingImageProps {
  src: string;
  className: string;
  delay?: number;
  alt?: string;
}

const FloatingImage: React.FC<FloatingImageProps> = ({ 
  src, 
  className, 
  delay = 0,
  alt = "Floating decoration"
}) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    style={{ zIndex: 1 }}
    initial={{ opacity: 0, y: 100 }}
    animate={{ 
      opacity: [0.4, 0.7, 0.4],
      y: [0, -10, 0],
      rotate: [0, 2, 0, -2, 0],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "mirror"
    }}
  >
    <LazyImage
      src={src}
      alt={alt}
      className="rounded-full object-cover w-full h-full"
      priority={false}
    />
  </motion.div>
);

export default FloatingImage;