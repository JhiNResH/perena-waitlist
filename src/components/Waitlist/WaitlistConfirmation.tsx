import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const WaitlistConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState<string>('');
  const [referralLink, setReferralLink] = useState<string>('');

  const fetchReferralCode = async (address: string) => {
    try {
      const response = await fetch(`/api/referral-code?address=${address}`);
      if (!response.ok) {
        throw new Error('Failed to fetch referral code');
      }
      const data = await response.json();
      return data.referralCode;
    } catch (error) {
      console.error('Error fetching referral code:', error);
      return null;
    }
  };

  const generateReferralLink = (code: string) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/register?ref=${code}`;
  };

  const updateReferralInfo = async (address: string) => {
    const code = await fetchReferralCode(address);
    if (code) {
      setReferralCode(code);
      setReferralLink(generateReferralLink(code));
    }
  };

  useEffect(() => {
    const dummyAddress = '5oMR7kAjzUWkcM1RK4yT1zRYaZFxR4AjmNuKjAH5LM3W';
    updateReferralInfo(dummyAddress);
  });

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      alert('Referral code copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      alert('Referral link copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  // 模擬更換地址的函數（僅用於演示）
  const handleChangeAddress = () => {
    const newAddress = '7nPWCxrQ9KzZXoLGJBsKNyKmberSoLwjKNrhGZqoNjAV'; // 新的模擬地址
    updateReferralInfo(newAddress);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      <Header />
      <main className="flex-grow flex justify-center items-center px-4 py-[var(--80px)]">
        <div className="relative bg-[#fffef7] rounded-lg shadow-xl overflow-hidden w-full max-w-[32rem] h-[32rem]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url('/pattern.png')`,
            backgroundRepeat: 'repeat',
            backgroundSize: '100px auto'
          }}></div>
          <div className="relative z-10 flex flex-col justify-center items-center h-full p-8">
            <div className="bg-[#fffef7] rounded-lg p-8 w-[90%] h-[90%] flex flex-col justify-center items-center">
              <img src="/perenanobg.svg" alt="Perena logo" className='h-16 w-auto mb-8' />
              <h2 className="text-3xl font-500 text-center mb-4 text-brand-purple uppercase">
                Congratulations!<br />You've joined our waitlist
              </h2>
              <p className="text-xl text-center mb-4 text-brand-purple">
                Your referral code is:
              </p>
              <div className="bg-[#d2bb94] text-[#3c2a4d] px-4 py-2 rounded-md text-2xl font-bold mb-4">
                {referralCode}
              </div>
              <button 
                onClick={handleCopyReferralCode}
                className="mb-4 px-6 py-2 bg-[#3c2a4d] text-[#d2bb94] rounded-sm border border-[#d2bb94] shadow-sm hover:bg-opacity-90 transition-colors text-lg uppercase tracking-wide cursor-pointer"
                style={{ 
                  fontFamily: '"Sebastien Slab Round", serif',
                  boxShadow: '1px 1px 0 #d2bb94',
                  fontWeight: 400,
                  letterSpacing: '0.03em'
                }}
              >
                Copy Referral Code
              </button>
              <p className="text-xl text-center mb-4 text-brand-purple">
                Your referral link is:
              </p>
              <div className="bg-[#d2bb94] text-[#3c2a4d] px-4 py-2 rounded-md text-lg font-bold mb-4 overflow-hidden text-ellipsis">
                {referralLink}
              </div>
              <button 
                onClick={handleCopyReferralLink}
                className="mb-4 px-6 py-2 bg-[#3c2a4d] text-[#d2bb94] rounded-sm border border-[#d2bb94] shadow-sm hover:bg-opacity-90 transition-colors text-lg uppercase tracking-wide cursor-pointer"
                style={{ 
                  fontFamily: '"Sebastien Slab Round", serif',
                  boxShadow: '1px 1px 0 #d2bb94',
                  fontWeight: 400,
                  letterSpacing: '0.03em'
                }}
              >
                Copy Referral Link
              </button>
              <button 
                onClick={handleChangeAddress}
                className="mb-4 px-6 py-2 bg-[#3c2a4d] text-[#d2bb94] rounded-sm border border-[#d2bb94] shadow-sm hover:bg-opacity-90 transition-colors text-lg uppercase tracking-wide cursor-pointer"
                style={{ 
                  fontFamily: '"Sebastien Slab Round", serif',
                  boxShadow: '1px 1px 0 #d2bb94',
                  fontWeight: 400,
                  letterSpacing: '0.03em'
                }}
              >
                Change Address (Demo)
              </button>
              <div 
                onClick={() => navigate('/')}
                className="mt-4 px-6 py-2 bg-[#d2bb94] text-[#3c2a4d] rounded-sm border border-[#3c2a4d] shadow-sm hover:bg-opacity-90 transition-colors text-lg uppercase tracking-wide cursor-pointer"
                style={{ 
                  fontFamily: '"Sebastien Slab Round", serif',
                  boxShadow: '1px 1px 0 #3c2a4d',
                  fontWeight: 400,
                  letterSpacing: '0.03em'
                }}
              >
                Return to Home
              </div>
            </div>
          </div>
          <img 
            src="/ConfirmCircle.png" 
            alt="Early access stamp" 
            className="absolute top-2 right-2 w-32 h-32 z-20" 
            style={{ animation: 'spin 5s linear infinite' }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WaitlistConfirmation;