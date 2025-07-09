import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-blue-900/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-blue-950/90 rounded-2xl shadow-2xl p-8 min-w-[320px] border border-blue-300 dark:border-blue-800 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-blue-400 hover:text-blue-700 dark:hover:text-blue-200 transition-colors text-xl font-bold">✕</button>
        {children}
      </div>
    </div>
  );
};
