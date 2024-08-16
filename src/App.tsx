import React, { useState } from 'react';
import './global.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import WaitlistConfirmation from './components/WaitlistConfirmation';

const App: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleJoinWaitlist = () => {
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return <WaitlistConfirmation onClose={handleCloseConfirmation} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-purple font-sans text-base leading-base">
      <Header />
      <Hero onJoinWaitlist={handleJoinWaitlist} />
      <Footer />
    </div>
  );
};

export default App;