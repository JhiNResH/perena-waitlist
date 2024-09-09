import React, { useState, useEffect } from 'react';
import './global.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import WaitlistConfirmation from './components/Waitlist/WaitlistConfirmation';
import Registration from '../src/components/Waitlist/Registration';
import SplashScreen from './components/SplashScreen';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // 3秒後完全移除 SplashScreen

    return () => clearTimeout(timer);
  }, []);

  const MainContent = () => (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-purple font-sans text-base leading-base">
      <Header />
      <Hero />
      <Footer />
    </div>
  );

  return (
    <>
      {showSplash && <SplashScreen />}
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/waitlist-confirmation" element={<WaitlistConfirmation />} />
      </Routes>
    </>
  );
};

export default App;