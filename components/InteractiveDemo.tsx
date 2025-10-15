import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'phosphor-react';

type ControlButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
    ariaLabel: string;
};

const ControlButton: React.FC<ControlButtonProps> = ({ onClick, children, ariaLabel }) => {
    const style: React.CSSProperties = {
        width: '56px',
        height: '56px',
        borderRadius: '9999px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        color: '#E0E0E0',
        transition: 'background-color 150ms',
        border: '1px solid #222222',
        cursor: 'pointer',
        outline: 'none',
    };

    return (
        <motion.button
            whileHover={{ backgroundColor: '#181818', scale: 1.05 }}
            whileTap={{ scale: 0.95, backgroundColor: '#222222' }}
            onClick={onClick}
            style={style}
            aria-label={ariaLabel}
        >
            {children}
        </motion.button>
    );
};

export const InteractiveDemo = () => {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        setDirection(count > prevCountRef.current ? 1 : -1);
        prevCountRef.current = count;
    }, [count]);

    const sectionStyle: React.CSSProperties = {
        background: '#0A0A0A',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #222222',
        marginBottom: '24px',
    };

    const numberContainerStyle: React.CSSProperties = {
        position: 'relative',
        height: '64px',
        width: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000000',
        borderRadius: '8px',
        border: '1px solid #222222',
    };

    const numberStyle: React.CSSProperties = {
        fontSize: '45px',
        lineHeight: '64px',
        fontWeight: '700',
        fontFamily: "'Roboto Mono', monospace",
        color: '#FFFFFF',
        position: 'absolute',
    };

    const variants = {
        enter: (direction: number) => ({
            y: direction * 20,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            y: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            y: -direction * 20,
            opacity: 0,
        }),
    };

    return (
        <section id="interactive-demo" style={sectionStyle}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#FFFFFF', textAlign: 'left', margin: '0 0 24px 0', lineHeight: '24px', fontFamily: "'Inter', sans-serif" }}>Interactive Demo</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <ControlButton onClick={() => setCount(c => c - 1)} ariaLabel="Decrement">
                    <Minus size={24} weight="bold" />
                </ControlButton>
                
                <div style={numberContainerStyle}>
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.span
                            key={count}
                            style={numberStyle}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={direction}
                            transition={{
                                y: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                            }}
                            aria-live="polite"
                        >
                            {count}
                        </motion.span>
                    </AnimatePresence>
                </div>

                <ControlButton onClick={() => setCount(c => c + 1)} ariaLabel="Increment">
                    <Plus size={24} weight="bold" />
                </ControlButton>
            </div>
        </section>
    );
};