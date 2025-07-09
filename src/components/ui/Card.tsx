import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}

export const Card: React.FC<CardProps> = ({ children, className, as: Component = 'div', ...props }) => (
  <Component
    className={`bg-white dark:bg-blue-950/80 rounded-2xl shadow-lg p-8 md:p-12 lg:p-16 border border-blue-200 dark:border-blue-800 transition-transform hover:scale-[1.03] active:scale-95 cursor-pointer w-full h-full flex items-center justify-center text-lg md:text-xl font-semibold ${className || ''}`}
    {...props}
  >
    {children}
  </Component>
);
