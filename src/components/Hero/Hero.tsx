import { useEffect, useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import Button from '../Button/Button';
import './Hero.scss';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);
  
  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 100,
      clipPath: 'inset(100% 0 0 0)'
    },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0 0 0)',
      transition: {
        duration: 0.8,
        delay,
        ease: "easeOut" as const
      }
    })
  };
  

  
  return (
    <section ref={heroRef} className="hero">
      <div className="container">
        <div className="hero__content">
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            custom={0.2}
          >
            <Button>START TODAY!</Button>
          </motion.div>
          
          <motion.h1 
            className="hero__title"
            variants={textVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            custom={0.4}
          >
            Building the future of medicine with AI
          </motion.h1>
          
          <motion.div 
            className="hero__arrow"
            variants={textVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            custom={0.8}
          >
            <div className="hero__arrow-circle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16L8 12H16L12 16Z" fill="white"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;