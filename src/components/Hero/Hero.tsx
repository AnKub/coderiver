import { useEffect, useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
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
  
  const logoVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.2,
        ease: "easeOut" as const
      }
    }
  };
  
  return (
    <section ref={heroRef} className="hero">
      <div className="container">
        <div className="hero__content">
          <motion.div 
            className="hero__logo"
            variants={logoVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <div className="hero__logo-symbol">⚡</div>
          </motion.div>
          
          <div className="hero__text">
            <motion.h1 
              className="hero__title"
              variants={textVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              custom={0.4}
            >
              Creative Solutions
            </motion.h1>
            
            <motion.h2 
              className="hero__subtitle"
              variants={textVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              custom={0.6}
            >
              for Your Business
            </motion.h2>
            
            <motion.p 
              className="hero__description"
              variants={textVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              custom={0.8}
            >
              We create modern web solutions that impress and deliver results
            </motion.p>
            
            <motion.div 
              className="hero__cta"
              variants={textVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              custom={1.0}
            >
              <button className="hero__button">
                Start Project
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;