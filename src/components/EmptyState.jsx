import React from 'react';
import { FaInbox, FaFolderOpen, FaExclamationCircle } from 'react-icons/fa';
import Button from './ui/Button';

/**
 * EmptyState Component - Dark Theme
 * Displays when no data is available with optional action button
 */
const EmptyState = ({
    icon: Icon,
    title = 'No Data Available',
    description,
    message, // Alias for description
    actionLabel,
    onAction,
    action, // Custom action component
    variant = 'default',
    className = ''
}) => {
    const icons = {
        default: FaInbox,
        folder: FaFolderOpen,
        warning: FaExclamationCircle,
    };

    const DisplayIcon = Icon || icons[variant];
    const displayMessage = description || message || 'There is no data to display at this time.';

    return (
        <div className={`flex flex-col items-center justify-center min-h-[300px] p-8 ${className}`}>
            <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DisplayIcon className="text-4xl text-text-muted" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {title}
                </h3>
                <p className="text-text-muted text-sm mb-6">
                    {displayMessage}
                </p>
                {action || (actionLabel && onAction && (
                    <Button variant="secondary" onClick={onAction}>
                        {actionLabel}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default EmptyState;
