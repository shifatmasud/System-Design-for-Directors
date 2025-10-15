import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Concept } from '../types';
import { motion } from 'framer-motion';

interface ConceptCardProps extends Concept {
    index: number;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({ id, title, what, why, how, code, icon: Icon, lang, index }) => {
    
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