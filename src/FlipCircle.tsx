import React, { useState} from 'react';
import './global.css'; 
import ConnectWallet from './ConnectWallet';

interface FlipCircleProps {
    className?: string;
    openModal: () => void;
    // duration?: number;
}

const FlippableCircle: React.FC<FlipCircleProps> = ({ className = '', openModal }) => {
    // const FlippableCircle: React.FC<FlipCircleProps> = ({
    //     className = '',
    //     openModal,
    //     // duration = 5000 // animation duration 5s
    // }) => {
    const [isFlipped, setIsFlipped] = useState(false);

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
        
    // const [isAnimating, setIsAnimating] = useState(true);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIsAnimating(false);
    //     }, duration);

    //     return () => clearTimeout(timer);
    // }, [duration]);
        
    // useEffect(() => {
    //     // auto flip
    //     const timer = setInterval(() => {
    //         setIsFlipped(prev => !prev);
    //     }, flipInterval);

    //     // Clear timer
    //     return () => clearInterval(timer);
    // }, [flipInterval]);

    return (
        <div className={`relative w-64 h-64 mb-8 ${className}`} style={{ perspective: '1000px' }}>
            <div
                className={`absolute w-full h-full transform ${isFlipped ? 'rotate-x-180' : ''}`}
                // className={`absolute w-full h-full ${isFlipped ? 'animate-slow-spin' : 'flipped'}`}
                style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.5s'
                 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="absolute w-full h-full flex items-center justify-center text-white text-xl rounded-full" style={{ backfaceVisibility: 'hidden' }}>
                    <img src="/planet-before-hover.png" alt="planet" />
                </div>
                <div className="absolute w-full h-full flex items-center justify-center text-white text-xl rounded-full" style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}>
                    <ConnectWallet openModal={openModal}/>
                </div>
            </div>
            <div className="absolute w-3 h-3 rounded-full" style={{ top: '50%', left: '-48px', transform: 'translateY(-50%)', backgroundColor: '#2a136a' }}></div>
            <div className="absolute w-3 h-3 rounded-full" style={{ top: '50%', right: '-48px', transform: 'translateY(-50%)', backgroundColor: '#2a136a' }}></div>        </div>
    );
};

export default FlippableCircle;