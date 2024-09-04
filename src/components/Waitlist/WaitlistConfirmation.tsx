import React from 'react';
import { useNavigate } from 'react-router-dom';

interface WaitlistConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistConfirmation: React.FC<WaitlistConfirmationProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="relative bg-[#fffef7] rounded-lg shadow-xl overflow-hidden w-[32rem] h-[32rem]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url('/pattern.png')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '100px auto'
        }}></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full p-8">
          <div className="bg-[#fffef7] rounded-lg p-8 w-[90%] h-[90%] flex flex-col justify-center items-center">
            <img src="/perenanobg.svg" alt="Perena logo" className='h-16 w-auto mb-8' />
            <h2 className="text-3xl font-500 text-center mb-4 text-brand-purple uppercase">
              Congratulations!<br />You've joined our waitlist
            </h2>
            <p className="text-center text-lg mb-8">
              Thank you for joining the Perena waitlist. We'll keep you updated on our progress.
            </p>
            <div 
              onClick={() => {
                onClose();
                navigate('/');
              }}
              className="mt-8 px-6 py-2 bg-[#d2bb94] text-[#3c2a4d] rounded-sm border border-[#3c2a4d] shadow-sm hover:bg-opacity-90 transition-colors text-lg uppercase tracking-wide cursor-pointer"
              style={{ 
                fontFamily: '"Sebastien Slab Round", serif',
                boxShadow: '1px 1px 0 #3c2a4d',
                fontWeight: 400,
                letterSpacing: '0.03em'
              }}
            >
              Return to Home
            </div>
          </div>
        </div>
        <img src="/ConfirmCircle.png" alt="Early access stamp" className="absolute top-2 right-2 w-32 h-32 z-20 animate-spin-slow" />
      </div>
    </div>
  );
};

export default WaitlistConfirmation;