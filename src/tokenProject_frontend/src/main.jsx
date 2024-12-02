import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { AuthClient } from '@dfinity/auth-client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Main = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const authClient = await AuthClient.create();

      if (await authClient.isAuthenticated()) {
        setIsAuthenticated(true);
      } else {
        await authClient.login({
          identityProvider: 'https://identity.ic0.app',
          onSuccess: () => setIsAuthenticated(true),
          onError: (err) => console.error('Authentication failed', err),
        });
      }
    };

    initializeAuth();
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <App />;
};

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
