import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShouldRender(false), 500); // Wait for transition to finish
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-path-bg transition-opacity duration-500 ease-in-out ${
        isLoading ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div className="text-2xl font-bold tracking-[5px] animate-pulse-slow text-white select-none">
        / \
      </div>
    </div>
  );
};