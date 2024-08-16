import { useState } from 'react';
import './global.css';
import FlipCircle from './FlipCircle';
import WaitlistConfirmation from './WaitlistConfirmation';

const App = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleJoinWaitlist = () => {
        setShowConfirmation(true);
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    if (showConfirmation) {
        return <WaitlistConfirmation onClose={handleCloseConfirmation} />;
    }

    return (
        <main className="flex flex-col justify-center items-center min-h-screen bg-brand-cream text-brand-purple font-sans text-base leading-base">
            <div className="flex flex-col items-center w-full max-w-2xl px-4">
                <div className="flex justify-center items-center mb-16 w-full">
                    <img src="/perenanobg.svg" alt="Perena logo" className='h-16 w-auto' />
                    <div className="w-6"></div>
                    <img src='/logo.svg' alt='Perana text' className='h-9 w-auto' />
                </div>
                <FlipCircle className="mb-14" openModal={handleJoinWaitlist}/>
                <h1 className="text-2xl font-bold text-center leading-tight mb-2">
                    INFRASTRUCTURE
                </h1>
                <h2 className="text-2xl font-bold text-center leading-tight">
                    FOR MONEY
                </h2>
            </div>
            <footer className="w-full py-4">
              <div className="flex justify-center space-x-6">
                <a 
                  href="https://x.com/Perena__" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-purple hover:text-opacity-80 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a 
                  href="https://t.me/perenafi"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-purple hover:text-opacity-80 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                  </svg>
            </a>
              </div>
            </footer>
        </main>
    )
}

export default App;