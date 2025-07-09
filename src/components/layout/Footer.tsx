import React from 'react';

export const Footer: React.FC = () => (
  <footer className="bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 text-center py-4 mt-8 text-blue-900 dark:text-blue-200 border-t border-blue-300 dark:border-blue-800">
    <span>© {new Date().getFullYear()} SmartCompare</span>
  </footer>
);
