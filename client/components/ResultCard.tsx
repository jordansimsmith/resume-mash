import React from 'react';
import { Result } from '../types/types';

interface ResultCardProps {
  result: Result;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className="shadowed rounded-md bg-white">
      TODO: implement result details
    </div>
  );
};
