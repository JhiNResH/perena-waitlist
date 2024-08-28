import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [telegramHandle, setTelegramHandle] = useState('');
  const navigate = useNavigate();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 這裡添加發送數據到後端的邏輯
    // 生成 referral code 的邏輯也可以放在這裡或者後端
    navigate('/registration-success');
  };

  return (
    <motion.div 
      className="flex justify-center items-center min-h-screen bg-brand-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-md"
        initial={{ scale: 0, opacity: 0 }}
        animate={controls}
      >
        <h2 className="text-2xl font-bold mb-4 text-brand-purple">Complete Your Registration</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          value={telegramHandle}
          onChange={(e) => setTelegramHandle(e.target.value)}
          placeholder="Telegram Handle"
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-brand-purple text-white rounded">
          Complete Registration
        </button>
      </motion.form>
    </motion.div>
  );
};

export default Registration;