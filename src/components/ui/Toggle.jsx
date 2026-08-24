import React from 'react';

/**
 * Toggle Component - Modern Switch Style
 * Features: smooth animation, gold accent when active, accessible
 */
const Toggle = ({
    checked = false,
    onChange,
    label = '',
    disabled = false,
    className = '',
    ...props
}) => {
    return (
        <label className={`flex items-center gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
            <div className="relative">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only peer"
                    {...props}
                />
                <div className={`
                    w-11 h-6 rounded-full transition-smooth
                    ${checked ? 'bg-gradient-gold shadow-glow-gold' : 'bg-dark-700'}
                    peer-focus:ring-2 peer-focus:ring-accent-gold peer-focus:ring-offset-2 peer-focus:ring-offset-dark-900
                `}>
                    <div className={`
                        absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-smooth
                        ${checked ? 'translate-x-5 bg-dark-900' : 'translate-x-0 bg-dark-500'}
                    `} />
                </div>
            </div>
            {label && (
                <span className="text-text-secondary text-sm font-medium select-none">
                    {label}
                </span>
            )}
        </label>
    );
};

export default Toggle;
