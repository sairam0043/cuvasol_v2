import React from 'react';
import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';
import { FullPage3DTilt } from '../components/FullPage3DTilt.js';
import { FloatingParticles3D } from '../components/FloatingParticles3D.js';
import { ThemeChooser } from '../components/ThemeChooser.js';

export const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 overflow-hidden relative">
      <Navbar />
      <main className="flex-grow pt-20 flex flex-col relative">
        <FullPage3DTilt>
          <div className="relative w-full h-full flex flex-col flex-grow">
            <FloatingParticles3D />
            <div className="relative z-10 w-full h-full flex flex-col flex-grow">
              {children}
            </div>
          </div>
        </FullPage3DTilt>
      </main>
      <Footer />
      <ThemeChooser />
    </div>
  );
};
export default DefaultLayout;
