import React from 'react';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset'; // Adapte conforme necessário
  onClick?: () => void; // Para o caso de botões com ações customizadas
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  className,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-green-500 text-green-600 py-3 rounded-xl hover:bg-green-600 transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};
