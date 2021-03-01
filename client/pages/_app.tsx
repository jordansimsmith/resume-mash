import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
