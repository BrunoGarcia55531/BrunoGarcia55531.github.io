import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './components/ui/ToastProvider';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { AppRoutes } from './routes/AppRoutes';
import './styles/App.css';

const App: React.FC = () => (
  <ErrorBoundary>
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  </ErrorBoundary>
);

export default App;
