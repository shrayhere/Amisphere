import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaEdit, FaSave, FaTrash, FaPlus, FaBullhorn, FaCheckCircle, FaLock } from 'react-icons/fa';

const ExamSchedule = ({ exams = [], isPublished, onPublish, onSave, onDelete, onAdd }) => {
    const { user } = useAuth();
    const isHOD = user.role === 'hod';
    const isTeacher = user.role === 'teacher';
    const isStudent = user.role === 'student';

    // Permission: Only HOD/Teacher can edit. 
    const canEdit = isHOD || isTeacher;

    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newExam, setNewExam] = useState({ subject: '', date: '', time: '', room: '' });

    // Handle Student View when NOT published
    if (isStudent && !isPublished) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400 mb-4">
                    <FaLock size={24} />
                </div>
                <h3 className="font-bold text-neutral-800 text-lg">Datesheet Unavailable</h3>
                <p className="text-neutral-500 max-w-xs mx-auto">The examination schedule is currently being finalized by the department. Please check back later.</p>
            </div>
        );
    }

    // Handlers
    const handleEditClick = (exam) => {
        setEditingId(exam.id);
        setEditForm(exam);
    };

    const handleSaveClick = () => {
        onSave(editForm);
        setEditingId(null);
    };

    const handleAddClick = () => {
        onAdd({ ...newExam, id: Date.now() });
        setIsAdding(false);
        setNewExam({ subject: '', date: '', time: '', room: '' });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-100 flex flex-col sm:flex-row justify-between items-center bg-neutral-50/50 gap-4">
                <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-neutral-800">Exam Datesheet</h3>
                    {isPublished && (
                        <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                            <FaCheckCircle /> Published
                        </span>
                    )}
                    {!isPublished && canEdit && (
                        <span className="text-xs font-bold px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full flex items-center gap-1">
                            Draft Mode
                        </span>
                    )}
                </div>

                <div className="flex gap-2">
                    {/* HOD Publish Action */}
                    {isHOD && !isPublished && (
                        <button
                            onClick={onPublish}
                            className="flex items-center gap-2 px-4 py-1.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 shadow-lg shadow-green-200 transition-all"
                        >
                            <FaBullhorn size={12} /> Publish to Students
                        </button>
                    )}

                    {canEdit && !isAdding && (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            <FaPlus size={12} /> Add Exam
                        </button>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-50 text-neutral-500 font-semibold uppercase tracking-wider border-b border-neutral-100">
                        <tr>
                            <th className="px-6 py-4">Subject</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Time</th>
                            <th className="px-6 py-4">Room</th>
                            {canEdit && <th className="px-6 py-4 text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {/* Add Row */}
                        {isAdding && (
                            <tr className="bg-indigo-50/50">
                                <td className="px-6 py-4">
                                    <input
                                        className="w-full p-2 border border-neutral-300 rounded"
                                        placeholder="Subject"
                                        value={newExam.subject}
                                        onChange={e => setNewExam({ ...newExam, subject: e.target.value })}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <input
                                        type="date"
                                        className="w-full p-2 border border-neutral-300 rounded"
                                        value={newExam.date}
                                        onChange={e => setNewExam({ ...newExam, date: e.target.value })}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <input
                                        type="time"
                                        className="w-full p-2 border border-neutral-300 rounded"
                                        value={newExam.time}
                                        onChange={e => setNewExam({ ...newExam, time: e.target.value })}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <input
                                        className="w-full p-2 border border-neutral-300 rounded"
                                        placeholder="Room"
                                        value={newExam.room}
                                        onChange={e => setNewExam({ ...newExam, room: e.target.value })}
                                    />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={handleAddClick} className="text-green-600 hover:text-green-800"><FaSave size={18} /></button>
                                        <button onClick={() => setIsAdding(false)} className="text-red-500 hover:text-red-700">Cancel</button>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {exams.length === 0 && !isAdding && (
                            <tr>
                                <td colSpan={canEdit ? 5 : 4} className="px-6 py-8 text-center text-neutral-400">
                                    No exams scheduled yet.
                                </td>
                            </tr>
                        )}

                        {exams.map((exam) => (
                            <tr key={exam.id} className="hover:bg-neutral-50 transition-colors">
                                {editingId === exam.id ? (
                                    <>
                                        <td className="px-6 py-4">
                                            <input
                                                className="w-full p-1 border border-neutral-300 rounded"
                                                value={editForm.subject}
                                                onChange={e => setEditForm({ ...editForm, subject: e.target.value })}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="date"
                                                className="w-full p-1 border border-neutral-300 rounded"
                                                value={editForm.date}
                                                onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="time"
                                                className="w-full p-1 border border-neutral-300 rounded"
                                                value={editForm.time}
                                                onChange={e => setEditForm({ ...editForm, time: e.target.value })}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                className="w-full p-1 border border-neutral-300 rounded"
                                                value={editForm.room}
                                                onChange={e => setEditForm({ ...editForm, room: e.target.value })}
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={handleSaveClick} className="text-green-600 hover:text-green-800"><FaSave /></button>
                                                <button onClick={() => setEditingId(null)} className="text-neutral-500 hover:text-neutral-700">Cancel</button>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="px-6 py-4 font-medium text-neutral-800">{exam.subject}</td>
                                        <td className="px-6 py-4 text-neutral-600">{exam.date}</td>
                                        <td className="px-6 py-4 text-neutral-600">{exam.time}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-bold bg-white border border-neutral-200 px-2 py-1 rounded text-neutral-600">
                                                {exam.room}
                                            </span>
                                        </td>
                                        {canEdit && (
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-3 text-neutral-400">
                                                    <button onClick={() => handleEditClick(exam)} className="hover:text-indigo-600 transition-colors"><FaEdit /></button>
                                                    <button onClick={() => onDelete(exam.id)} className="hover:text-red-500 transition-colors"><FaTrash /></button>
                                                </div>
                                            </td>
                                        )}
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExamSchedule;
