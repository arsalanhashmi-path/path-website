import React from 'react';

export const AliAsadPortfolio: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full">
      <iframe
        src="https://agentic-terminal.vercel.app/"
        className="w-full h-full border-0"
        title="Ali Asad Portfolio"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};
