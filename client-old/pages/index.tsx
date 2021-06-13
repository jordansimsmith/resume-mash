import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Resume } from '../types/types';
import { ResumeContainer } from '../components/ResumeContainer';
import { useRouter } from 'next/router';
import { getAccessToken, useUser } from '@auth0/nextjs-auth0';

interface IndexPageProps {
  firstResume: Resume;
  secondResume: Resume;
  apiToken: string;
}

const IndexPage: NextPage<IndexPageProps> = ({
  firstResume,
  secondResume,
  apiToken,
}) => {
  const router = useRouter();
  const { user } = useUser();

  const handleClick = (winner: Resume, loser: Resume) => async () => {
    // if the user is not logged in
    if (!user) {
      router.push('/api/auth/login');
    }

    // submit the result
    try {
      const res = await fetch('http://localhost:5000/results', {
        method: 'POST',
        body: JSON.stringify({
          winnerId: winner.id,
          loserId: loser.id,
        }),
        headers: new Headers({
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      // reload the page to get a new mash
      router.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-gray-100 flex-grow">
      <Head>
        <title>Resume Mash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <h1 className="text-xl lg:text-3xl font-semibold py-4 text-center">
          &quot;Which resume would you pick for an interview?&quot;
        </h1>

        <div className="grid grid-flow-row xl:grid-flow-col gap-10 m-10">
          <ResumeContainer
            resume={firstResume}
            onClick={handleClick(firstResume, secondResume)}
          />
          <ResumeContainer
            resume={secondResume}
            onClick={handleClick(secondResume, firstResume)}
          />
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = await getAccessToken(ctx.req, ctx.res);

  const res = await fetch('http://localhost:5000/mash');
  const mash = await res.json();

  return { props: { ...mash, apiToken: token.accessToken } };
};

export default IndexPage;
