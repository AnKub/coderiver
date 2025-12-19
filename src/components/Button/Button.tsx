import React from 'react';
import './Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = '' }) => {
  return (
    <button 
      className={`custom-button ${className}`}
      onClick={onClick}
    >
      <img 
        src="/background/Frame.png" 
        alt="" 
        className="custom-button__frame"
      />
      <span className="custom-button__text">{children}</span>
    </button>
  );
};

export default Button;