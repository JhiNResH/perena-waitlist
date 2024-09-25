import React, { useMemo } from 'react';
import './global.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Registration from '../src/components/Waitlist/Registration';

const network = WalletAdapterNetwork.Devnet;

const App: React.FC = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter()
    ],
    []
  );

  const MainContent: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const referralCode = searchParams.get('code');

    React.useEffect(() => {
      if (referralCode) {
        localStorage.setItem('referralCode', referralCode);
        console.log(`Referral code received: ${referralCode}`);
      }
    }, [referralCode]);

    return (
      <div className="flex flex-col min-h-screen bg-brand-cream text-brand-purple font-sans text-base leading-base">
        <Header />
        <Hero />
        <Footer />
      </div>
    );
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/refer" element={<MainContent />} />
          </Routes>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;