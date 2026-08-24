import React from 'react';

/**
 * LoadingSpinner Component - Dark Theme
 * Displays a spinning gold gradient circle with optional loading text
 */
const LoadingSpinner = ({
    size = 'md',
    text = '',
    centered = true,
    className = ''
}) => {
    const sizes = {
        sm: 'w-6 h-6 border-2',
        md: 'w-12 h-12 border-3',
        lg: 'w-16 h-16 border-4',
    };

    const spinner = (
        <div className={`${sizes[size]} border-dark-700 border-t-accent-gold rounded-full animate-spin`} />
    );

    if (centered) {
        return (
            <div className={`flex flex-col items-center justify-center min-h-[200px] ${className}`}>
                {spinner}
                {text && (
                    <p className="mt-4 text-text-muted text-sm animate-pulse">{text}</p>
                )}
            </div>
        );
    }

    return (
        <div className={`inline-flex flex-col items-center ${className}`}>
            {spinner}
            {text && (
                <p className="mt-2 text-text-muted text-xs">{text}</p>
            )}
        </div>
    );
};

export default LoadingSpinner;
