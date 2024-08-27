import React, { useState } from 'react';
import './global.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import WaitlistConfirmation from './components/Waitlist/WaitlistConfirmation';
import Registration from '../src/components/Waitlist/Registration';
import RegistrationSuccess from '../src/components/Waitlist/RegistrationSuccess';



const App: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleJoinWaitlist = async() => {
    setShowConfirmation(true);
    navigate('/registration');
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const MainContent = () => (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-purple font-sans text-base leading-base">
      <Header />
      <Hero onJoinWaitlist={handleJoinWaitlist} />
      <Footer />
      {showConfirmation && <WaitlistConfirmation isOpen={showConfirmation} onClose={handleCloseConfirmation} />}
    </div>
  );


  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/registration-success" element={<RegistrationSuccess />} />
    </Routes>
  );
};
export default App;