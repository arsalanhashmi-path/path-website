import React from 'react';
import { GraphBackground } from './GraphBackground';
import { FounderCard } from './FounderCard';

// Founder data
const founders = [
  {
    name: 'Ali Asad',
    title: 'Founder',
    bio: 'Junior Full-Stack AI Engineer with 5+ years of experience building intelligent systems. Passionate about creating agentic applications that push the boundaries of human-computer interaction.',
    portfolioUrl: 'https://agentic-terminal.vercel.app/',
    thumbnailUrl: 'https://agentic-terminal.vercel.app/og-image.png',
  },
];

export const FoundersPage: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-8 w-full overflow-hidden bg-slate-950 pt-32 pb-20">
      {/* Background */}
      <GraphBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            Meet Our Founders
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            The visionaries building the future of organizational intelligence.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="w-full space-y-12">
          {founders.map((founder) => (
            <FounderCard
              key={founder.name}
              name={founder.name}
              title={founder.title}
              bio={founder.bio}
              portfolioUrl={founder.portfolioUrl}
              thumbnailUrl={founder.thumbnailUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
