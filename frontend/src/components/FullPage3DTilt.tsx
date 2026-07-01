import React from 'react';

interface FullPage3DTiltProps {
  children: React.ReactNode;
}

export const FullPage3DTilt: React.FC<FullPage3DTiltProps> = ({ children }) => {
  return (
    <div className="flex-grow w-full">
      {children}
    </div>
  );
};
export default FullPage3DTilt;
