import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Resume } from '../types/types';
import { ResumeContainer } from '../components/ResumeContainer';

interface IndexPageProps {
  firstResume: Resume;
  secondResume: Resume;
}

const IndexPage: NextPage<IndexPageProps> = ({ firstResume, secondResume }) => {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Resume Mash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <blockquote className="pt-5">
          <p className="text-xl lg:text-3xl font-semibold ">
            &quot;Which resume would you pick for an interview?&quot;
          </p>
        </blockquote>

        <div className="grid grid-flow-row xl:grid-flow-col gap-10 m-10">
          <ResumeContainer resume={firstResume} />
          <ResumeContainer resume={secondResume} />
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:5000/mash');
  const mash = await res.json();

  return { props: { ...mash } };
};

export default IndexPage;
