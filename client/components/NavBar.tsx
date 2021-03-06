import { useUser } from '@auth0/nextjs-auth0';
import React from 'react';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const { user } = useUser();

  return (
    <nav
      style={{
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <a className="font-bold text-2xl lg:text-4xl text-white" href="/">
          Resume Mash
        </a>

        <div>
          <ul className="inline-flex text-white">
            <li>
              <a className="px-4 font-bold">{user?.name ?? 'Profile'}</a>
            </li>
            <li>
              {user ? (
                <a className="px-4 font-bold" href="/api/auth/logout">
                  Sign Out
                </a>
              ) : (
                <a className="px-4 font-bold" href="/api/auth/login">
                  Sign In
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
