import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Resume } from '../types/types';

const PDFViewer = dynamic(() => import('../components/PDFViewer'), {
  ssr: false,
});

interface IndexPageProps {
  firstResume: Resume;
  secondResume: Resume;
}

const IndexPage: NextPage<IndexPageProps> = ({ firstResume, secondResume }) => {
  return (
    <div>
      <Head>
        <title>Resume Mash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Resume Mash</h1>

        <div>
          <PDFViewer resume={firstResume} />
        </div>

        <div>
          <PDFViewer resume={secondResume} />
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
