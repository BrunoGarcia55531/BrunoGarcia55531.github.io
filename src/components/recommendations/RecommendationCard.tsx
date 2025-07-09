import React from 'react';
import { RecommendationDTO } from '../../interfaces/recommendation/recommendation.dto';

interface RecommendationCardProps {
  recommendation: RecommendationDTO;
  onClick?: () => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, onClick }) => (
  <div
    className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 dark:border-blue-400 p-4 mb-2 cursor-pointer rounded-xl shadow-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
    onClick={onClick}
  >
    <div className="font-bold text-blue-900 dark:text-blue-200">Recomendación</div>
    <div className="text-sm text-blue-700 dark:text-blue-300">{recommendation.reason}</div>
  </div>
);
