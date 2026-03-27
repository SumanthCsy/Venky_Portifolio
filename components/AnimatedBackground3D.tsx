'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function AnimatedBackground3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sparklesRef.current) return;

    const sparkles = Array.from({ length: 100 });
    const ctx = gsap.context(() => {
      sparkles.forEach((_, i) => {
        const span = document.createElement('span');
        span.className = 'absolute w-1 h-1 bg-white rounded-full opacity-0 pointer-events-none';
        
        // Random initial position
        gsap.set(span, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.1,
        });
        
        sparklesRef.current?.appendChild(span);

        // Individual sparkle animation
        gsap.to(span, {
          opacity: Math.random() * 0.6 + 0.2,
          repeat: -1,
          yoyo: true,
          duration: Math.random() * 2 + 1,
          delay: Math.random() * 5,
          ease: 'power1.inOut',
        });

        // Drift
        gsap.to(span, {
          x: `+=${Math.random() * 100 - 50}`,
          y: `+=${Math.random() * 100 - 50}`,
          repeat: -1,
          yoyo: true,
          duration: Math.random() * 10 + 10,
          ease: 'sine.inOut',
        });
      });
    }, sparklesRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-20 overflow-hidden bg-background">
      {/* Sparkles Layer */}
      <div ref={sparklesRef} className="absolute inset-0 z-0 overflow-hidden" />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-secondary/15 via-secondary/5 to-transparent rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-accent/10 via-accent/5 to-transparent rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-20 right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* Floating lines effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,_var(--primary)_1px,_transparent_0)] bg-[length:40px_40px]" />
      </div>

      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        .animate-pulse-glow {
          animation: pulse-glow 8s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}
