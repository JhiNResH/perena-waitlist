import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../global.css';

interface FlipCircleProps {
    className?: string;
}

const FlippableCircle: React.FC<FlipCircleProps> = ({className = '',}) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleClick = () => navigate('/next-page');
    
    return (
        <div 
            className={`relative w-64 h-64 mb-8 ${className}`} 
            style={{ perspective: '1000px' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div
                className="w-full h-full rounded-full overflow-hidden"
                style={{
                transition: 'transform 0.5s ease-in-out',
                transform: isHovered ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
            >
                <div className="absolute w-full h-full flex items-center justify-center text-white text-xl rounded-full" style={{ backfaceVisibility: 'hidden' }}>
                    <img src="/planet-before-hover.png" alt="planet" className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="absolute w-3 h-3 rounded-full" style={{ top: '50%', left: '-48px', transform: 'translateY(-50%)', backgroundColor: '#2a136a' }}></div>
            <div className="absolute w-3 h-3 rounded-full" style={{ top: '50%', right: '-48px', transform: 'translateY(-50%)', backgroundColor: '#2a136a' }}></div>
        </div>
    );
};

export default FlippableCircle;