import React from 'react';
import { InteractiveDemo } from './components/InteractiveDemo';
import { ConceptCard } from './components/ConceptCard';
import { CONCEPTS } from './constants';
import { useIsMobile } from './hooks/useIsMobile';
import { motion } from 'framer-motion';

// A new component for navigation links in the sidebar
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


export default function App() {
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
        fontSize: isMobile ? '24px' : '32px',
        fontWeight: 700,
        color: '#FFFFFF',
        lineHeight: '1.2',
        marginBottom: '8px'
    };

    const subtitleStyle: React.CSSProperties = {
        fontSize: isMobile ? '16px' : '18px',
        color: '#888888',
        lineHeight: '1.5',
        maxWidth: '60ch'
    };

    const Header = () => (
        <header style={headerStyle}>
            <h1 style={titleStyle}>System Design Deconstructed</h1>
            <p style={subtitleStyle}>An interactive breakdown of the system design process for a simple React component, from pseudo-code to final product.</p>
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