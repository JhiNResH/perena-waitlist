import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Header from '../Header';
import Footer from '../Footer';

const Registration = () => {
  const [tweetLink, setTweetLink] = useState('');
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
  }, [controls]);

  const handleFollowX = () => {
    window.open('https://x.com/Perena__', '_blank');
  };

  const handlePost = () => {
    window.open('https://x.com/Perena__/status/1825972230401974627', '_blank');
  };

  const handleVerify = () => {
    console.log('Verifying tweet:', tweetLink);
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
            <div className="bg-purple-600 p-4 rounded-2xl">
              <h2 className="text-xl font-bold mb-3 text-white flex items-center">
                <span className="bg-pink-300 text-purple-700 rounded-full w-7 h-7 flex items-center justify-center mr-2 text-sm">1</span>
                Join Perena, and tell your friends
              </h2>
              <div className="space-y-3">
                <button onClick={handleFollowX} className="bg-black text-white px-3 py-1.5 rounded-full flex items-center text-sm w-full">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Follow @Perena__
                </button>
                <button onClick={handlePost} className="bg-black text-white px-3 py-1.5 rounded-full flex items-center text-sm w-full">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Retweet
                </button>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={tweetLink}
                    onChange={(e) => setTweetLink(e.target.value)}
                    placeholder="Insert tweet link"
                    className="flex-grow p-1.5 rounded-l-full bg-purple-800 text-white text-sm"
                  />
                  <button onClick={handleVerify} className="bg-purple-400 text-purple-800 px-3 py-1.5 rounded-r-full text-sm">
                    Verify
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-purple-800 p-4 rounded-2xl">
              <h2 className="text-xl font-bold mb-3 text-white flex items-center">
                <span className="bg-gray-400 text-purple-800 rounded-full w-7 h-7 flex items-center justify-center mr-2 text-sm">2</span>
                Connect wallet and sign
              </h2>
              <p className="text-purple-300 mb-3 text-sm">
                Sign to confirm eligibility.
              </p>
              <button onClick={handleConnectWallet} className="bg-purple-600 text-white px-4 py-1.5 rounded-full text-sm w-full">
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