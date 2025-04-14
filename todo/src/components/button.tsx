import React from 'react';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ type, onClick, className, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-green-600 rounded-xl cursor-pointer hover:bg-green-600 hover:text-green-200  transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};
