import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import React from 'react';

export const HeaderBar: React.FC<{}> = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleLogin = () => router.push('/api/auth/login');
  const handleLogout = () => router.push('/api/auth/logout');

  return (
    <nav>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Log in</button>
      )}
    </nav>
  );
};
