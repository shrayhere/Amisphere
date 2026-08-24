import React, { useState, useEffect } from 'react';
import { FaBell, FaTimes, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

const NotificationPopup = ({ notifications = [] }) => {
    const [current, setCurrent] = useState(null);
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        if (notifications.length > 0) {
            setQueue(notifications);
        }
    }, [notifications]);

    useEffect(() => {
        if (!current && queue.length > 0) {
            const next = queue[0];
            setCurrent(next);
            setQueue(prev => prev.slice(1));
        }
    }, [current, queue]);

    const handleClose = () => {
        setCurrent(null);
    };

    if (!current) return null;

    const getIcon = () => {
        switch (current.type) {
            case 'alert': return <FaExclamationTriangle className="text-red-500" />;
            case 'warning': return <FaBell className="text-yellow-500" />;
            default: return <FaInfoCircle className="text-blue-500" />;
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
            <div className="bg-white rounded-xl shadow-2xl border border-neutral-100 p-4 w-80 flex gap-4 relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${current.type === 'alert' ? 'bg-red-500' : current.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />

                <div className="mt-1 text-xl">
                    {getIcon()}
                </div>

                <div className="flex-1">
                    <h4 className="font-bold text-neutral-800 text-sm mb-1">{current.title}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">{current.message}</p>
                    <p className="text-[10px] text-neutral-400 mt-2">{current.date}</p>
                </div>

                <button
                    onClick={handleClose}
                    className="text-neutral-400 hover:text-neutral-600 transition-colors absolute top-2 right-2"
                >
                    <FaTimes />
                </button>
            </div>
        </div>
    );
};

export default NotificationPopup;
