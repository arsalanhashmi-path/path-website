
import React, { useEffect, useRef } from 'react';

export const GraphBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Configuration
    // Full screen but faded in center
    const nodeCount = 130; // Increased from 80
    const connectionDistance = 180; // Increased from 150
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3, 
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cy = height / 2;
      
      // Update and draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls (Full screen)
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Calculate Alpha based on distance from central horizontal axis (Clear channel)
        const distY = Math.abs(node.y - cy);
        const safeHalfHeight = height * 0.25; // Middle 50%
        
        let alpha = 0;
        if (distY > safeHalfHeight) {
             alpha = Math.min(0.6, (distY - safeHalfHeight) / 100); // Increased max opacity from 0.3 to 0.6
        }

        // Draw node
        if (alpha > 0.01) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2); // Slightly larger nodes
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();

            // Draw connections
            for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const odistY = Math.abs(other.y - cy);
            
            let otherAlpha = 0;
            if (odistY > safeHalfHeight) {
                otherAlpha = Math.min(0.6, (odistY - safeHalfHeight) / 100);
            }

            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                const connBaseAlpha = Math.min(alpha, otherAlpha);
                const distAlpha = 1 - distance / connectionDistance;
                
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${connBaseAlpha * distAlpha * 0.8})`; // Increased line opacity multiplier
                ctx.lineWidth = 1;
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            }
            }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};
