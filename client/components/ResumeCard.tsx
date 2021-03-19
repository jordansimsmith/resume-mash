import React from 'react';
import { Resume } from '../types/types';

interface ResumeCardProps {
  resume: Resume;
  hyperlink: boolean;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({
  resume,
  hyperlink,
}) => {
  const card = (
    <div className="shadow bg-white rounded-md my-2 p-4">
      <h3 className="text-indigo-500 font-medium text-xl">{resume.name}</h3>

      <hr className="my-2" />

      <div>
        <a
          href={resume.resumeFileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-500"
        >
          Resume PDF
        </a>
      </div>
      <div>Date Submitted: {new Date(resume.dateSubmitted).toDateString()}</div>
      <div>Wins: {resume.winCount}</div>
      <div>Losses: {resume.lossCount}</div>
    </div>
  );

  return hyperlink ? <a href={`/resumes/${resume.id}`}>{card}</a> : card;
};
