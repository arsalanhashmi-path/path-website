
import React, { useEffect, useRef } from 'react';

export const NarrativeStreams: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    // Molecular Visualization Config
    const MOLECULE_SCALE = 1.3;

    interface Node {
      id: number;
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      phase: number;
      helixTargetStrand: number; // 0-3
    }

    interface Atom {
      x: number;
      y: number;
      z: number; // depth -1 to 1
      radius: number;
      color: string;
      glow?: string;
      alpha: number;
    }

    let nodes: Node[] = [];

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      nodes = [];

      // --- Build Floating Lattice (Source of Events) ---
      const latticeStartX = width * 0.05;
      const latticeEndX = width * 0.22;
      const latticeYStart = height * 0.35;
      const latticeYEnd = height * 0.85;

      const nodeCount = 25;

      for (let i = 0; i < nodeCount; i++) {
        const x = latticeStartX + Math.random() * (latticeEndX - latticeStartX);
        const y = latticeYStart + Math.random() * (latticeYEnd - latticeYStart);

        nodes.push({
          id: i,
          baseX: x, baseY: y, x: x, y: y,
          vx: (Math.random() - 0.5) * 20,
          vy: (Math.random() - 0.5) * 20,
          phase: Math.random() * Math.PI * 2,
          helixTargetStrand: Math.floor(Math.random() * 4)
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now() * 0.001;
      // Shift center down to 58% of height
      const centerScreenY = height * 0.58;

      // Zones
      const helixStartX = width * 0.30;
      const helixEndX = width * 0.70;
      const helixWidth = helixEndX - helixStartX;
      const waveEndX = width;

      // Calculate Tip Oscillation
      const tipFreq = 0.08; // Reduced from 0.15
      const tipAmp = 40;
      // Negative time for outward travel visual logic in sine
      const tipYOffset = Math.sin(-time * tipFreq * 10) * tipAmp;

      // --- 1. Draw Floating Lattice (Source) ---

      // Update Physics (Floating) - Slower
      nodes.forEach(node => {
        // Floating motion
        node.x = node.baseX + Math.sin(time * 0.25 + node.phase) * 15; // 0.5 -> 0.25
        node.y = node.baseY + Math.cos(time * 0.15 + node.phase) * 15; // 0.3 -> 0.15
      });

      // Draw Connections (Distance based)
      ctx.lineWidth = 1;
      nodes.forEach((node, i) => {
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      // Draw Nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#050505';
        ctx.fill();

        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(6, 182, 212, 0.5)';
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });


      // --- 2. GENERATE DNA MOLECULE (Atoms) ---
      const atoms: Atom[] = [];
      const baseSpinSpeed = 0.3; // Reduced from 0.6
      const helixFreq = 0.02;
      const radius = 70 * MOLECULE_SCALE;
      const steps = 80;
      const stepSize = (helixEndX - helixStartX) / steps;

      // Helper for positioning
      const getStrandPos = (x: number, angleOffset: number, seed: number) => {
        const progress = Math.max(0, (x - helixStartX) / helixWidth); // 0 to 1

        // Delayed Tapering
        let taper = 1;
        if (progress > 0.4) {
          const taperProgress = (progress - 0.4) / 0.6;
          taper = (Math.cos(taperProgress * Math.PI) + 1) / 2;
        }

        const shiftFactor = Math.pow(progress, 2.5);
        const currentCenterY = centerScreenY + tipYOffset * shiftFactor;

        // Slower float
        const globalFloatY = Math.sin(time * 0.8 + x * 0.01) * 15 * (1 - shiftFactor);

        const chaos = 0;

        // Slower acceleration
        const currentSpinSpeed = baseSpinSpeed + progress * 1.0;
        const spatialTwist = Math.pow(progress, 2) * 2;

        const angle = x * helixFreq - time * currentSpinSpeed + spatialTwist + angleOffset;
        const y = currentCenterY + Math.sin(angle) * radius * taper + globalFloatY;
        const z = Math.cos(angle) * taper;

        return { x, y, z, angle, taper, chaos };
      };

      for (let i = 0; i <= steps; i++) {
        const x = helixStartX + i * stepSize;

        const s1 = getStrandPos(x, 0, 1);
        const s2 = getStrandPos(x, Math.PI, 2);
        const s3 = getStrandPos(x, Math.PI * 0.5, 3);
        const s4 = getStrandPos(x, Math.PI * 1.5, 4);

        if (s1.taper <= 0.005) continue;

        const atomScale = 0.3 + 0.7 * s1.taper;

        const progress = (x - helixStartX) / helixWidth;
        const rainbowMix = Math.max(0, (progress - 0.7) / 0.3);

        // Slower hue cycle
        const rainbowHue = (360 - (time * 20 + x * 0.1) % 360);

        const baseHue1 = 180;
        const baseHue2 = 210;

        let hue1 = baseHue1;
        let hue2 = baseHue2;

        hue1 = hue1 * (1 - rainbowMix) + rainbowHue * rainbowMix;
        hue2 = hue2 * (1 - rainbowMix) + rainbowHue * rainbowMix;

        const pushAtom = (s: any, hue: number) => {
          atoms.push({
            x: s.x, y: s.y, z: s.z, radius: 4.0 * atomScale, alpha: 1,
            color: `hsl(${hue}, 100%, ${90 - rainbowMix * 20}%)`,
            glow: rainbowMix > 0.5 ? `hsl(${hue}, 100%, 60%)` : undefined
          });
        };

        pushAtom(s1, hue1);
        pushAtom(s2, hue2);
        pushAtom(s3, hue1);
        pushAtom(s4, hue2);

        const drawConnector = (sa: any, sb: any, colorBase: string) => {
          const dist = Math.sqrt((sa.x - sb.x) ** 2 + (sa.y - sb.y) ** 2);
          if (dist > 3 * atomScale) {
            const atomCount = Math.floor(dist / (15 * atomScale));
            for (let k = 1; k < atomCount; k++) {
              const t = k / atomCount;
              const ax = sa.x + (sb.x - sa.x) * t;
              const ay = sa.y + (sb.y - sa.y) * t;
              const az = sa.z + (sb.z - sa.z) * t;
              atoms.push({
                x: ax, y: ay, z: az, radius: 1.5 * atomScale, alpha: 0.8, color: colorBase
              });
            }
          }
        };

        drawConnector(s1, s2, '#cbd5e1');
        drawConnector(s3, s4, '#94a3b8');
      }

      atoms.sort((a, b) => a.z - b.z);

      atoms.forEach(atom => {
        const depthScale = 0.6 + ((atom.z + 1) / 2) * 0.6;
        const r = atom.radius * depthScale;
        const alpha = atom.alpha * (0.4 + ((atom.z + 1) / 2) * 0.6);

        ctx.beginPath();
        ctx.arc(atom.x, atom.y, r, 0, Math.PI * 2);
        ctx.fillStyle = atom.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        if (atom.glow) {
          ctx.shadowBlur = 15 * depthScale;
          ctx.shadowColor = atom.glow;
          ctx.fillStyle = '#fff';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;
      });


      // --- 4. DRAW FEEDER STREAMS ---
      const s1Start = getStrandPos(helixStartX, 0, 1);
      const s2Start = getStrandPos(helixStartX, Math.PI, 2);
      const s3Start = getStrandPos(helixStartX, Math.PI * 0.5, 3);
      const s4Start = getStrandPos(helixStartX, Math.PI * 1.5, 4);
      const targets = [s1Start, s2Start, s3Start, s4Start];

      nodes.forEach((node, i) => {
        // Streams originate from right side of the node
        const startX = node.x + 4;
        const target = targets[node.helixTargetStrand];

        ctx.beginPath();
        ctx.moveTo(startX, node.y);

        const cp1x = startX + (helixStartX - startX) * 0.5;
        const cp1y = node.y;
        const cp2x = helixStartX - (helixStartX - startX) * 0.2;
        const cp2y = target.y;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, target.x, target.y);

        const grad = ctx.createLinearGradient(startX, node.y, helixStartX, target.y);
        grad.addColorStop(0, `rgba(6, 182, 212, 0)`);
        grad.addColorStop(0.3, `rgba(6, 182, 212, 0.1)`);
        grad.addColorStop(1, `rgba(6, 182, 212, 0.4)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Particles feeding events
        const pRate = 1.0 + (i % 3) * 0.3; // Slower particles
        const pTime = (time * pRate + node.phase) % 4;

        if (pTime < 1) {
          const t = pTime;
          const omt = 1 - t;
          const cx = omt * omt * omt * startX + 3 * omt * omt * t * cp1x + 3 * omt * t * t * cp2x + t * t * t * target.x;
          const cy = omt * omt * omt * node.y + 3 * omt * omt * t * cp1y + 3 * omt * t * t * cp2y + t * t * t * target.y;

          ctx.beginPath();
          ctx.arc(cx, cy, 2, 0, Math.PI * 2); // Larger event particles
          ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'white';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // --- 5. OUTPUT RAINBOW WAVE ---
      const hue = (360 - (time * 20) % 360); // Slower hue cycle
      // Reverse flow: hue cycle inverted so color looks like it moves Right

      const waveGradient = ctx.createLinearGradient(helixEndX, 0, width, 0);

      waveGradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 1)`);
      waveGradient.addColorStop(0.5, `hsla(${hue - 90}, 100%, 60%, 1)`);
      waveGradient.addColorStop(1, `hsla(${hue - 180}, 100%, 50%, 0)`);

      ctx.beginPath();
      const waveStartX = helixEndX;

      for (let x = waveStartX; x < waveEndX; x += 3) {
        const dist = x - waveStartX;
        const distRatio = dist / (waveEndX - waveStartX);

        const accel = distRatio * 0.8;

        // PHASE CORRECTION:
        // To travel outward (RIGHT), we need sin(-wt + kx) or sin(kx - wt)
        const phase = -time * (tipFreq + accel) * 10 + dist * 0.008;

        const amplitude = tipAmp * (1 + distRatio * 0.2);

        const baseWave = Math.sin(phase) * amplitude;

        const noiseEnv = Math.min(1, distRatio * 4);
        const noise = Math.sin(phase * 2 + dist * 0.05) * (amplitude * 0.25) * noiseEnv;

        const yFinal = centerScreenY + baseWave + noise;

        if (x === waveStartX) ctx.moveTo(x, yFinal);
        else ctx.lineTo(x, yFinal);
      }

      ctx.strokeStyle = waveGradient;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.shadowColor = `hsla(${hue}, 80%, 60%, 0.8)`;
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };

    const resize = () => {
      // Only re-init if width changes (prevents mobile scroll re-render)
      if (window.innerWidth !== width) {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        init();
      }
    };
    window.addEventListener('resize', resize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 -top-16 md:top-0 z-0 pointer-events-none" />;
};