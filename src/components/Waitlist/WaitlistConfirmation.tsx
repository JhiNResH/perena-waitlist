import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

const WaitlistConfirmation: React.FC = () => {
  const { publicKey } = useWallet();
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleJoinAlphaChat = () => {
    window.open('https://t.me/perenafi', '_blank');
  };

  const generateReferralCode = (publicKey: PublicKey) => {
    return publicKey.toBase58().slice(0, 8);
  };

  useEffect(() => {
    if (publicKey) {
      const referralCode = generateReferralCode(publicKey);
      const baseUrl = window.location.origin + "/refer?code=";
      setReferralLink(`${baseUrl}${referralCode}`);
    }
  }, [publicKey]);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2秒後重置按鈕狀態
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      <Header />
      <main className="flex-grow flex justify-center items-center px-4 py-[var(--80px)]">
        <div className="relative bg-[#fffef7] rounded-lg shadow-xl overflow-hidden w-full max-w-[36rem] h-[36rem]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url('/pattern.png')`,
            backgroundRepeat: 'repeat',
            backgroundSize: '100px auto'
          }}>
          </div>
          <div className="relative z-10 flex flex-col justify-center items-center h-full p-8">
            <div className="bg-[#fffef7] rounded-lg p-8 w-full h-full flex flex-col justify-center items-center">
              <img src="/perenanobg.svg" alt="Perena logo" className='h-16 w-auto mb-6' />
              <h2 className="text-3xl font-500 text-center mb-4 text-brand-purple uppercase">
                Welcome aboard, gardener!
              </h2>
              {referralLink && (
                <>
                  <p className="text-xl text-center mb-3 text-brand-purple font-sebastien">
                    Your referral link is:
                  </p>
                  <div className="flex items-center mb-6 w-full">
                    <div className="flex-grow bg-[#d2bb94] text-[#3c2a4d] px-4 py-3 rounded-sm border border-[#3c2a4d] shadow-sm text-sm relative overflow-hidden mr-3"
                         style={{ 
                           fontFamily: '"Sebastien Slab Round", serif',
                           boxShadow: '1px 1px 0 #3c2a4d',
                           fontWeight: 400,
                           letterSpacing: '0.03em'
                         }}>
                      <span className="block truncate">{referralLink}</span>
                    </div>
                    <div 
                      onClick={handleCopy}
                      className={`bg-[#d2bb94] text-[#3c2a4d] px-4 py-3 rounded-sm border border-[#3c2a4d] shadow-sm hover:bg-opacity-90 transition-colors text-sm uppercase tracking-wide cursor-pointer flex-shrink-0 ${
                        copied ? 'bg-opacity-70' : ''
                      }`}
                      style={{ 
                        fontFamily: '"Sebastien Slab Round", serif',
                        boxShadow: '1px 1px 0 #3c2a4d',
                        fontWeight: 400,
                        letterSpacing: '0.03em'
                      }}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </div>
                  </div>
                </>
              )}
              <div 
                onClick={handleJoinAlphaChat}
                className="mt-4 px-6 py-3 bg-[#d2bb94] text-[#3c2a4d] rounded-sm border border-[#3c2a4d] shadow-sm hover:bg-opacity-90 transition-colors text-lg uppercase tracking-wide cursor-pointer"
                style={{ 
                  fontFamily: '"Sebastien Slab Round", serif',
                  boxShadow: '1px 1px 0 #3c2a4d',
                  fontWeight: 400,
                  letterSpacing: '0.03em'
                }}
              >
                Join the Alpha Chat
              </div>
            </div>
          </div>
          <img 
            src="/ConfirmCircle.png" 
            alt="Early access stamp" 
            className="absolute top-4 right-4 w-28 h-28 z-20" 
            style={{ animation: 'spin 5s linear infinite' }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WaitlistConfirmation;