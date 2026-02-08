import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LoadingScreen } from './components/LoadingScreen';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial resource loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-path-bg text-path-text selection:bg-white selection:text-black">
      <LoadingScreen isLoading={isLoading} />
      
      {/* Main Content Fade In */}
      <div 
        className={`transition-opacity duration-1000 ease-in-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Navbar />
        <main>
          <Hero />
        </main>
        
        <footer className="py-12 px-6 border-t border-path-border text-center text-path-secondary text-sm">
          <p>© {new Date().getFullYear()} Path. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;