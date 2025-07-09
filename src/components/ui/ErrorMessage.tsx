import React from 'react';

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
  <div className="text-center text-red-500 py-2">{error}</div>
);
