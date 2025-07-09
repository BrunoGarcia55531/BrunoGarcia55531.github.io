import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="font-medium text-blue-700 dark:text-blue-300">{label}</label>}
    <textarea
      {...props}
      className={`transition-colors border-2 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 bg-blue-50 dark:bg-blue-900/30 placeholder-blue-300 text-blue-900 dark:text-blue-100 ${error ? 'border-red-500 focus:ring-red-400 focus:border-red-500' : 'border-blue-300 focus:border-blue-500'} ${props.className || ''}`}
    />
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
);
