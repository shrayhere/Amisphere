import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import Button from './ui/Button';

/**
 * ErrorBoundary Component - Dark Theme
 * Displays user-friendly error messages with retry option
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
        if (this.props.onRetry) {
            this.props.onRetry();
        } else {
            window.location.reload();
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
                    <div className="glass-card p-8 max-w-md text-center">
                        <div className="w-16 h-16 bg-danger/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaExclamationTriangle className="text-3xl text-danger" />
                        </div>
                        <h3 className="text-xl font-bold text-text-primary mb-2">
                            {this.props.title || 'Oops! Something went wrong'}
                        </h3>
                        <p className="text-text-muted text-sm mb-6">
                            {this.props.message || 'We encountered an error while loading this page. Please try again.'}
                        </p>
                        {this.state.error && (
                            <p className="text-xs text-danger/70 mb-6 font-mono bg-dark-900 p-3 rounded-lg">
                                {this.state.error.toString()}
                            </p>
                        )}
                        <Button variant="primary" onClick={this.handleRetry}>
                            Try Again
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

/**
 * ErrorMessage Component - Functional alternative for known errors
 */
export const ErrorMessage = ({ error, onRetry, title, message }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
            <div className="glass-card p-8 max-w-md text-center">
                <div className="w-16 h-16 bg-danger/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaExclamationTriangle className="text-3xl text-danger" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                    {title || 'Error Loading Data'}
                </h3>
                <p className="text-text-muted text-sm mb-6">
                    {message || error || 'Failed to load data. Please try again.'}
                </p>
                {onRetry && (
                    <Button variant="primary" onClick={onRetry}>
                        Try Again
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ErrorBoundary;
