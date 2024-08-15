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
              <div className="flex justify-center space-x-4">
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
                <a 
                  href="https://t.me/perenafi"
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
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
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