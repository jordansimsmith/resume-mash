import Head from 'next/head';
import { NextPage } from 'next';
import { getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Result, Resume } from '../../types/types';
import { ResumeCard } from '../../components/ResumeCard';
import { ResultCard } from '../../components/ResultCard';

interface ResumeDetailPageProps {
  resume: Resume;
  results: Result[];
}

const ResumeDetailPage: NextPage<ResumeDetailPageProps> = ({
  resume,
  results,
}) => {
  return (
    <div className="bg-gray-100 flex-grow">
      <Head>
        <title>Resume Mash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <h1 className="text-xl lg:text-3xl font-semibold py-4 text-center">
          {resume.name}
        </h1>
        <ResumeCard resume={resume} hyperlink={false} />

        <h2 className="text-lg lg:text-xl py-4 text-center">Result History</h2>
        <div>
          {results.map((r) => (
            <ResultCard result={r} key={r.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    const token = await getAccessToken(ctx.req, ctx.res);

    const resumeRes = await fetch(
      `http://localhost:5000/resumes/${ctx.params.resumeId}`,
      {
        headers: new Headers({
          Authorization: `Bearer ${token.accessToken}`,
        }),
      },
    );

    const resume = await resumeRes.json();

    const resultsRes = await fetch(
      `http://localhost:5000/resumes/${ctx.params.resumeId}/results`,
      {
        headers: new Headers({
          Authorization: `Bearer ${token.accessToken}`,
        }),
      },
    );

    const results = await resultsRes.json();

    return { props: { resume, results } };
  },
});

export default ResumeDetailPage;
