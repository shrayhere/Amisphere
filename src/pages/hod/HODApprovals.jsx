import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Badge } from '../../components/Badge';
import EmptyState from '../../components/EmptyState';
import { FaCheckCircle, FaTimesCircle, FaHeadset } from 'react-icons/fa';
import { format } from 'date-fns';

const HODApprovals = () => {
    const { user } = useAuth();
    const { data, updateRequestStatus } = useData();
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [comment, setComment] = useState('');

    const escalatedRequests = data.requests.filter(r => r.status.includes('HOD'));

    const handleFinalApprove = () => {
        if (selectedRequest) {
            updateRequestStatus(selectedRequest.id, 'Approved', comment || 'Approved by HOD');
            setSelectedRequest(null);
            setComment('');
        }
    };

    const handleFinalReject = () => {
        if (selectedRequest) {
            updateRequestStatus(selectedRequest.id, 'Rejected', comment || 'Rejected by HOD');
            setSelectedRequest(null);
            setComment('');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-text-primary mb-2">Approvals</h2>
                <p className="text-text-muted">Review escalated requests from faculty</p>
            </div>

            {/* Requests List */}
            <Card>
                <h3 className="text-xl font-bold text-text-primary mb-6">Escalated Requests ({escalatedRequests.length})</h3>
                {escalatedRequests.length === 0 ? (
                    <EmptyState
                        title="No escalated requests"
                        message="Faculty escalated requests will appear here for final approval"
                        variant="default"
                    />
                ) : (
                    <div className="space-y-4">
                        {escalatedRequests.map((req) => (
                            <div key={req.id} className="border border-dark-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-dark-800/50">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-semibold text-text-primary">{req.fromName}</h4>
                                        <p className="text-sm text-text-muted">{req.type}</p>
                                        <p className="text-xs text-text-muted mt-1">
                                            Student ID: {req.fromId}
                                        </p>
                                    </div>
                                    <Badge variant={
                                        req.status === 'Approved' ? 'success' :
                                            req.status === 'Rejected' ? 'danger' : 'warning'
                                    }>
                                        {req.status}
                                    </Badge>
                                </div>
                                <p className="text-sm text-text-secondary mb-3 p-3 bg-dark-800 rounded-lg">
                                    {req.content}
                                </p>
                                {req.comment && (
                                    <div className="bg-accent-blue/10 border border-accent-blue/30 rounded-lg p-3 mb-3">
                                        <p className="text-xs font-semibold text-accent-blue mb-1">Faculty Comment:</p>
                                        <p className="text-sm text-text-secondary">{req.comment}</p>
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-text-muted">
                                        Submitted: {format(new Date(req.timestamp), 'MMM dd, yyyy hh:mm a')}
                                    </span>
                                    {req.status === 'Pending HOD' && (
                                        <Button
                                            size="sm"
                                            variant="primary"
                                            onClick={() => setSelectedRequest(req)}
                                        >
                                            Review
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {/* Review Panel */}
            {selectedRequest && (
                <Card>
                    <h3 className="text-xl font-bold text-text-primary mb-6">Final Approval</h3>
                    <div className="space-y-4">
                        <div className="bg-dark-800 p-4 rounded-lg">
                            <h4 className="font-semibold text-text-primary mb-1">{selectedRequest.fromName}</h4>
                            <p className="text-sm text-text-muted mb-3">{selectedRequest.type}</p>
                            <p className="text-sm text-text-secondary">{selectedRequest.content}</p>
                            {selectedRequest.comment && (
                                <div className="mt-3 pt-3 border-t border-dark-700">
                                    <p className="text-xs font-semibold text-text-secondary mb-1">Faculty Comment:</p>
                                    <p className="text-sm text-text-muted">{selectedRequest.comment}</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                HOD Comment (Optional)
                            </label>
                            <textarea
                                className="w-full px-4 py-3 bg-dark-800 text-text-primary rounded-xl border border-dark-700 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all resize-none placeholder-text-muted"
                                placeholder="Add your final decision notes..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows="3"
                            />
                        </div>

                        <div className="flex gap-3 justify-end pt-4">
                            <Button variant="secondary" onClick={() => setSelectedRequest(null)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleFinalReject} className="gap-2">
                                <FaTimesCircle /> Reject
                            </Button>
                            <Button variant="primary" onClick={handleFinalApprove} className="gap-2">
                                <FaCheckCircle /> Approve
                            </Button>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default HODApprovals;
