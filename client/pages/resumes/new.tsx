import Head from 'next/head';
import { NextPage } from 'next';
import { getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useFormik } from 'formik';

interface NewResumepageProps {
  apiToken: string;
}

const NewResumePage: NextPage<NewResumepageProps> = ({ apiToken }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      resumeFile: '',
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('Name', values.name);
      formData.append('ResumeFile', values.resumeFile);

      return fetch('http://localhost:5000/resumes', {
        method: 'POST',
        body: formData,
        headers: new Headers({
          Authorization: `Bearer ${apiToken}`,
          Accept: 'application/json',
        }),
      });
    },
  });

  return (
    <div>
      <Head>
        <title>Resume Mash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="A name to identify this resume"
            required
          />

          <label htmlFor="resumeFile">Resume</label>
          <input
            id="resumeFile"
            name="resumeFile"
            type="file"
            onChange={(e) =>
              formik.setFieldValue('resumeFile', e.target.files[0])
            }
            placeholder="Resume to upload in PDF format"
            required
          />

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    const token = await getAccessToken(ctx.req, ctx.res);

    return { props: { apiToken: token.accessToken } };
  },
});

export default NewResumePage;
