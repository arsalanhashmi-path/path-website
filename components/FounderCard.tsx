import React from 'react';

interface FounderCardProps {
  name: string;
  title: string;
  bio: string;
  portfolioUrl: string;
  thumbnailUrl: string;
}

export const FounderCard: React.FC<FounderCardProps> = ({
  name,
  title,
  bio,
  portfolioUrl,
  thumbnailUrl,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 w-full max-w-5xl mx-auto">
      {/* Founder Info Card - Minimal, clean design */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-8">
          {/* Initials badge */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 md:bg-white text-white md:text-slate-900 text-xl font-bold mb-6 shadow-sm">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          
          {/* Name & Title */}
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-white md:to-slate-400 mb-2">
            {name}
          </h3>
          <p className="text-lg text-slate-500 md:text-slate-500 font-medium uppercase tracking-wide">
            {title}
          </p>
        </div>
        
        {/* Bio */}
        <p className="text-slate-600 md:text-slate-400 leading-relaxed text-lg max-w-md">
          {bio}
        </p>
      </div>

      {/* Portfolio Thumbnail - Clean card */}
      <a
        href={portfolioUrl}
        className="group flex-1 relative rounded-xl overflow-hidden border border-slate-200 md:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.01] hover:border-slate-300 md:hover:border-slate-600"
      >
        <div className="aspect-video bg-slate-100 md:bg-slate-900 relative overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={`${name}'s Portfolio`}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <span className="px-5 py-2.5 bg-white/95 rounded-full text-slate-900 text-sm font-medium flex items-center gap-2 shadow-lg">
              View Portfolio
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};
