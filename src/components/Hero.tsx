import React from 'react';
import FlipCircle from './FlipCircle';

interface HeroProps {
  onJoinWaitlist: () => void;
}

const Hero: React.FC<HeroProps> = ({ onJoinWaitlist }) => {
  return (
    <main className="flex-grow flex flex-col justify-center items-center px-4">
      <div className="flex flex-col items-center w-full max-w-2xl">
        <FlipCircle className="mb-14" onJoinWaitlist={onJoinWaitlist}/>
        <h1 className="text-2xl font-bold text-center leading-tight mb-2">
          INFRASTRUCTURE
        </h1>
        <h2 className="text-2xl font-bold text-center leading-tight">
          FOR MONEY
        </h2>
      </div>
      
    </main>
  );
};

export default Hero;