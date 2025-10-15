import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { 
    Icon,
    Code,
    ChatTeardropText,
    GitBranch,
    TreeStructure,
    FlowArrow,
    ListNumbers,
    Plus,
    Minus
} from 'phosphor-react';

// =================================================================
// TYPES
// =================================================================
interface Concept {
    id: string;
    title: string;
    what: string;
    why: string;
    how: string;
    code: string;
    icon: Icon;
    lang: string;
}

// =================================================================
// CONSTANTS
// =================================================================
const CONCEPTS: Concept[] = [
    { id: 'pseudo-code', title: 'Pseudo Code', what: 'The Blueprint', why: 'Clarity', how: 'Plain Language', code: `// STATE\nINITIALIZE 'count' to 0\n\n// LOGIC\nWHEN "Increment" is clicked:\n  ADD 1 to 'count'\n  UPDATE display`, icon: Code, lang: 'javascript' },
    { id: 'sys-prompt', title: 'System Prompt', what: 'The Briefing', why: 'Precision', how: 'Define Rules', code: `// You are an expert React developer.
// Generate a single, self-contained component
// using functional components and the useState hook.`, icon: ChatTeardropText, lang: 'javascript' },
    { id: 'context-map', title: 'Context Map', what: 'The Ecosystem', why: 'Scope', how: 'Map Boundaries', code: `  [User]
    |
    v Clicks
  [App UI]
    |
    v Reads/Writes
  [State]`, icon: GitBranch, lang: 'javascript' },
    { id: 'component-tree', title: 'Component Tree', what: 'UI Hierarchy', why: 'Structure', how: 'Nest Components', code: `App\n └─ Counter\n     ├─ Display (shows count)\n     └─ Button (handles clicks)`, icon: TreeStructure, lang: 'javascript' },
    { id: 'logic-tree', title: 'Logic Tree', what: 'Decision Flow', why: 'Edge Cases', how: 'Map Paths', code: `         Click Event
               |
    Is button "Increment"?
          /        \\
        (Yes)      (No)
          |        |
      count++    count--`, icon: FlowArrow, lang: 'javascript' },
    { id: 'action-sequence', title: 'Action Sequence', what: 'The Dominoes', why: 'Debugging', how: 'List Steps', code: `1. User clicks button\n2. Event handler called\n3. setCount() executed\n4. React re-renders\n5. User sees new count`, icon: ListNumbers, lang: 'javascript' }
];

// =================================================================
// HOOKS
// =================================================================
function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
}


// =================================================================
// SUB-COMPONENTS
// =================================================================

/**
 * From components/InteractiveDemo.tsx
 */
const InteractiveDemo = () => {
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

/**
 * From components/ConceptCard.tsx
 */
interface ConceptCardProps extends Concept {
    index: number;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ id, title, what, why, how, code, icon: Icon, lang, index }) => {
    
    const sectionStyle: React.CSSProperties = {
        background: '#0A0A0A',
        padding: '32px',
        borderRadius: '12px',
        border: '1px solid #222222',
        marginBottom: '32px',
        scrollMarginTop: '32px', // For scroll-to-id offset
    };

    const headerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '32px',
    };

    const contentGridStyle: React.CSSProperties = {
        marginBottom: '32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '32px',
        textAlign: 'left',
    };

    const h3Style: React.CSSProperties = {
        fontSize: '12px',
        lineHeight: '16px',
        fontWeight: 600,
        color: '#888888',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '8px',
        fontFamily: "'Inter', sans-serif",
    };

    const pStyle: React.CSSProperties = {
        color: '#E0E0E0',
        fontSize: '16px',
        lineHeight: '24px',
        margin: 0,
        fontFamily: "'Inter', sans-serif",
    };

    return (
        <motion.section 
            id={id} 
            style={sectionStyle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div style={headerStyle}>
                <div style={{
                    background: '#111111',
                    border: '1px solid #222222',
                    borderRadius: '8px',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon size={24} style={{ color: '#888888' }} />
                </div>
                <h2 style={{ fontFamily: "'Roboto Mono', monospace", fontSize: '20px', fontWeight: 700, color: '#FFFFFF', margin: 0, lineHeight: '28px' }}>{`${title}`}</h2>
            </div>
            <div style={contentGridStyle}>
                <div>
                    <h3 style={h3Style}>What</h3>
                    <p style={pStyle}>{what}</p>
                </div>
                <div>
                    <h3 style={h3Style}>Why</h3>
                    <p style={pStyle}>{why}</p>
                </div>
                <div>
                    <h3 style={h3Style}>How</h3>
                    <p style={pStyle}>{how}</p>
                </div>
            </div>
            <SyntaxHighlighter 
                language={lang} 
                style={vscDarkPlus}
                showLineNumbers
                wrapLines
                customStyle={{
                    fontFamily: "'Roboto Mono', monospace",
                    background: "#000000",
                    padding: "24px",
                    margin: "0",
                    overflow: "auto",
                    borderRadius: "12px",
                    border: "1px solid #222222",
                    fontSize: '14px',
                }}
                codeTagProps={{
                    style: {
                        fontFamily: "'Roboto Mono', monospace",
                        height: 'auto'
                    }
                }}
            >
                {code}
            </SyntaxHighlighter>
        </motion.section>
    );
};

/**
 * From App.tsx (ConceptNav)
 */
const ConceptNav = () => {
    const navItemStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 12px',
        borderRadius: '8px',
        textDecoration: 'none',
        color: '#E0E0E0',
        transition: 'background-color 150ms',
        cursor: 'pointer'
    };
    
    const navTextStyle: React.CSSProperties = {
        fontSize: '14px',
        fontWeight: 500,
        fontFamily: "'Inter', sans-serif"
    };

    const handleNavClick = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 600,
                color: '#888888',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '0 12px',
                margin: '16px 0 8px 0',
            }}>
                Concepts
            </h3>
            {CONCEPTS.map((concept) => {
                const Icon = concept.icon;
                return (
                    <motion.a
                        key={concept.id}
                        href={`#${concept.id}`}
                        onClick={handleNavClick(concept.id)}
                        style={navItemStyle}
                        whileHover={{ backgroundColor: '#181818' }}
                    >
                        <Icon size={18} weight="regular" />
                        <span style={navTextStyle}>{concept.title}</span>
                    </motion.a>
                );
            })}
        </nav>
    );
};


// =================================================================
// MAIN APP COMPONENT
// =================================================================
export default function SystemDesignToolsApp() {
    const isMobile = useIsMobile();
    
    // Mono Palette
    const colors = {
        background: '#000000',
        text: '#E0E0E0',
        border: '#222222',
    };

    const rootStyle: React.CSSProperties = {
        fontFamily: "'Inter', sans-serif",
        backgroundColor: colors.background,
        color: colors.text,
        minHeight: '100vh',
    };

    const desktopContainerStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: '48px',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '48px',
    };

    const sidebarStyle: React.CSSProperties = {
        position: 'sticky',
        top: '48px',
        height: 'calc(100vh - 96px)',
        display: 'flex',
        flexDirection: 'column',
    };

    const mainStyle: React.CSSProperties = {
        padding: isMobile ? '24px' : '0',
    };
    
    const headerStyle: React.CSSProperties = {
        marginBottom: '32px',
    };
    
    const titleStyle: React.CSSProperties = {
        fontSize: isMobile ? '48px' : '72px',
        fontWeight: 700,
        color: '#FFFFFF',
        lineHeight: isMobile ? 1.2 : 1.05,
        marginBottom: '24px'
    };

    const subtitleStyle: React.CSSProperties = {
        fontSize: '16px',
        color: '#A0A0A0',
        lineHeight: 1.6,
        maxWidth: isMobile ? undefined : '60ch'
    };

    const Header = () => (
        <header style={headerStyle}>
            <h1 style={titleStyle}>
                System Design Tools
            </h1>
            <p style={subtitleStyle}>Ever feel like system design is a language you're supposed to know, but don't quite speak? We're here for that 'aha!' moment. Transform confusion into clarity and theory into intuition with hands-on tools that make complex ideas finally click.</p>
        </header>
    );

    return (
        <div style={rootStyle}>
            <style>{`
                html { scroll-behavior: smooth; }
                body { 
                    background-color: ${colors.background};
                    font-family: 'Inter', sans-serif;
                    scrollbar-color: ${colors.border} ${colors.background};
                    scrollbar-width: thin;
                }
                * {
                    box-sizing: border-box;
                    margin: 0;
                }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: ${colors.background}; }
                ::-webkit-scrollbar-thumb { background: ${colors.border}; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #333333; }
            `}</style>

            {isMobile ? (
                 <main style={mainStyle}>
                    <div style={{ maxWidth: '768px', margin: '0 auto' }}>
                        <Header />
                        <InteractiveDemo />
                        {CONCEPTS.map((concept, index) => (
                            <ConceptCard
                                key={concept.id}
                                index={index}
                                {...concept}
                            />
                        ))}
                    </div>
                </main>
            ) : (
                <div style={desktopContainerStyle}>
                    <aside style={sidebarStyle}>
                        <Header />
                        <InteractiveDemo />
                        <ConceptNav />
                    </aside>
                    <main>
                        {CONCEPTS.map((concept, index) => (
                            <ConceptCard
                                key={concept.id}
                                index={index}
                                {...concept}
                            />
                        ))}
                    </main>
                </div>
            )}
        </div>
    );
}
