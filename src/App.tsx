import { useState } from 'react';
import './global.css';
import FlipCircle from './FlipCircle';
import Modal from './Modal';

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
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-xl font-bold mb-4">Thank you for joining the waitlist!</h2>
                <p>We've received your information and will contact you soon.</p>
            </Modal>
        </main>
    )
}

export default App;