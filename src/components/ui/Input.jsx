import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

/**
 * Input Component - Dark Theme
 * Features: floating label, focus glow, password toggle, icon support
 */
const Input = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    error = '',
    success = false,
    icon: Icon,
    className = '',
    required = false,
    disabled = false,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const hasValue = value && value.length > 0;

    const getBorderColor = () => {
        if (error) return 'border-danger focus:border-danger focus:shadow-glow-danger';
        if (success) return 'border-success focus:border-success focus:shadow-glow-success';
        return 'border-dark-700 focus:border-accent-gold focus-glow-gold';
    };

    return (
        <div className={`relative ${className}`}>
            {/* Label */}
            {label && (
                <label
                    className={`block text-sm font-medium mb-2 transition-colors ${error ? 'text-danger' : success ? 'text-success' : 'text-text-secondary'
                        }`}
                >
                    {label} {required && <span className="text-danger">*</span>}
                </label>
            )}

            {/* Input Container */}
            <div className="relative">
                {/* Icon */}
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                        <Icon className="w-5 h-5" />
                    </div>
                )}

                {/* Input Field */}
                <input
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`
                        w-full px-4 py-3 bg-dark-800 text-text-primary rounded-lg
                        border-2 ${getBorderColor()}
                        transition-smooth input-focus-glow
                        placeholder-text-muted
                        disabled:opacity-50 disabled:cursor-not-allowed
                        focus:outline-none
                        ${Icon ? 'pl-12' : ''}
                        ${isPassword ? 'pr-12' : ''}
                    `}
                    {...props}
                />

                {/* Password Toggle */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                        tabIndex={-1}
                    >
                        {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                    </button>
                )}
            </div>

            {/* Error/Success Message */}
            {error && (
                <p className="mt-2 text-sm text-danger flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}

            {success && !error && (
                <p className="mt-2 text-sm text-success flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Looks good!
                </p>
            )}
        </div>
    );
};

export default Input;
