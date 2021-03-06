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
      resumeFile: null as File,
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
    <div className="bg-gray-100 flex-grow">
      <Head>
        <title>Resume Mash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <div className="shadow rounded-md bg-white mt-5 space-y-6 p-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  placeholder="A name to identify this resume"
                  required
                  className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Resume
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="resume-file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-500 hover:text-indigo-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-400"
                    >
                      <span>
                        {formik.values.resumeFile?.name || 'Upload a resume'}
                      </span>
                      <input
                        id="resume-file-upload"
                        name="resumeFile"
                        type="file"
                        onChange={(e) =>
                          formik.setFieldValue('resumeFile', e.target.files[0])
                        }
                        placeholder="Resume to upload in PDF format"
                        required
                        className="sr-only"
                      />
                    </label>
                    {!formik.values.resumeFile && (
                      <p className="pl-1">or drag and drop</p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">PDF only</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
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
