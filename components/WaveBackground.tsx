'use client';

import { useEffect, useRef } from 'react';

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced wave parameters for better visibility
    const waves = [
      {
        amplitude: 40,
        frequency: 0.008,
        speed: 0.015,
        offset: 0,
        opacity: 0.15,
        yPosition: 0.4,
      },
      {
        amplitude: 30,
        frequency: 0.012,
        speed: 0.02,
        offset: Math.PI / 3,
        opacity: 0.12,
        yPosition: 0.6,
      },
      {
        amplitude: 35,
        frequency: 0.006,
        speed: 0.01,
        offset: Math.PI / 2,
        opacity: 0.08,
        yPosition: 0.8,
      },
    ];

    const drawWave = (wave: typeof waves[0]) => {
      const yOffset = canvas.height * wave.yPosition;
      
      ctx.beginPath();
      
      // Create flowing wave line
      for (let x = 0; x <= canvas.width; x += 3) {
        const y = yOffset + 
          Math.sin((x * wave.frequency) + (time * wave.speed) + wave.offset) * wave.amplitude +
          Math.sin((x * wave.frequency * 1.5) + (time * wave.speed * 0.8) + wave.offset) * (wave.amplitude * 0.4);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      // Stroke the wave line
      ctx.strokeStyle = `rgba(30, 144, 255, ${wave.opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Add glow effect
      ctx.shadowColor = `rgba(30, 144, 255, ${wave.opacity * 0.5})`;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const drawNeuralNetwork = () => {
      const nodes = 6;
      const nodeSpacing = canvas.width / (nodes + 1);
      
      // Draw connecting lines with animation
      ctx.strokeStyle = `rgba(30, 144, 255, ${0.08 + Math.sin(time * 0.008) * 0.03})`;
      ctx.lineWidth = 1;

      for (let i = 1; i <= nodes; i++) {
        const x1 = i * nodeSpacing;
        const y1 = canvas.height * 0.2 + Math.sin((time * 0.015) + (i * 0.8)) * 30;
        
        if (i < nodes) {
          const x2 = (i + 1) * nodeSpacing;
          const y2 = canvas.height * 0.2 + Math.sin((time * 0.015) + ((i + 1) * 0.8)) * 30;
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      // Draw pulsing nodes
      for (let i = 1; i <= nodes; i++) {
        const x = i * nodeSpacing;
        const y = canvas.height * 0.2 + Math.sin((time * 0.015) + (i * 0.8)) * 30;
        const radius = 3 + Math.sin((time * 0.02) + (i * 0.5)) * 1.5;
        const opacity = 0.4 + Math.sin(time * 0.01 + i) * 0.2;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 144, 255, ${opacity})`;
        ctx.fill();
        
        // Add glow to nodes
        ctx.shadowColor = `rgba(30, 144, 255, ${opacity * 0.8})`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const drawFloatingParticles = () => {
      const particleCount = 15;
      
      for (let i = 0; i < particleCount; i++) {
        const x = ((time * 20 + i * 150) % (canvas.width + 200)) - 100;
        const y = canvas.height * (0.3 + (i % 3) * 0.2) + Math.sin((time * 0.008) + (i * 1.2)) * 50;
        const size = 1.5 + Math.sin((time * 0.012) + (i * 0.7)) * 1;
        const opacity = 0.15 + Math.sin((time * 0.01) + (i * 0.4)) * 0.1;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 144, 255, ${opacity})`;
        ctx.fill();
        
        // Add subtle glow to particles
        ctx.shadowColor = `rgba(30, 144, 255, ${opacity * 0.6})`;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const drawTechGrid = () => {
      const gridSize = 100;
      const opacity = 0.03 + Math.sin(time * 0.005) * 0.02;
      
      ctx.strokeStyle = `rgba(30, 144, 255, ${opacity})`;
      ctx.lineWidth = 0.5;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw tech grid background
      drawTechGrid();
      
      // Draw flowing waves
      waves.forEach(wave => {
        drawWave(wave);
      });

      // Draw neural network
      drawNeuralNetwork();

      // Draw floating particles
      drawFloatingParticles();

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 1,
        background: 'transparent'
      }}
    />
  );
}