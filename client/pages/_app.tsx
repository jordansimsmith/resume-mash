import { UserProvider } from '@auth0/nextjs-auth0';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { HeaderBar } from '../components/HeaderBar';
import '../styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <HeaderBar />
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default MyApp;
