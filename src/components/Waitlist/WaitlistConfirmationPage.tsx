import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration: React.FC = () => {
  const [email, setEmail] = useState('');
  const [telegramHandle, setTelegramHandle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 處理表單提交邏輯
    // 生成 referral code
    // 發送數據到後端
    navigate('/registration-success');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={telegramHandle}
        onChange={(e) => setTelegramHandle(e.target.value)}
        placeholder="Telegram Handle"
        required
      />
      <button type="submit">Complete Registration</button>
    </form>
  );
};

export default Registration;