import React from 'react';

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3.5 rounded-sm text-sm font-semibold transition-all duration-300 ease-out";

  const variants = {
    primary: "bg-white text-black border border-black md:border-white hover:bg-transparent hover:text-black md:hover:text-white",
    secondary: "bg-transparent text-black md:text-white border border-black md:border-path-border hover:border-black md:hover:border-white"
  };

  return (
    <a
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};