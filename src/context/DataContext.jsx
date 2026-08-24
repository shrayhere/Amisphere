import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const INITIAL_DATA = {
    users: [
        // Students (DIP2024STU001 - DIP2024STU010)
        ...Array.from({ length: 10 }, (_, i) => ({
            id: `DIP2024STU00${i + 1}`.slice(-13),
            name: `Student ${i + 1}`,
            role: 'student',
            password: '123',
            email: `student${i + 1}@ami.edu`,
            course: 'Diploma in CS',
            semester: '4th',
            batch: '2024-2027',
            department: 'Computer Science'
        })),
        // Teachers (FAC001 - FAC020)
        ...Array.from({ length: 20 }, (_, i) => ({
            id: `FAC0${i + 1 < 10 ? '0' + (i + 1) : i + 1}`,
            name: `Faculty ${i + 1}`,
            role: 'teacher',
            password: '123',
            email: `faculty${i + 1}@ami.edu`,
            department: 'CSE',
            designation: i < 5 ? 'Senior Professor' : 'Assistant Professor',
            experience: `${i + 2} Years`,
            subjects: ['Data Structures', 'Web Dev', 'Java', 'Python', 'Networking'][i % 5]
        })),
        { id: 'HOD001', name: 'Dr. R.K. Gupta', role: 'hod', password: '123', email: 'hod.cse@ami.edu', department: 'CSE', designation: 'Head of Department' }
    ],
    requests: [],
    examSchedule: [ // Centralized exam schedule
        { id: 1, subject: 'Java Programming', date: '2026-05-10', time: '10:00 AM', room: 'Exam Hall A' },
        { id: 2, subject: 'Web Technologies', date: '2026-05-12', time: '10:00 AM', room: 'Exam Hall B' }
    ],
    examPublished: false,
    studentData: {}, // Populated dynamically below for the demo
    teacherData: {}, // Populated dynamically below for the demo
    // New structures for Teacher Dashboard
    attendanceRegisters: {}, // { classId: { date: { studentId: 'Present' } } }
    notices: [], // [{ id, title, content, targetClasses: [], authorId, date }]
    marks: {}, // { classId: { examId: { studentId: marks } } }
    hodRequests: [], // [{ id, teacherId, type, status, message }]
    timetable: [], // [{ id, day, time, subject, classId, room }]
    notes: [] // [{ id, subject, topic, content, fileUrl, isPublished, authorId }]
};

// Helper to generate rich student data
const generateStudentData = (id) => ({
    attendance: {
        'Java Programming': { present: 45, total: 50, percentage: 90 },
        'Web Technologies': { present: 40, total: 48, percentage: 83 },
        'Data Structures': { present: 38, total: 45, percentage: 84 },
        'Communication Skills': { present: 48, total: 50, percentage: 96 }
    },
    fees: {
        total: 50000,
        paid: 30000,
        pending: 20000,
        nextDueDate: '2026-03-15',
        semester: '4th',
        payments: [
            { date: '2025-08-20', amount: 30000, status: 'Paid', receipt: 'RCP-2025-001' }
        ]
    },
    courses: [
        { code: 'DCS401', name: 'Java Programming', faculty: 'FAC001', credits: 4, schedule: 'Mon, Wed 10:00 AM', room: 'Lab 1' },
        { code: 'DCS402', name: 'Web Technologies', faculty: 'FAC002', credits: 4, schedule: 'Tue, Thu 11:00 AM', room: 'Lab 2' },
        { code: 'DCS403', name: 'Data Structures', faculty: 'FAC003', credits: 3, schedule: 'Fri 09:00 AM', room: 'Room 101' },
        { code: 'DCS404', name: 'Communication Skills', faculty: 'FAC004', credits: 2, schedule: 'Mon 02:00 PM', room: 'Room 102' }
    ],
    exams: {
        upcoming: [
            { subject: 'Java Programming', date: '2026-05-10', time: '10:00 AM', room: 'Exam Hall A' },
            { subject: 'Web Technologies', date: '2026-05-12', time: '10:00 AM', room: 'Exam Hall B' }
        ],
        results: [
            { semester: '3rd', subject: 'C++ Programming', marks: 88, grade: 'A', credits: 4 },
            { semester: '3rd', subject: 'Operating Systems', marks: 75, grade: 'B+', credits: 3 }
        ],
        cgpa: 8.2,
        cgpaHistory: [
            { semester: 'Sem 1', cgpa: 7.8 },
            { semester: 'Sem 2', cgpa: 8.0 },
            { semester: 'Sem 3', cgpa: 8.5 },
            { semester: 'Sem 4', cgpa: 8.2 } // Current projected
        ]
    },
    notifications: [
        { id: 1, title: 'Exam Schedule Released', message: 'Final semester exam dates needed.', date: '2026-01-18', type: 'alert' },
        { id: 2, title: 'Fee Deadline', message: 'Pay remaining fees by March 15th.', date: '2026-01-15', type: 'warning' },
        { id: 3, title: 'Guest Lecture', message: 'AI/ML Webinar on Saturday.', date: '2026-01-10', type: 'info' }
    ],
    facultyGuide: {
        name: 'Mr. Amit Verma',
        email: 'amit.verma@ami.edu',
        office: 'Block A, Room 203',
        hours: 'Mon-Fri, 3PM - 5PM'
    },
    summerSemester: {
        eligible: true,
        coursesAvailable: ['Advanced Python', 'Cyber Security'],
        status: 'Not Enrolled'
    }
});

// Helper to generate rich teacher data
const generateTeacherData = (id) => ({
    salary: {
        basic: 45000,
        allowance: 15000,
        total: 60000,
        history: [
            { month: 'December 2025', amount: 60000, status: 'Credited', date: '2025-12-31' },
            { month: 'November 2025', amount: 60000, status: 'Credited', date: '2025-11-30' }
        ]
    },
    classes: [
        { id: 'C1', name: 'B.Tech CSE 2nd Yr', subject: 'Data Structures', students: 60, time: '10:00 AM' },
        { id: 'C2', name: 'Diploma CS 3rd Yr', subject: 'Web Dev', students: 45, time: '02:00 PM' }
    ],
    exams: {
        invigilation: [
            { date: '2026-05-10', time: '10:00 AM', room: 'Block A-202' },
            { date: '2026-05-15', time: '02:00 PM', room: 'Block B-105' }
        ],
        evaluation: {
            pending: 15,
            completed: 120,
            subject: 'Data Structures Mid-Term'
        }
    },
    timetable: [
        { id: 1, day: 'Mon', time: '10:00 AM', subject: 'Data Structures', classId: 'C1', room: 'Lab 1' },
        { id: 2, day: 'Mon', time: '02:00 PM', subject: 'Web Dev', classId: 'C2', room: 'Lab 2' },
        { id: 3, day: 'Wed', time: '10:00 AM', subject: 'Data Structures', classId: 'C1', room: 'Lab 1' },
        { id: 4, day: 'Thu', time: '02:00 PM', subject: 'Web Dev', classId: 'C2', room: 'Lab 2' },
        { id: 5, day: 'Fri', time: '09:00 AM', subject: 'Data Structures', classId: 'C1', room: 'Room 101' }
    ]
});

// Populate the lookups
INITIAL_DATA.users.forEach(u => {
    if (u.role === 'student') {
        INITIAL_DATA.studentData[u.id] = generateStudentData(u.id);
    } else if (u.role === 'teacher') {
        INITIAL_DATA.teacherData[u.id] = generateTeacherData(u.id);
    }
});

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem('amisphere_db');
        const parsed = saved ? JSON.parse(saved) : INITIAL_DATA;

        // Ensure critical data structures exist even if loading from stale local storage
        if (!parsed.teacherData || Object.keys(parsed.teacherData).length === 0) {
            parsed.teacherData = INITIAL_DATA.teacherData;
        }
        if (!parsed.studentData || Object.keys(parsed.studentData).length === 0) {
            parsed.studentData = INITIAL_DATA.studentData;
        }
        // Initialize new arrays if missing
        if (!parsed.notes) parsed.notes = [];
        if (!parsed.timetable) parsed.timetable = [];

        return parsed;
    });

    useEffect(() => {
        localStorage.setItem('amisphere_db', JSON.stringify(data));
    }, [data]);

    const addRequest = (req) => {
        setData(prev => ({
            ...prev,
            requests: [req, ...prev.requests]
        }));
    };

    const updateRequestStatus = (reqId, newStatus, comment = '') => {
        setData(prev => ({
            ...prev,
            requests: prev.requests.map(r =>
                r.id === reqId
                    ? { ...r, status: newStatus, comment, updatedAt: new Date().toISOString() }
                    : r
            )
        }));
    };

    // Global Exam Schedule Management
    const addExam = (exam) => {
        setData(prev => ({
            ...prev,
            examSchedule: [...(prev.examSchedule || []), exam]
        }));
    };

    const updateExam = (updatedExam) => {
        setData(prev => ({
            ...prev,
            examSchedule: (prev.examSchedule || []).map(e => e.id === updatedExam.id ? updatedExam : e)
        }));
    };

    const deleteExam = (examId) => {
        setData(prev => ({
            ...prev,
            examSchedule: (prev.examSchedule || []).filter(e => e.id !== examId)
        }));
    };

    const publishExams = () => {
        setData(prev => ({
            ...prev,
            examPublished: true
        }));
    };

    // Teacher Dashboard Actions
    const updateAttendance = (classId, date, attendanceMap) => {
        setData(prev => ({
            ...prev,
            attendanceRegisters: {
                ...prev.attendanceRegisters,
                [classId]: {
                    ...(prev.attendanceRegisters?.[classId] || {}),
                    [date]: attendanceMap
                }
            }
        }));
    };

    const postNotice = (notice) => {
        setData(prev => ({
            ...prev,
            notices: [notice, ...prev.notices]
        }));
    };

    const updateMarks = (classId, examId, marksMap) => {
        setData(prev => ({
            ...prev,
            marks: {
                ...prev.marks,
                [classId]: {
                    ...(prev.marks?.[classId] || {}),
                    [examId]: marksMap
                }
            }
        }));
    };

    const sendHODRequest = (req) => {
        setData(prev => ({
            ...prev,
            hodRequests: [req, ...prev.hodRequests]
        }));
    };

    const addNote = (note) => {
        setData(prev => ({
            ...prev,
            notes: [note, ...prev.notes]
        }));
    };

    const publishNote = (noteId) => {
        setData(prev => ({
            ...prev,
            notes: prev.notes.map(n => n.id === noteId ? { ...n, isPublished: true } : n)
        }));
    };

    return (
        <DataContext.Provider value={{
            data,
            addRequest,
            updateRequestStatus,
            addExam,
            updateExam,
            deleteExam,
            publishExams,
            updateAttendance,
            postNotice,
            updateMarks,
            sendHODRequest,
            addNote,
            publishNote
        }}>
            {children}
        </DataContext.Provider>
    );
};
