import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { GraphBackground } from './GraphBackground';
import { NarrativeStreams } from './NarrativeStreams';

export const Hero: React.FC = () => {
  const fullText = "Organizational Intelligence and Narrative Memory";
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    // Initial delay before typing starts
    const startDelay = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setTimeout(() => setIsTyping(false), 500); // Pause before highlighting
        }
      }, 50); // Typing speed
      return () => clearInterval(intervalId);
    }, 800);

    return () => clearTimeout(startDelay);
  }, []);

  // Segment the text based on provided indices
  // "Organizational " (0-15)
  // "Intelligence" (15-27)
  // " and Narrative " (27-42)
  // "Memory" (42-48)
  const seg1 = displayText.slice(0, 15);
  const seg2 = displayText.slice(15, 27);
  const seg3 = displayText.slice(27, 42);
  const seg4 = displayText.slice(42, 48);

  // Dynamic Styles based on Typing State & Viewport (Mobile/Desktop)

  // Highlight Box Background
  // Mobile: Slate-900 when done (High contrast against Light BG)
  // Desktop: White when done (High contrast against Dark BG)
  const highlightBgClass = isTyping
    ? "bg-transparent"
    : "bg-slate-900 md:bg-white shadow-sm";

  // Text Color inside Highlight
  // Mobile: White text on Dark Box
  // Desktop: Dark text on White Box
  const highlightTextClass = isTyping
    ? "text-slate-400 md:text-slate-500" // Dimmed while typing
    : "text-white md:text-transparent md:bg-clip-text md:bg-gradient-to-b md:from-black md:to-slate-600";

  // Standard Text Color
  // Mobile: Dark Slate
  // Desktop: Gradient White/Gray
  const standardTextClass = "text-slate-800 md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-white md:to-slate-400";

  return (
    <section className="group relative min-h-screen flex flex-col justify-center items-center px-6 md:px-8 w-full overflow-hidden text-center bg-slate-50 md:bg-slate-950 transition-colors duration-500">

      {/* Background Visualization */}
      <NarrativeStreams />
      <GraphBackground />

      {/* Content Area */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto mt-[10vh]">

        {/* Main Headline */}
        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] md:leading-tight min-h-[4em] md:min-h-[auto] transition-transform duration-700 ease-out ${standardTextClass} group-hover:-translate-y-2 mt-12`}>
          {seg1}
          {/* Highlight 1: Intelligence */}
          <span className={`inline-block px-1 py-0 mx-0.5 rounded-sm transition-all duration-700 ease-out ${highlightBgClass}`}>
            <span className={`transition-colors duration-1500 ease-out ${highlightTextClass}`}>
              {seg2}
            </span>
          </span>
          <br className="block md:hidden" />
          <span className="inline-block mt-2">
            {seg3}
            <br className="block md:hidden" />
            {/* Highlight 2: Memory */}
            <span className={`inline-block px-1 py-0 mx-0.5 rounded-sm transition-all duration-700 ease-out ${highlightBgClass}`}>
              <span className={`transition-colors duration-1500 ease-out ${highlightTextClass}`}>
                {seg4}
              </span>
            </span>
          </span>

          {/* Cursor */}
          {isTyping && (
            <span className="inline-block w-1 h-[0.9em] bg-slate-800 md:bg-white ml-1 align-middle animate-pulse" />
          )}
        </h1>

        {/* Subtitle & CTA */}
        <div
          className={`
            flex flex-col items-center max-w-2xl
            transition-all duration-1000 ease-out delay-300
            mt-16 md:mt-48
            ${isTyping ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}
          `}
        >
          <p className="text-lg md:text-xl text-slate-600 md:text-slate-400 mb-10 leading-relaxed font-light">
            Path automatically reconstructs your company's working memory from Slack, Email, and Docs.
          </p>

          <div className="flex gap-4">
            <Button variant="primary" href="#discover">
              Discover Path
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};