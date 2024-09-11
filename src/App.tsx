import React, { useMemo } from 'react';
import './global.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { 
  TorusWalletAdapter,
  LedgerWalletAdapter,
  MathWalletAdapter,
  CoinbaseWalletAdapter,
 } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import WaitlistConfirmation from './components/Waitlist/WaitlistConfirmation';
import Registration from '../src/components/Waitlist/Registration';

// 默認使用 'devnet'，您可以根據需要更改
const network = WalletAdapterNetwork.Devnet;

const App: React.FC = () => {
  // 可以根據需要更改 endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  // 初始化錢包適配器
  const wallets = useMemo(
    () => [
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new MathWalletAdapter(),
      new CoinbaseWalletAdapter(),
    ],
    []
  );

  const MainContent: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const referralCode = searchParams.get('code');

    React.useEffect(() => {
      if (referralCode) {
        // 處理推薦碼邏輯，例如存儲到 localStorage 中
        localStorage.setItem('referralCode', referralCode);
        // 可以在這裡添加其他處理邏輯，如顯示歡迎消息等
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
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/waitlist-confirmation" element={<WaitlistConfirmation />} />
            <Route path="/refer" element={<MainContent />} />
          </Routes>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;