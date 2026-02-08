import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
  <div className="p-8 border border-path-border rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
    <h3 className="text-2xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-path-secondary leading-relaxed">{description}</p>
  </div>
);

export const Features: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-8 border-t border-path-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <FeatureCard 
            title="Perfect Recall"
            description="Instantly retrieve decision chains, project arcs, and blockers across all teams without manual documentation."
          />
          <FeatureCard 
            title="Narrative Intelligence"
            description="Turn unstructured communication into structured events and actionable insights that drive clarity."
          />
        </div>
      </div>
    </section>
  );
};