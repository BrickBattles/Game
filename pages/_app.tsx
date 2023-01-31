import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../components/web/auth';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';

const { chains, provider } = configureChains(
  [polygon],
  [alchemyProvider({ apiKey: process.env.ALCH_KEY! }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'BrickBattles',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <RainbowKitSiweNextAuthProvider>
          <RainbowKitProvider chains={chains} coolMode>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
