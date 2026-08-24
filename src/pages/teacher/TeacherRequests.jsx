import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Badge } from '../../components/Badge';
import EmptyState from '../../components/EmptyState';
import { FaCheckCircle, FaTimesCircle, FaHeadset, FaArrowUp } from 'react-icons/fa';
import { format } from 'date-fns';

const TeacherRequests = () => {
    const { user } = useAuth();
    const { data, updateRequestStatus } = useData();
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [comment, setComment] = useState('');
    const [filter, setFilter] = useState('Pending');

    const teacherRequests = data.requests.filter(r => r.toRole === 'teacher');

    const filteredRequests = teacherRequests.filter(r => {
        if (filter === 'All') return true;
        if (filter === 'Pending') return r.status.includes('Pending Teacher');
        if (filter === 'Approved') return r.status === 'Approved';
        if (filter === 'Rejected') return r.status === 'Rejected';
        return true;
    });

    const handleApprove = () => {
        if (selectedRequest) {
            updateRequestStatus(selectedRequest.id, 'Approved', comment);
            setSelectedRequest(null);
            setComment('');
        }
    };

    const handleReject = () => {
        if (selectedRequest) {
            updateRequestStatus(selectedRequest.id, 'Rejected', comment);
            setSelectedRequest(null);
            setComment('');
        }
    };

    const handleEscalate = () => {
        if (selectedRequest) {
            updateRequestStatus(selectedRequest.id, 'Pending HOD', comment || 'Escalated to HOD for review');
            setSelectedRequest(null);
            setComment('');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-text-primary mb-2">Student Requests</h2>
                <p className="text-text-muted">Review and manage student requests</p>
            </div>

            {/* Filters */}
            <div className="flex gap-3">
                {['Pending', 'Approved', 'Rejected', 'All'].map((f) => (
                    <Button
                        key={f}
                        variant={filter === f ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setFilter(f)}
                    >
                        {f}
                    </Button>
                ))}
            </div>

            {/* Requests List */}
            <Card>
                <h3 className="text-xl font-bold text-text-primary mb-6">Requests ({filteredRequests.length})</h3>
                {filteredRequests.length === 0 ? (
                    <EmptyState
                        title={`No ${filter.toLowerCase()} requests`}
                        message="Student requests will appear here"
                        variant="default"
                    />
                ) : (
                    <div className="space-y-4">
                        {filteredRequests.map((req) => (
                            <div key={req.id} className="border border-dark-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-dark-800/50">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-semibold text-text-primary">{req.fromName}</h4>
                                        <p className="text-sm text-text-muted">{req.type}</p>
                                    </div>
                                    <Badge variant={
                                        req.status === 'Approved' ? 'success' :
                                            req.status === 'Rejected' ? 'danger' :
                                                req.status.includes('HOD') ? 'warning' : 'info'
                                    }>
                                        {req.status}
                                    </Badge>
                                </div>
                                <p className="text-sm text-text-secondary mb-3">{req.content}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-text-muted">
                                        {format(new Date(req.timestamp), 'MMM dd, yyyy hh:mm a')}
                                    </span>
                                    {req.status.includes('Pending Teacher') && (
                                        <Button
                                            size="sm"
                                            variant="primary"
                                            onClick={() => setSelectedRequest(req)}
                                        >
                                            Review
                                        </Button>
                                    )}
                                </div>
                                {req.comment && (
                                    <div className="bg-dark-700 rounded-lg p-3 mt-3">
                                        <p className="text-xs font-semibold text-text-secondary mb-1">Your Comment:</p>
                                        <p className="text-sm text-text-muted">{req.comment}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {/* Review Panel */}
            {selectedRequest && (
                <Card>
                    <h3 className="text-xl font-bold text-text-primary mb-6">Review Request</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-text-primary mb-1">{selectedRequest.fromName}</h4>
                            <p className="text-sm text-text-muted">{selectedRequest.type}</p>
                        </div>
                        <div className="bg-dark-800 rounded-lg p-4">
                            <p className="text-sm text-text-secondary">{selectedRequest.content}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                Add Comment (Optional)
                            </label>
                            <textarea
                                className="w-full px-4 py-3 bg-dark-800 text-text-primary rounded-xl border border-dark-700 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all resize-none placeholder-text-muted"
                                placeholder="Add any notes or feedback..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows="3"
                            />
                        </div>
                        <div className="flex gap-3 justify-end pt-4">
                            <Button variant="secondary" onClick={() => setSelectedRequest(null)}>
                                Cancel
                            </Button>
                            <Button variant="secondary" onClick={handleEscalate} className="gap-2">
                                <FaArrowUp /> Escalate to HOD
                            </Button>
                            <Button variant="danger" onClick={handleReject} className="gap-2">
                                <FaTimesCircle /> Reject
                            </Button>
                            <Button variant="primary" onClick={handleApprove} className="gap-2">
                                <FaCheckCircle /> Approve
                            </Button>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default TeacherRequests;
