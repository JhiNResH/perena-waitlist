import React, { } from 'react';
import './global.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import WaitlistConfirmation from './components/Waitlist/WaitlistConfirmation';
import Registration from '../src/components/Waitlist/Registration';



const App: React.FC = () => {

  const MainContent = () => (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-purple font-sans text-base leading-base">
      <Header />
      <Hero />
      <Footer />
    </div>
  );


  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/waitlist-confirmation" element={<WaitlistConfirmation />} />
    </Routes>
  );
};
export default App;