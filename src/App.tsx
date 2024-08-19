import React, { useState } from 'react';
import './global.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import WaitlistConfirmation from './components/Waitlist/WaitlistConfirmation';

const App: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleJoinWaitlist = async() => {
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };


  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-purple font-sans text-base leading-base">
      <Header />
      <Hero onJoinWaitlist={handleJoinWaitlist} />
      <Footer />
      {showConfirmation && <WaitlistConfirmation isOpen={showConfirmation} onClose={handleCloseConfirmation} />}
    </div>
  );
};

export default App;