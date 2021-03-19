import React from 'react';
import { Result, Resume } from '../types/types';

interface ResultCardProps {
  resume: Resume;
  result: Result;
}

export const ResultCard: React.FC<ResultCardProps> = ({ resume, result }) => {
  const winner = result.winner.id === resume.id;
  const opponent = winner ? result.loser : result.winner;

  return (
    <div className="shadow rounded-md bg-white my-2 p-4">
      <h3 className="text-indigo-500 font-medium text-xl">
        {winner ? 'Win' : 'Loss'}
      </h3>

      <hr className="my-2" />

      <div>
        <a
          href={opponent.resumeFileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-500"
        >
          Opponent Resume PDF
        </a>
      </div>
      <div>Opponent Resume Name: {opponent.name}</div>
      <div>Opponent Wins: {opponent.winCount}</div>
      <div>Opponent Losses: {opponent.lossCount}</div>

      <div>Result Date: {new Date(result.dateSubmitted).toDateString()}</div>
    </div>
  );
};
