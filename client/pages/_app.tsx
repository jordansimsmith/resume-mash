import { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { NavBar } from '../components/NavBar';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <NavBar />
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default MyApp;
