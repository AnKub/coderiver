import { useState, useEffect } from 'react';
import './Header.scss';

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const ScrambleText = ({ text, className = '' }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const scrambleText = () => {
    if (isScrambling) return;
    
    setIsScrambling(true);
    const originalText = text;
    const textLength = originalText.length;
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((_, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );
      
      if (iteration >= textLength) {
        clearInterval(interval);
        setDisplayText(originalText);
        setIsScrambling(false);
      }
      
      iteration += 1/3;
    }, 50);
  };
  
  return (
    <span 
      className={`scramble-text ${className}`}
      onMouseEnter={scrambleText}
    >
      {displayText}
    </span>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = ['Solutions', 'Technology', 'About', 'Careers', 'Resources', 'Contact'];
  
  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <img src="/background/logo.png" alt="Logo" className="header__logo-image" />
          </div>
          
          <nav className="header__nav">
            <ul className="header__nav-list">
              {navItems.map((item, index) => (
                <li key={index} className="header__nav-item">
                  <a href="#" className="header__nav-link">
                    <ScrambleText text={item} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;