import React from 'react';
import { motion } from 'framer-motion';

interface Section3DProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section3D: React.FC<Section3DProps> = ({ children, className = '', id }) => {
  const section3DVariants = {
    hidden: { 
      opacity: 0, 
      rotateX: 12, 
      z: -60,
      transformPerspective: 1500 
    },
    visible: { 
      opacity: 1, 
      rotateX: 0, 
      z: 0,
      transition: { 
        type: "spring", 
        stiffness: 35, 
        damping: 14,
        duration: 0.8
      } 
    }
  };

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={section3DVariants}
      className={`origin-top perspective-container-3d ${className}`}
    >
      {children}
    </motion.section>
  );
};
export default Section3D;
