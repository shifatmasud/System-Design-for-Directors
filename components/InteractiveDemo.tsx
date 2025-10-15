import React, { useState } from 'react';
// FIX: Import the `Transition` type from `framer-motion` to explicitly type the transition configuration object.
import { motion, AnimatePresence, Transition } from 'framer-motion';
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
    const [direction, setDirection] = useState(0);

    const handleIncrement = () => {
        setDirection(1);
        setCount(c => c + 1);
    };

    const handleDecrement = () => {
        setDirection(-1);
        setCount(c => c - 1);
    };

    const sectionStyle: React.CSSProperties = {
        background: '#0A0A0A',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #222222',
        marginBottom: '24px',
    };

    const numberContainerStyle: React.CSSProperties = {
        height: '64px',
        width: '120px',
        position: 'relative',
        overflow: 'hidden',
        background: '#000000',
        borderRadius: '8px',
        border: '1px solid #222222',
    };

    const numberStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '45px',
        fontWeight: '700',
        fontFamily: "'Roboto Mono', monospace",
        color: '#FFFFFF',
    };
    
    const variants = {
      enter: (direction: number) => ({
        y: direction > 0 ? 64 : -64,
      }),
      center: {
        y: 0,
      },
      exit: (direction: number) => ({
        y: direction < 0 ? 64 : -64,
      }),
    };

    // FIX: Explicitly type `transition` with the `Transition` type. This resolves an error where TypeScript infers the `type` property as a generic `string` instead of the required literal type (e.g., "spring").
    const transition: Transition = {
        y: { type: "spring", stiffness: 300, damping: 30 },
    };

    return (
        <section id="interactive-demo" style={sectionStyle}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#FFFFFF', textAlign: 'left', margin: '0 0 24px 0', lineHeight: '24px', fontFamily: "'Inter', sans-serif" }}>Interactive Demo</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <ControlButton onClick={handleDecrement} ariaLabel="Decrement">
                    <Minus size={24} weight="bold" />
                </ControlButton>
                
                <div style={numberContainerStyle}>
                    <AnimatePresence custom={direction} mode="wait">
                        <motion.span
                            key={count}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={transition}
                            style={numberStyle}
                            aria-live="polite"
                        >
                            {count}
                        </motion.span>
                    </AnimatePresence>
                </div>

                <ControlButton onClick={handleIncrement} ariaLabel="Increment">
                    <Plus size={24} weight="bold" />
                </ControlButton>
            </div>
        </section>
    );
};