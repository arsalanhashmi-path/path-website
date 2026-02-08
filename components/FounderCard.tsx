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
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full max-w-5xl mx-auto">
      {/* Founder Info Card */}
      <div className="flex-1 p-8 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{name}</h3>
            <p className="text-indigo-400 font-medium">{title}</p>
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed">{bio}</p>
      </div>

      {/* Portfolio Thumbnail */}
      <a
        href={portfolioUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex-1 relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-indigo-500/50 hover:shadow-indigo-500/20 hover:shadow-2xl"
      >
        <div className="aspect-video bg-slate-900 relative overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={`${name}'s Portfolio`}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <span className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium border border-white/20 flex items-center gap-2">
              Visit Portfolio
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};
