import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Badge } from '../../components/Badge';
import EmptyState from '../../components/EmptyState';
import { FaClock, FaCheckCircle, FaTimesCircle, FaHeadset } from 'react-icons/fa';
import { format } from 'date-fns';

const StudentSupport = () => {
    const { user } = useAuth();
    const { data, addRequest } = useData();
    const [type, setType] = useState('Attendance Correction');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const activeRequests = data.requests.filter(r => r.fromId === user.id);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newReq = {
            id: 'REQ' + Date.now(),
            fromId: user.id,
            fromName: user.name,
            toRole: 'teacher',
            type: type,
            content: content,
            status: 'Pending Teacher',
            timestamp: new Date().toISOString()
        };

        addRequest(newReq);
        setContent('');
        setIsSubmitting(false);
    };

    const getStatusVariant = (status) => {
        if (status.includes('Approved')) return 'success';
        if (status.includes('Rejected')) return 'danger';
        if (status.includes('HOD')) return 'warning';
        return 'info';
    };

    const getStatusIcon = (status) => {
        if (status.includes('Approved')) return <FaCheckCircle />;
        if (status.includes('Rejected')) return <FaTimesCircle />;
        return <FaClock />;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-text-primary mb-2">Support & Requests</h2>
                <p className="text-text-muted">Raise requests and track their status</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Request Form */}
                <Card>
                    <h3 className="text-xl font-bold text-text-primary mb-6">Raise New Request</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                Request Type
                            </label>
                            <select
                                className="w-full px-4 py-3 bg-dark-800 text-text-primary rounded-xl border border-dark-700 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option>Attendance Correction</option>
                                <option>Leave Application</option>
                                <option>Marks Re-evaluation</option>
                                <option>Document Request</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                Details
                            </label>
                            <textarea
                                className="w-full px-4 py-3 bg-dark-800 text-text-primary rounded-xl border border-dark-700 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all resize-none placeholder-text-muted"
                                placeholder="Describe your request in detail..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows="5"
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Request'}
                        </Button>

                        <p className="text-xs text-text-muted text-center mt-3">
                            * Your request will be sent to your assigned faculty first
                        </p>
                    </form>
                </Card>

                {/* Request Stats */}
                <div className="space-y-4">
                    <Card>
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-accent-gold/20 rounded-xl">
                                <FaHeadset className="text-2xl text-accent-gold" />
                            </div>
                            <div>
                                <p className="text-sm text-text-muted">Total Requests</p>
                                <p className="text-3xl font-bold text-text-primary">{activeRequests.length}</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-warning/20 rounded-xl">
                                <FaClock className="text-2xl text-warning" />
                            </div>
                            <div>
                                <p className="text-sm text-text-muted">Pending</p>
                                <p className="text-3xl font-bold text-text-primary">
                                    {activeRequests.filter(r => r.status.includes('Pending')).length}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Request History */}
            <Card>
                <h3 className="text-xl font-bold text-text-primary mb-6">My Requests</h3>
                {activeRequests.length === 0 ? (
                    <EmptyState
                        title="No requests yet"
                        message="Submit your first request using the form above"
                        variant="default"
                    />
                ) : (
                    <div className="space-y-4">
                        {activeRequests.map(req => (
                            <div key={req.id} className="border border-dark-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-dark-800/50">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-semibold text-text-primary">{req.type}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant={getStatusVariant(req.status)}>
                                                <div className="flex items-center gap-1">
                                                    {getStatusIcon(req.status)}
                                                    <span>{req.status}</span>
                                                </div>
                                            </Badge>
                                            <span className="text-xs text-text-muted">
                                                {format(new Date(req.timestamp), 'MMM dd, yyyy')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-text-secondary mb-3">{req.content}</p>
                                {req.comment && (
                                    <div className="bg-dark-700 rounded-lg p-3 mt-3">
                                        <p className="text-xs font-semibold text-text-secondary mb-1">Comment:</p>
                                        <p className="text-sm text-text-muted">{req.comment}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default StudentSupport;
