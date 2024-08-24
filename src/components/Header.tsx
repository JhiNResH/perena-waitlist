import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open('https://t.me/perenafi', '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[40] flex justify-between items-center h-[var(--80px)] px-[var(--40px)] border-b border-brand-purple bg-brand-cream">
      <div className="flex items-center space-x-3">
        <img src="/perenanobg.svg" alt="Perena logo" className='h-6 w-auto' />
        <img src='/logo.svg' alt='Perana text' className='h-4 w-auto' />
      </div>        
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        className="bg-[#d2bb94] text-[#3c2a4d] px-6 py-2 rounded-sm border border-[#3c2a4d] shadow-sm hover:bg-opacity-90 transition-colors text-sm font-sebastien uppercase tracking-wide cursor-pointer active:transform active:translate-y-0.5 active:shadow-none relative overflow-hidden"
        style={{ 
          fontFamily: '"Sebastien Slab Round", serif',
          boxShadow: '1px 1px 0 #3c2a4d',
          fontWeight: 400,
          letterSpacing: '0.03em'
        }}
      >
        <span 
          className={`transition-transform duration-300 ${
            isHovered ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
          Launch App
        </span>
        <span 
          className={`absolute inset-0 bg-[#d2bb94] flex items-center justify-center transition-transform duration-300 ease-in-out ${
            isHovered ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          Launch Soon
        </span>
      </div>
    </header>
  );
};

export default Header;