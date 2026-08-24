import React, { useState } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    addYears,
    subYears
} from 'date-fns';
import { FaChevronLeft, FaChevronRight, FaGoogle, FaSync } from 'react-icons/fa';

const CalendarView = ({ events = [], type = 'month' }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSynced, setLastSynced] = useState(null);

    // Calendar Navigation
    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const nextYear = () => setCurrentDate(addYears(currentDate, 1));
    const prevYear = () => setCurrentDate(subYears(currentDate, 1));

    // Determine view range
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Handle Sync
    const handleSync = () => {
        setIsSyncing(true);
        // Simulate API call
        setTimeout(() => {
            setIsSyncing(false);
            setLastSynced(new Date());
        }, 2000);
    };

    // Helper to find events for a day
    const getEventsForDay = (day) => {
        // This is a naive check. In a real app, we'd parse the complex schedule strings ("Mon, Wed 10:00 AM")
        // or use a structured event object. 
        // For this demo, we'll map the "schedule" text Days to the current view.

        // Day Name Short (e.g. "Mon")
        const dayName = format(day, 'EEE');

        return events.filter(event =>
            event.schedule && event.schedule.includes(dayName)
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-neutral-100 flex flex-col sm:flex-row justify-between items-center bg-neutral-50/50 gap-4">
                <div className="flex items-center gap-4">
                    <h3 className="font-bold text-lg text-neutral-800">
                        {format(currentDate, 'MMMM yyyy')}
                    </h3>
                    <div className="flex gap-1">
                        <button onClick={prevMonth} className="p-1 hover:bg-neutral-200 rounded text-neutral-600">
                            <FaChevronLeft size={14} />
                        </button>
                        <button onClick={nextMonth} className="p-1 hover:bg-neutral-200 rounded text-neutral-600">
                            <FaChevronRight size={14} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSync}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isSyncing
                                ? 'bg-blue-100 text-blue-700 cursor-wait'
                                : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                            }`}
                    >
                        {isSyncing ? <FaSync className="animate-spin" /> : <FaGoogle className={lastSynced ? "text-green-500" : ""} />}
                        {isSyncing ? 'Syncing...' : lastSynced ? 'Synced' : 'Sync Calendar'}
                    </button>
                    {lastSynced && (
                        <span className="text-xs text-neutral-400 hidden sm:block">
                            Updated {format(lastSynced, 'HH:mm')}
                        </span>
                    )}
                </div>
            </div>

            {/* Week Header */}
            <div className="grid grid-cols-7 border-b border-neutral-100 bg-neutral-50 text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                {weekDays.map(day => (
                    <div key={day} className="py-2 text-center">{day}</div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 auto-rows-fr bg-neutral-200 gap-[1px]">
                {calendarDays.map((day, idx) => {
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isToday = isSameDay(day, new Date());
                    const dayEvents = isCurrentMonth ? getEventsForDay(day) : [];

                    return (
                        <div
                            key={day.toISOString()}
                            className={`min-h-[100px] bg-white p-2 flex flex-col gap-1 transition-colors ${!isCurrentMonth ? 'bg-neutral-50/50 text-neutral-400' : 'hover:bg-indigo-50/10'
                                }`}
                        >
                            <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-indigo-600 text-white' : ''
                                }`}>
                                {format(day, 'd')}
                            </span>

                            <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
                                {dayEvents.map((event, i) => (
                                    <div
                                        key={i}
                                        className="text-[10px] p-1 rounded bg-indigo-50 border border-indigo-100 text-indigo-700 truncate font-medium"
                                        title={`${event.name} (${event.schedule})`}
                                    >
                                        {event.code?.slice(-3) || 'CLS'} - {event.name?.substring(0, 10)}...
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarView;
