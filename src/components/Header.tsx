import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/perenanobg.svg" alt="Perena logo" className='h-8 w-auto sm:h-10' />
          <img src='/logo.svg' alt='Perana text' className='h-5 w-auto sm:h-6' />
        </div>
        
        <a 
          href="#"
          className="bg-brand-purple text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors text-lg"
          style={{ fontFamily: '"Sebastien Slab Round", serif' }}
        >
          Launch App
        </a>
      </div>
    </header>
  );
};

export default Header;