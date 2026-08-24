import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaVideo, FaThLarge, FaList } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TeacherTimetable = () => {
    const { user } = useAuth();
    const { data } = useData();
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'
    const [selectedDate, setSelectedDate] = useState(new Date());

    const teacherData = data.teacherData?.[user.id] || {};
    const timetable = teacherData.timetable || [];

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getScheduleForDay = (day) => {
        return timetable
            .filter(t => t.day === day)
            .sort((a, b) => new Date(`1970/01/01 ${a.time}`) - new Date(`1970/01/01 ${b.time}`));
    };

    const renderWeekView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {days.map(day => {
                const schedule = getScheduleForDay(day);
                if (schedule.length === 0) return null;

                return (
                    <div key={day} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-bold text-neutral-800 mb-4 border-b border-neutral-100 pb-2">{day}nesday</h3> {/* Assuming standard 3 letter day for now */}
                        <div className="space-y-4">
                            {schedule.map((slot) => (
                                <div
                                    key={slot.id}
                                    onClick={() => navigate(`/teacher/classes/${slot.classId}`)}
                                    className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 cursor-pointer hover:bg-indigo-100 transition group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold px-2 py-1 bg-white text-indigo-600 rounded-md shadow-sm border border-indigo-200">
                                            {slot.time}
                                        </span>
                                        <FaVideo className="text-indigo-300 group-hover:text-indigo-500 transition" />
                                    </div>
                                    <h4 className="font-bold text-neutral-800">{slot.subject}</h4>
                                    <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
                                        <FaMapMarkerAlt /> {slot.room}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const renderMonthView = () => (
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
            <div className="flex gap-8">
                <div className="flex-1">
                    <style>{`
                        .react-calendar { width: 100%; border: none; font-family: inherit; }
                        .react-calendar__tile { padding: 10px; height: 100px; text-align: left; vertical-align: top; }
                        .react-calendar__tile--now { background: #eff6ff; }
                        .react-calendar__tile--active { background: #eef2ff !important; color: inherit !important; border: 2px solid #4f46e5; border-radius: 8px; }
                        .cal-evt { font-size: 10px; padding: 2px 4px; border-radius: 4px; margin-top: 2px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
                    `}</style>
                    <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        tileContent={({ date, view }) => {
                            if (view === 'month') {
                                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                                const evts = timetable.filter(t => t.day === dayName);
                                return (
                                    <div className="mt-1 flex flex-col gap-1">
                                        {evts.map((e, i) => (
                                            <div key={i} className="cal-evt bg-indigo-100 text-indigo-700 font-semibold">
                                                {e.time.split(' ')[0]} {e.subject}
                                            </div>
                                        ))}
                                    </div>
                                );
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-neutral-900">Class Schedule</h1>
                <div className="flex bg-white p-1 rounded-xl border border-neutral-200">
                    <button
                        onClick={() => setViewMode('week')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition ${viewMode === 'week' ? 'bg-indigo-600 text-white shadow' : 'text-neutral-500 hover:bg-neutral-50'}`}
                    >
                        <FaThLarge /> Week View
                    </button>
                    <button
                        onClick={() => setViewMode('month')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition ${viewMode === 'month' ? 'bg-indigo-600 text-white shadow' : 'text-neutral-500 hover:bg-neutral-50'}`}
                    >
                        <FaCalendarAlt /> Month View
                    </button>
                </div>
            </div>

            {viewMode === 'week' ? renderWeekView() : renderMonthView()}

            {timetable.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-neutral-300">
                    <FaCalendarAlt className="mx-auto text-4xl text-neutral-300 mb-4" />
                    <p className="text-neutral-500">No schedule assigned yet.</p>
                </div>
            )}
        </div>
    );
};

export default TeacherTimetable;
