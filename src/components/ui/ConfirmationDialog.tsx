import React from 'react';

interface ConfirmationDialogProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-blue-900/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-blue-950/90 rounded-2xl shadow-2xl p-8 min-w-[320px] border border-blue-300 dark:border-blue-800">
        <p className="mb-4 text-blue-900 dark:text-blue-200">{message}</p>
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="px-4 py-2 border border-blue-400/40 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">Cancelar</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors">Confirmar</button>
        </div>
      </div>
    </div>
  );
};
