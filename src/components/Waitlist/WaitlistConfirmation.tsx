import React from 'react';

interface WaitlistConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistConfirmation: React.FC<WaitlistConfirmationProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <div className="flex justify-center mb-6 space-x-3">
        <img src="/perenanobg.svg" alt="Perena logo" className='h-6 w-auto' />
        <img src='/logo.svg' alt='Perana text' className='h-4 w-auto' />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">
          You're invited to join our waitlist
        </h2>
        <p className="text-center mb-6">
          Thank you for your interest. We'll contact you soon with more information.
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitlistConfirmation;