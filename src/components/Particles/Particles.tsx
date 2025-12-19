import { useCallback, useEffect, useRef, useState } from 'react';
import './Particles.scss';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  
  const PARTICLE_COUNT = 50;
  const MOUSE_RADIUS = 100;
  
  const createParticle = useCallback((id: number, width: number, height: number): Particle => {
    return {
      id,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2
    };
  }, []);
  
  const updateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    particlesRef.current.forEach(particle => {
      const dx = mousePosition.x - particle.x;
      const dy = mousePosition.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < MOUSE_RADIUS) {
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
        const angle = Math.atan2(dy, dx);
        particle.vx -= Math.cos(angle) * force * 0.01;
        particle.vy -= Math.sin(angle) * force * 0.01;
      }
      
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      
      particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(canvas.height, particle.y));
    });
  }, [mousePosition]);
  
  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesRef.current.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      ctx.fill();
      
      particlesRef.current.forEach(otherParticle => {
        if (particle.id !== otherParticle.id) {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
    });
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => 
      createParticle(i, canvas.width, canvas.height)
    );

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => 
        createParticle(i, canvas.width, canvas.height)
      );
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const startAnimation = () => {
      const animate = () => {
        updateParticles();
        drawParticles();
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    };

    startAnimation();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createParticle, updateParticles, drawParticles]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="particles-canvas"
    />
  );
};

export default Particles;