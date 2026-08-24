import React from 'react';

/**
 * Button Component - Dark Theme
 * Variants: primary (gold gradient), secondary (outline), warning (red), ghost (transparent)
 */
const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    type = 'button',
    onClick,
    ...props
}) => {
    const baseStyles = 'font-semibold rounded-lg transition-smooth btn-press focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-gradient-gold text-dark-900 hover:shadow-glow-gold-lg focus:ring-accent-gold',
        secondary: 'border-2 border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-dark-900 focus:ring-accent-gold',
        warning: 'bg-danger text-white hover:shadow-glow-danger focus:ring-danger',
        ghost: 'text-text-secondary hover:bg-dark-800 hover:text-text-primary focus:ring-dark-600',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
