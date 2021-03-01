import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { NavBar } from '../components/NavBar';
import '../styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
