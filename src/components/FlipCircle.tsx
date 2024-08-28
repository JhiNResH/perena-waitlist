import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import '../global.css';

interface FlipCircleProps {
    className?: string;
    onHoverChange: (isHovered: boolean) => void;
}

const FlippableCircle: React.FC<FlipCircleProps> = ({className = '', onHoverChange}) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const controls = useAnimation();
    const pageControls = useAnimation();
    
    const handleClick = async () => {
        // 第一階段：快速旋轉
        await controls.start({
            rotate: 720,
            scale: 1.2,
            transition: { 
                duration: 0.4,
                ease: "easeInOut"
            }
        });

        // 第二階段：整個畫面被吸入
        const duration = 1.5;
        const easing = [0.645, 0.045, 0.355, 1];

        await Promise.all([
            controls.start({
                scale: 0,
                opacity: 0,
                transition: { duration, ease: easing }
            }),
            pageControls.start({
                scale: 0.9,
                opacity: 0,
                rotate: 720,
                filter: 'brightness(0)',
                transition: { duration, ease: easing }
            })
        ]);

        navigate('/Registration');
    };
    
    const handleMouseEnter = () => {
        setIsHovered(true);
        onHoverChange(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        onHoverChange(false);
    };
    
    return (
        <motion.div 
        className={`relative w-64 h-64 mb-8 ${className} cursor-pointer `} 
        style={{ originX: 0.5, originY: 0.5 }}
        animate={pageControls}
        >
            <motion.div 
                className={`relative w-64 h-64 mb-8 ${className}`} 
                style={{ perspective: '1000px' }}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <motion.div
                    className="w-full h-full rounded-full overflow-hidden"
                    animate={controls}
                    initial={{
                        boxShadow: '0 0 0px rgba(210, 187, 148, 0)',
                        filter: 'brightness(1)',
                        opacity: 1,
                        scale: 1
                    }}
                    whileHover={{
                        boxShadow: '0 0 30px rgba(210, 187, 148, 0.8), 0 0 60px rgba(210, 187, 148, 0.6), 0 0 90px rgba(210, 187, 148, 0.4)',
                        filter: 'brightness(1.2)',
                        scale: 1.05,
                    }}
                    whileTap={{
                    scale: 0.95,
                    boxShadow: '0 0 15px rgba(210, 187, 148, 0.6), 0 0 30px rgba(210, 187, 148, 0.4), 0 0 45px rgba(210, 187, 148, 0.2)',
                    transition: { duration: 0.1 }
                }}
                    transition={{
                        boxShadow: { duration: 0.3, ease: 'easeInOut' },
                        filter: { duration: 0.3, ease: 'easeInOut' },
                    }}
                    style={{
                        animation: `spin 10s linear infinite`,
                        animationDuration: isHovered ? '2.5s' : '10s',
                    }}
                >
                    <motion.div 
                        className="absolute w-full h-full flex items-center justify-center text-white text-xl rounded-full"
                        animate={{
                            filter: isHovered ? 'brightness(0.8)' : 'brightness(1)',
                        }}
                        transition={{
                            filter: { duration: 0.3, ease: 'easeInOut' },
                        }}
                    >
                        <img 
                            src="/planet-before-hover.png"
                            alt="planet" 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </motion.div>
                <div className="absolute w-3 h-3 rounded-full" style={{ top: '50%', left: '-48px', transform: 'translateY(-50%)', backgroundColor: '#2a136a' }}></div>
                <div className="absolute w-3 h-3 rounded-full" style={{ top: '50%', right: '-48px', transform: 'translateY(-50%)', backgroundColor: '#2a136a' }}></div>
            </motion.div>
            {/* <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
                <path id="circle" d="M150,150 m-130,0 a130,130 0 1,1 260,0 a130,130 0 1,1 -260,0" fill="none"/>
                <text className="text-[14px] uppercase fill-brand-purple">
                <textPath xlinkHref="#circle" startOffset="0%">
                <animate attributeName="startOffset" from="0%" to="100%" dur="30s" repeatCount="indefinite"/>
                Enter Perena • Enter Perena • Enter Perena • Enter Perena • Enter Perena • Enter Perena • Enter Perena •
                </textPath>
            </text>
            </svg> */}
        </motion.div>
    );
};

export default FlippableCircle;