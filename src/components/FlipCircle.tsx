import React, { useState } from 'react';
import '../global.css'; 
import ConnectWallet from './Wallet/ConnectWallet';
import WaitlistConfirmation from './Waitlist/WaitlistConfirmation';

interface FlipCircleProps {
    className?: string;
}

const FlippableCircle: React.FC<FlipCircleProps> = ({
    className = '',
}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleMouseEnter = () => {
        if (!isFlipped) {
            setIsFlipped(true);
        }
    };

    const handleMouseLeave = () => {
        if (isFlipped) {
            setIsFlipped(false);
        }
    };

    const handleJoinWaitlist = () => {
        setShowConfirmation(true);
    };

    return (
        <>
            <div className={`relative w-64 h-64 mb-8 ${className}`} style={{ perspective: '1000px' }}>
                <div
                    className={`absolute w-full h-full transform ${isFlipped ? 'rotate-x-180' : ''}`}
                    style={{
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.3s ease-in-out'
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="absolute w-full h-full flex items-center justify-center text-white text-xl rounded-full" style={{ backfaceVisibility: 'hidden' }}>
                        <img src="/planet-before-hover.png" alt="planet" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute w-full h-full flex items-center justify-center text-white text-xl rounded-full " style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}>
                        <ConnectWallet onJoinWaitlist={handleJoinWaitlist}/>
                    </div>
                </div>
                <div className="absolute w-3 h-3 rounded-full" style={{ top: '50%', left: '-48px', transform: 'translateY(-50%)', backgroundColor: '#2a136a' }}></div>
                <div className="absolute w-3 h-3 rounded-full" style={{ top: '50%', right: '-48px', transform: 'translateY(-50%)', backgroundColor: '#2a136a' }}></div>
            </div>
            {showConfirmation && (
                <WaitlistConfirmation
                    isOpen={showConfirmation}
                    onClose={() => setShowConfirmation(false)}
                />
            )}
        </>
    );
};

export default FlippableCircle;