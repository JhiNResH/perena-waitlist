import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [telegramHandle, setTelegramHandle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 這裡添加發送數據到後端的邏輯
    // 生成 referral code 的邏輯也可以放在這裡或者後端
    navigate('/registration-success');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-brand-cream">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
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
      </form>
    </div>
  );
};

export default Registration;