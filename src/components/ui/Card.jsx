import React from 'react';

/**
 * Card Component - Dark Theme with Glassmorphism
 * Features: glassmorphism effect, hover elevation, glow, configurable padding
 */
const Card = ({
    children,
    className = '',
    hover = true,
    padding = 'md',
    neonOutline = false,
    ...props
}) => {
    const baseStyles = 'glass-card rounded-xl';
    const hoverStyles = hover ? 'glass-card-hover' : '';
    const outlineStyles = neonOutline ? 'neon-outline' : '';

    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            className={`${baseStyles} ${hoverStyles} ${outlineStyles} ${paddings[padding]} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
