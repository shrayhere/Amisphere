import React, { useEffect } from 'react';
import { cn } from '../lib/utils';
import { FaTimes } from 'react-icons/fa';

export const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    className
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={cn(
                    'relative bg-white rounded-xl shadow-strong w-full animate-scale-in',
                    sizes[size],
                    className
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                    <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                        <FaTimes className="text-neutral-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export const ModalFooter = ({ children, className, ...props }) => {
    return (
        <div
            className={cn(
                'flex items-center justify-end gap-3 mt-6 pt-6 border-t border-neutral-200',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
