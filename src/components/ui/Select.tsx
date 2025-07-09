import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, error, options, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="font-medium">{label}</label>}
    <select {...props} className={`border rounded px-2 py-1 ${error ? 'border-red-500' : 'border-gray-300'}`}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
);
