import Head from 'next/head';
import { NextPage } from 'next';
import {
  getAccessToken,
  useUser,
  withPageAuthRequired,
} from '@auth0/nextjs-auth0';
import { Resume } from '../types/types';
import { ResumeCard } from '../components/ResumeCard';

interface ListResumePageProps {
  resumes: Resume[];
}

const ListResumePage: NextPage<ListResumePageProps> = ({ resumes }) => {
  const { user } = useUser();

  return (
    <div className="bg-gray-100 flex-grow">
      <Head>
        <title>Resume Mash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <h1 className="text-xl lg:text-3xl font-semibold py-4 text-center">
          Resumes submitted by {user?.name}
        </h1>
        <div>
          {resumes.map((r) => (
            <ResumeCard resume={r} key={r.id} hyperlink={true} />
          ))}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    const token = await getAccessToken(ctx.req, ctx.res);

    const res = await fetch('http://localhost:5000/resumes', {
      headers: new Headers({
        Authorization: `Bearer ${token.accessToken}`,
      }),
    });

    const resumes = await res.json();

    return { props: { resumes } };
  },
});

export default ListResumePage;
