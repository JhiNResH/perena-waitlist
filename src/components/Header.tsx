import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[40] flex justify-between items-center h-[var(--80px)] px-[var(--40px)] border-b border-brand-purple bg-brand-cream">
      <div className="flex items-center space-x-3">
        <img src="/perenanobg.svg" alt="Perena logo" className='h-6 w-auto' />
        <img src='/logo.svg' alt='Perana text' className='h-4 w-auto' />
      </div>        
      <a 
        href="#"
        className="bg-[#d2bb94] text-[#3c2a4d] px-6 py-2 rounded-sm border border-[#3c2a4d] shadow-sm hover:bg-opacity-90 transition-colors text-sm font-sebastien uppercase tracking-wide"
        style={{ 
          fontFamily: '"Sebastien Slab Round", serif',
          boxShadow: '1px 1px 0 #3c2a4d',
          fontWeight: 400,
          letterSpacing: '0.03em'
        }}
      >
        Launch App
      </a>
    </header>
  );
};

export default Header;