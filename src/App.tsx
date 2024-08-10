import { useState } from 'react';
import './global.css';
import FlipCircle from './FlipCircle';
import Modal from './WaitlistConfirmation';

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <main className="flex flex-col justify-center items-center min-h-screen bg-brand-cream text-brand-purple font-sans text-base leading-base">
            <div className="flex flex-col items-center w-full max-w-2xl px-4">
                <div className="flex justify-center items-center mb-16 w-full">
                    <img src="/perenanobg.svg" alt="Perena logo" className='h-16 w-auto' />
                    <div className="w-6"></div>
                    <img src='/logo.svg' alt='Perana text' className='h-9 w-auto' />
                </div>
                <FlipCircle className="mb-14" openModal={openModal}/>
                <h1 className="text-2xl font-bold text-center leading-tight mb-2">
                    INFRASTRUCTURE
                </h1>
                <h2 className="text-2xl font-bold text-center leading-tight">
                    FOR MONEY
                </h2>
            </div>
            <footer className="w-full py-4">
              <div className="flex justify-center">
                <a 
                  href="https://x.com/Perena__" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-purple hover:text-opacity-80 transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </footer>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-2xl font-bold mb-4">Thank you for joining the waitlist!</h2>
                <p className="mb-4">We've received your information and will contact you soon.</p>
            </Modal>
        </main>
    )
}

export default App;