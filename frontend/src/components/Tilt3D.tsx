import React, { useRef, useState } from 'react';

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt angle in degrees
  onClick?: () => void;
}

export const Tilt3D: React.FC<Tilt3DProps> = ({ 
  children, 
  className = '', 
  maxTilt = 8,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate cursor coordinates relative to card bounds
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalise values between -1 and 1
    const x = (mouseX - width / 2) / (width / 2);
    const y = (mouseY - height / 2) / (height / 2);

    // Calculate rotation angles
    const rotateX = -y * maxTilt;
    const rotateY = x * maxTilt;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out',
      }}
      className={`tilt-card-3d-wrapper cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};
