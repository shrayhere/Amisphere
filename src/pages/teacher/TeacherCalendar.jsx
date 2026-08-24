import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FaCalendarAlt, FaSync, FaCheckCircle, FaGoogle } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Assuming standard CSS availability or we style it manually
import { format } from 'date-fns';

const TeacherCalendar = () => {
    const { user } = useAuth();
    const { data } = useData();
    const [date, setDate] = useState(new Date());
    const [isSyncing, setIsSyncing] = useState(false);
    const [synced, setSynced] = useState(false);

    // Combine exams and schedule into events
    const teacherData = data.teacherData?.[user.id] || {};
    const timetable = teacherData.timetable || [];
    const exams = data.examSchedule || [];

    // Helper to get events for a date
    const getEventsForDate = (date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        const dayName = format(date, 'EEE'); // Mon, Tue...

        const dayEvents = [];

        // Match Timetable (Weekly recurring)
        timetable.filter(t => t.day === dayName).forEach(t => {
            dayEvents.push({ type: 'class', title: t.subject, time: t.time, room: t.room });
        });

        // Match Exams (Specific Date)
        exams.filter(e => e.date === dateStr).forEach(e => {
            dayEvents.push({ type: 'exam', title: e.subject, time: e.time, room: e.room });
        });

        return dayEvents;
    };

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            setSynced(true);
            alert('Synced successfully with Google Calendar!');
        }, 1500);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-140px)]">
            {/* Calendar Main */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-neutral-900">Academic Calendar</h1>
                    <button
                        onClick={handleSync}
                        disabled={isSyncing || synced}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition
                            ${synced
                                ? 'bg-green-100 text-green-700 cursor-default'
                                : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                            }`}
                    >
                        {isSyncing ? <FaSync className="animate-spin" /> : synced ? <FaCheckCircle /> : <FaGoogle />}
                        {isSyncing ? 'Syncing...' : synced ? 'Synced' : 'Sync Google Calendar'}
                    </button>
                </div>

                <div className="calendar-wrapper flex-1">
                    {/* Custom styling wrapper for react-calendar to match Amisphere theme */}
                    <style>{`
                        .react-calendar { width: 100%; border: none; font-family: inherit; }
                        .react-calendar__tile { padding: 1.5em 0.5em; height: 100px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; }
                        .react-calendar__tile--now { background: #eff6ff; color: #1d4ed8; }
                        .react-calendar__tile--active { background: #4f46e5 !important; color: white !important; border-radius: 12px; }
                        .dot { height: 6px; width: 6px; border-radius: 50%; display: inline-block; margin-right: 4px; }
                    `}</style>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        tileContent={({ date, view }) => {
                            if (view === 'month') {
                                const evts = getEventsForDate(date);
                                if (evts.length > 0) {
                                    return (
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {evts.slice(0, 3).map((e, i) => (
                                                <span key={i} className={`dot ${e.type === 'exam' ? 'bg-red-400' : 'bg-indigo-400'}`} />
                                            ))}
                                            {evts.length > 3 && <span className="text-[10px] text-gray-400">+</span>}
                                        </div>
                                    );
                                }
                            }
                        }}
                    />
                </div>
            </div>

            {/* Sidebar Details */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col">
                <h3 className="font-bold text-lg mb-4 text-neutral-800 border-b border-neutral-100 pb-4">
                    Events for {format(date, 'MMMM dd, yyyy')}
                </h3>

                <div className="space-y-4 overflow-y-auto flex-1 custom-scrollbar">
                    {getEventsForDate(date).length > 0 ? (
                        getEventsForDate(date).map((evt, i) => (
                            <div key={i} className={`p-4 rounded-xl border-l-4 ${evt.type === 'exam' ? 'border-red-500 bg-red-50' : 'border-indigo-500 bg-indigo-50'}`}>
                                <h4 className="font-bold text-neutral-800">{evt.title}</h4>
                                <div className="flex justify-between items-center mt-2 text-sm text-neutral-600">
                                    <span className="font-mono bg-white px-2 py-0.5 rounded border border-neutral-200/50">{evt.time}</span>
                                    <span>{evt.room}</span>
                                </div>
                                <div className="mt-2 text-xs font-bold uppercase tracking-wider opacity-60">
                                    {evt.type}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-neutral-400">
                            <FaCalendarAlt className="mx-auto text-3xl mb-3 opacity-20" />
                            <p>No events scheduled.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherCalendar;
