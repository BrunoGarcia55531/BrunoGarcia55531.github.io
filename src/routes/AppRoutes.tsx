import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardPage } from '../pages/User/DashboardPage';
import { SearchPage } from '../pages/Product/SearchPage';
import { ProductDetailPage } from '../pages/Product/ProductDetailPage';
import { FavoritesPage } from '../pages/User/FavoritesPage';
import { RecommendationsPage } from '../pages/User/RecommendationsPage';
import { HistoryPage } from '../pages/User/HistoryPage';
import { ComparisonsPage } from '../pages/Comparison/ComparisonsPage';
import { CreateComparisonPage } from '../pages/Comparison/CreateComparisonPage';
import { ComparisonDetailPage } from '../pages/Comparison/ComparisonDetailPage';
import { LoginPage } from '../pages/Auth/LoginPage';
import { RegisterPage } from '../pages/Auth/RegisterPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/recommendations" element={<RecommendationsPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/comparisons" element={<ComparisonsPage />} />
      <Route path="/compare/new" element={<CreateComparisonPage />} />
      <Route path="/comparison/:id" element={<ComparisonDetailPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
