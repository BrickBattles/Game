import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AblyProvider } from '../components/util/AblyProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
