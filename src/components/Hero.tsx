import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FlipCircle from './FlipCircle';
import Counter from './Waitlist/Counter';

const Hero: React.FC = () => {
  const [isCircleHovered, setIsCircleHovered] = useState(false);

  return (
    <motion.main 
      className="mt-20 flex-grow flex flex-col justify-center items-center px-4"
      animate={{
        backgroundColor: isCircleHovered ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center w-full max-w-2xl">
        <div className="relative mb-14">
          <div className="lg:hidden absolute top-[-2.5rem] left-1/2 transform -translate-x-1/2 text-lg text-brand-purple p-2 bg-opacity-50 rounded floating-text" style={{ fontFamily: '"Sebastien Slab Round", serif' }}>
            Poke the Portal
          </div>
          <FlipCircle onHoverChange={setIsCircleHovered} />
        </div>
        <h1 className="text-3xl font-bold text-brand-purple text-center leading-tight mb-2">
          INFRASTRUCTURE
        </h1>
        <h2 className="text-3xl font-bold text-brand-purple text-center leading-tight">
          FOR MONEY
        </h2>
        <Counter /> 
      </div>
    </motion.main>
  );
};

export default Hero;