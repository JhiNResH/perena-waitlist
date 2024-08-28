import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

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
    // 這裡添加發推文的邏輯
    window.open('https://twitter.com/intent/tweet?text=Your%20promo%20text%20here', '_blank');
  };

  const handleVerify = () => {
    // 這裡添加驗證推文的邏輯
    console.log('Verifying tweet:', tweetLink);
  };

  const handleConnectWallet = () => {
    // 這裡添加連接錢包的邏輯
    console.log('Connecting wallet');
  };

  return (
    <motion.div 
      className="flex justify-center items-center min-h-screen bg-brand-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.form
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="bg-purple-600 p-6 rounded-2xl mb-4">
          <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
            <span className="bg-pink-300 text-purple-700 rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
            Join Perena, and tell your friends about Perena
          </h2>
          <div className="mb-4">
            <button onClick={handleFollowX} className="bg-black text-white px-4 py-2 rounded-full flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @Perena__
            </button>
          </div>
          <div className="mb-4">
            <button onClick={handlePost} className="bg-black text-white px-4 py-2 rounded-full flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Retweet
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={tweetLink}
              onChange={(e) => setTweetLink(e.target.value)}
              placeholder="Insert the link to your tweet"
              className="flex-grow p-2 rounded-l-full bg-purple-800 text-white"
            />
            <button onClick={handleVerify} className="bg-purple-400 text-purple-800 px-4 py-2 rounded-r-full">
              Verify
            </button>
          </div>
        </div>
        <div className="bg-purple-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
            <span className="bg-gray-400 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
            Connect your wallet and sign the message
          </h2>
          <p className="text-purple-300 mb-4">
            Sign the message to confirm eligibility.
          </p>
          <button onClick={handleConnectWallet} className="bg-purple-600 text-white px-6 py-2 rounded-full">
            Connect Wallet
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default Registration;