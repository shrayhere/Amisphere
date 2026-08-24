import React from 'react';
import { useData } from '../context/DataContext';
import { FaCheck, FaTimes, FaShare, FaUser } from 'react-icons/fa';
import '../styles/requests.css';

const RequestCard = ({ req, role }) => {
    const { updateRequestStatus } = useData();

    // Status Logic
    const getStatusClass = (status) => {
        if (status === 'Approved') return 'status-approved';
        if (status === 'Rejected') return 'status-rejected';
        if (status === 'Pending HOD') return 'status-pending-hod';
        return 'status-pending-teacher';
    };

    return (
        <div className="request-card">
            <div className="req-header">
                <div className="req-user">
                    <div className="req-avatar">
                        <FaUser />
                    </div>
                    <div className="req-info">
                        <h4>{req.fromName} <span className="id-sub">({req.fromId})</span></h4>
                        <p>{new Date(req.timestamp).toLocaleDateString()}</p>
                    </div>
                </div>
                <span className={`status-badge ${getStatusClass(req.status)}`}>
                    {req.status}
                </span>
            </div>

            <div className="req-content">
                <h5>{req.type}</h5>
                <p>{req.content}</p>
            </div>

            {/* Teacher Actions */}
            {role === 'teacher' && req.status === 'Pending Teacher' && (
                <div className="req-actions">
                    <button
                        onClick={() => updateRequestStatus(req.id, 'Rejected')}
                        className="btn-action btn-reject"
                    >
                        Reject
                    </button>
                    <button
                        onClick={() => updateRequestStatus(req.id, 'Pending HOD')}
                        className="btn-action btn-forward"
                    >
                        Forward to HOD <FaShare />
                    </button>
                    <button
                        onClick={() => updateRequestStatus(req.id, 'Approved')}
                        className="btn-action btn-approve"
                    >
                        Approve Directly <FaCheck />
                    </button>
                </div>
            )}

            {/* HOD Actions */}
            {role === 'hod' && req.status === 'Pending HOD' && (
                <div className="req-actions">
                    <button
                        onClick={() => updateRequestStatus(req.id, 'Rejected')}
                        className="btn-action btn-reject"
                    >
                        Reject
                    </button>
                    <button
                        onClick={() => updateRequestStatus(req.id, 'Approved')}
                        className="btn-action btn-approve"
                    >
                        Approve Request <FaCheck />
                    </button>
                </div>
            )}
        </div>
    );
};

export default RequestCard;
