import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Header from '../Header';
import Footer from '../Footer';

declare global {
  interface Window {
    twttr: {
      widgets: {
        load: () => void;
      };
    };
  }
}

const Registration = () => {
  const controls = useAnimation();

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

    // 加載 Twitter widgets 腳本
    const script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [controls]);

  const handlePost = () => {
    const tweetId = '1825972230401974627';
    const intentUrl = `https://twitter.com/intent/retweet?tweet_id=${tweetId}`;
    window.open(intentUrl, 'Retweet', 'width=600,height=400,resizable=yes,scrollbars=yes');
  };

  const handleConnectWallet = () => {
    console.log('Connecting wallet');
  };

  return (
    <div className="flex flex-col h-screen bg-brand-cream overflow-hidden">
      <Header />
      <main className="flex-grow flex justify-center items-center px-4 py-[var(--80px)]">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.form
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-4"
          >
            <div className="bg-[#d2bb94] p-4 rounded-sm border border-[#3c2a4d]">
              <h2 className="text-xl mb-3 text-[#3c2a4d] flex items-center font-['Sebastien_Slab_Round'] font-normal tracking-wider">
                <span className="bg-[#3c2a4d] text-[#d2bb94] rounded-full w-7 h-7 flex items-center justify-center mr-2 text-sm">1</span>
                Join Perena, and tell your friends
              </h2>
              <div className="space-y-3">
                <button 
                  onClick={() => window.open('https://twitter.com/intent/follow?screen_name=Perena__', '_blank')}
                  className="w-full bg-[#d2bb94] text-[#3c2a4d] px-6 py-2 rounded-sm border border-[#3c2a4d] shadow-[1px_1px_0_#3c2a4d] hover:bg-[#c0a983] transition-all duration-300 ease-in-out text-sm uppercase tracking-wider cursor-pointer active:transform active:translate-y-0.5 active:shadow-none font-['Sebastien_Slab_Round'] font-normal"
                >
                  Follow @Perena__
                </button>
                <button 
                  onClick={handlePost}
                  className="w-full bg-[#d2bb94] text-[#3c2a4d] px-6 py-2 rounded-sm border border-[#3c2a4d] shadow-[1px_1px_0_#3c2a4d] hover:bg-[#c0a983] transition-all duration-300 ease-in-out text-sm uppercase tracking-wider cursor-pointer active:transform active:translate-y-0.5 active:shadow-none font-['Sebastien_Slab_Round'] font-normal"
                >
                  Retweet
                </button>
              </div>
            </div>
            <div className="bg-[#3c2a4d] p-4 rounded-sm border border-[#d2bb94]">
              <h2 className="text-xl mb-3 text-[#d2bb94] flex items-center font-['Sebastien_Slab_Round'] font-normal tracking-wider">
                <span className="bg-[#d2bb94] text-[#3c2a4d] rounded-full w-7 h-7 flex items-center justify-center mr-2 text-sm">2</span>
                Connect wallet and sign
              </h2>
              <p className="text-[#d2bb94] mb-3 text-sm">
                Sign to confirm eligibility.
              </p>
              <button 
                onClick={handleConnectWallet} 
                className="w-full bg-[#d2bb94] text-[#3c2a4d] px-6 py-2 rounded-sm border border-[#3c2a4d] shadow-[1px_1px_0_#3c2a4d] hover:bg-[#c0a983] transition-all duration-300 ease-in-out text-sm uppercase tracking-wider cursor-pointer active:transform active:translate-y-0.5 active:shadow-none font-['Sebastien_Slab_Round'] font-normal"
              >
                Connect Wallet
              </button>
            </div>
          </motion.form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Registration;