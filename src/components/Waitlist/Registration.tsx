import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Wallet from '../Wallet/ConnectWallet';

declare global {
  interface Window {
    twttr: {
      widgets: {
        load: () => void;
      };
    };
  }
}

const Registration: React.FC = () => {
  const controls = useAnimation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [followCompleted, setFollowCompleted] = useState(false);
  const [retweetCompleted, setRetweetCompleted] = useState(false);
  const [stepOneCompleted, setStepOneCompleted] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  
  useEffect(() => {
    controls.start({
      scale: [0, 1.1, 1],
      opacity: [0, 1],
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        times: [0, 0.7, 1]
      }
    });

    const script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [controls]);

  useEffect(() => {
    if (followCompleted && retweetCompleted) {
      setStepOneCompleted(true);
      setStep(2);
    }
  }, [followCompleted, retweetCompleted]);

  useEffect(() => {
    if (stepOneCompleted && walletConnected) {
      navigate('/waitlist-confirmation');
    }
  }, [stepOneCompleted, walletConnected, navigate]);

  const handleFollow = () => {
    window.open('https://twitter.com/intent/follow?screen_name=Perena__', '_blank');
    setFollowCompleted(true);
  };

  const handlePost = () => {
    const tweetId = '1825972230401974627';
    const intentUrl = `https://twitter.com/intent/retweet?tweet_id=${tweetId}`;
    window.open(intentUrl, 'Retweet', 'width=600,height=400,resizable=yes,scrollbars=yes');
    setRetweetCompleted(true);
  };

  const handleJoinWaitlist = () => {
    setWalletConnected(true);
    console.log('Joined waitlist');
    // Add any additional logic for joining the waitlist here
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      <Header />
      <main className="flex-grow flex justify-center items-center px-4 py-[var(--80px)]">
        <motion.div 
          className="w-full max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-5 bg-[#3c2a4d] p-7 rounded-lg shadow-lg"
          >
            {stepOneCompleted ? (
              <div className="bg-[#d2bb94] p-5 rounded-sm border border-[#3c2a4d] flex items-center">
                <span className="bg-[#3c2a4d] text-[#d2bb94] rounded-full w-7 h-7 flex items-center justify-center mr-2 text-base">✓</span>
                <span className="text-lg text-[#3c2a4d] font-['Sebastien_Slab_Round'] font-normal">
                  Joined Perena and shared with friends
                </span>
              </div>
            ) : (
              <div className={`bg-[#d2bb94] p-5 rounded-sm border border-[#3c2a4d] ${step !== 1 ? 'opacity-50' : ''}`}>
                <h2 className="text-xl mb-4 text-[#3c2a4d] flex items-center font-['Sebastien_Slab_Round'] font-normal tracking-wider">
                  <span className="bg-[#3c2a4d] text-[#d2bb94] rounded-full w-7 h-7 flex items-center justify-center mr-2 text-lg">1</span>
                  Join Perena, and tell your friends
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-[#3c2a4d] font-['Sebastien_Slab_Round'] font-normal">
                      Follow on X:
                    </span>
                    <div 
                      onClick={handleFollow}
                      className={`inline-flex items-center bg-[#d2bb94] text-[#3c2a4d] px-5 py-1.5 rounded-sm border border-[#3c2a4d] shadow-[1px_1px_0_#3c2a4d] hover:bg-[#c0a983] transition-all duration-300 ease-in-out text-base uppercase tracking-wider cursor-pointer active:transform active:translate-y-0.5 active:shadow-none font-['Sebastien_Slab_Round'] font-normal ${followCompleted ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <span>@Perena__</span>
                      {followCompleted && <span className="ml-2">✓</span>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-[#3c2a4d] font-['Sebastien_Slab_Round'] font-normal">
                      Click Post to share the Promo Announcement:
                    </span>
                    <div 
                      onClick={handlePost}
                      className={`inline-flex items-center bg-[#d2bb94] text-[#3c2a4d] px-5 py-1.5 rounded-sm border border-[#3c2a4d] shadow-[1px_1px_0_#3c2a4d] hover:bg-[#c0a983] transition-all duration-300 ease-in-out text-base uppercase tracking-wider cursor-pointer active:transform active:translate-y-0.5 active:shadow-none font-['Sebastien_Slab_Round'] font-lg ${retweetCompleted ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <span>Repost</span>
                      {retweetCompleted && <span className="ml-2">✓</span>}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className={`bg-[#d2bb94] p-5 rounded-sm border border-[#3c2a4d] ${step !== 2 ? 'opacity-50' : ''}`}>
              <h2 className="text-xl mb-4 text-[#3c2a4d] flex items-center font-['Sebastien_Slab_Round'] font-normal tracking-wider">
                <span className="bg-[#3c2a4d] text-[#d2bb94] rounded-full w-7 h-7 flex items-center justify-center mr-2 text-lg">2</span>
                Connect your wallet and sign the message
              </h2>
              <p className="text-[#3c2a4d] mb-4 text-lg font-['Sebastien_Slab_Round']">
                Sign to confirm eligibility. Your connected wallet will qualify to claim double PERENA rewards.
              </p>
              <div className="flex justify-center">
                <Wallet onJoinWaitlist={handleJoinWaitlist} step={step} />
              </div>
            </div>
          </motion.div>
        </motion.div>
        
      </main>
      <Footer />
    </div>
  );
};

export default Registration;