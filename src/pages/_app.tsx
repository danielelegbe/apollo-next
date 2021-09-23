import ProgressBar from '@badrap/bar-of-progress';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { Loader } from '../components/Loader';
import Navbar from '../components/Navbar';
import { setUser } from '../features/user/userSlice';
import '../styles/globals.css';
function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  const progress = new ProgressBar({
    delay: 100,
    color: 'purple',
    size: 2,
  });

  Router.events.on('routeChangeStart', progress.start);
  Router.events.on('routeChangeComplete', progress.finish);

  useEffect(() => {
    fetch('http://localhost:4000/refresh-token', {
      credentials: 'include',
      method: 'POST',
    }).then(async (response) => {
      const { accessToken, id } = await response.json();

      store.dispatch(setUser({ accessToken, id }));
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
