import React from 'react';
import { Resume } from '../types/types';

interface ResumeCardProps {
  resume: Resume;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({ resume }) => {
  return (
    <a href={`/resumes/${resume.id}`}>
      <div className="shadow bg-white rounded-md my-2 p-4">
        <h3 className="text-indigo-500 font-medium text-xl mb-2">
          {resume.name}
        </h3>
        <div>
          Date Submitted: {new Date(resume.dateSubmitted).toDateString()}
        </div>
        <div>Wins: {resume.winCount}</div>
        <div>Losses: {resume.lossCount}</div>
      </div>
    </a>
  );
};
