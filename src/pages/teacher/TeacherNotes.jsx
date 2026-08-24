import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FaFileUpload, FaMagic, FaSpinner, FaEye, FaCheckCircle, FaBookOpen, FaFilePdf } from 'react-icons/fa';

const TeacherNotes = () => {
    const { user } = useAuth();
    const { data, addNote, publishNote } = useData();

    // State
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [file, setFile] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0); // Progress bar state
    const [generatedContent, setGeneratedContent] = useState(null);
    const fileInputRef = useRef(null);

    const teacherData = data.teacherData?.[user.id] || {};
    const subjects = teacherData.subjects ? [teacherData.subjects] : (teacherData.classes?.map(c => c.subject) || []);
    const uniqueSubjects = [...new Set(subjects)];

    // My Notes
    const myNotes = data.notes.filter(n => n.authorId === user.id);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setProgress(0);
            setGeneratedContent(null);
        }
    };

    const handleGenerate = () => {
        if (!subject || !topic || !file) return;

        setIsGenerating(true);
        setProgress(10);

        // Simulate reading the file
        setTimeout(() => setProgress(40), 500);
        setTimeout(() => setProgress(70), 1200);

        // Mock AI completion
        setTimeout(() => {
            const mockAIContent = {
                summary: `Analysis of ${file.name}: The document provides a comprehensive overview of ${topic} within the context of ${subject}. It emphasizes the fundamental theories and provides practical examples relevant to the curriculum.`,
                points: [
                    "Key Concept 1 extracted from page 1.",
                    "Important definition found on page 2.",
                    "Summary of the main argument presented in the introduction.",
                    "Critical data points mentioned in the conclusion."
                ],
                questions: [
                    "Based on the text, define the core principle of this topic.",
                    "How does the author describe the relationship between X and Y?",
                    "What are the three main components listed in the second section?"
                ]
            };
            setGeneratedContent(mockAIContent);
            setIsGenerating(false);
            setProgress(100);
        }, 2500);
    };

    const handleSave = () => {
        if (!generatedContent) return;

        addNote({
            id: Date.now(),
            subject,
            topic,
            content: generatedContent,
            fileName: file.name,
            isPublished: false,
            authorId: user.id,
            date: new Date().toISOString()
        });

        // Reset
        setTopic('');
        setFile(null);
        setGeneratedContent(null);
        setProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = "";

        alert('Notes saved to Library!');
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
                <FaBookOpen className="text-indigo-600" /> Smart Notes Generator
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Input Area */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-6">Upload & Process</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Subject</label>
                                <select
                                    className="w-full p-3 border border-neutral-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                >
                                    <option value="">Select Subject...</option>
                                    {uniqueSubjects.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Topic Name</label>
                                <input
                                    className="w-full p-3 border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    placeholder="e.g. Thermodynamics Intro"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Source Material (PDF)</label>
                                <div className="border border-dashed border-neutral-300 rounded-xl p-4 text-center hover:bg-neutral-50 transition">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="pdf-upload"
                                    />
                                    <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center gap-2">
                                        <FaFilePdf className="text-3xl text-neutral-400" />
                                        <span className="text-sm text-neutral-600 font-medium">
                                            {file ? file.name : "Click to upload PDF"}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            {(isGenerating || progress > 0) && (
                                <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            )}

                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating || !file || !subject || !topic}
                                className={`w-full py-4 rounded-xl font-bold text-white flex justify-center items-center gap-2 transition shadow-lg
                                    ${isGenerating || !file || !subject || !topic
                                        ? 'bg-neutral-300 cursor-not-allowed text-neutral-500 shadow-none'
                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-200'
                                    }`}
                            >
                                {isGenerating ? <><FaSpinner className="animate-spin" /> Analyzing PDF...</> : <><FaMagic /> Extract & Generate</>}
                            </button>
                        </div>
                    </div>

                    {/* Published List */}
                    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-4">Your Library</h3>
                        <div className="space-y-3">
                            {myNotes.length === 0 ? <p className="text-neutral-400 text-sm">No notes generated yet.</p> :
                                myNotes.map(note => (
                                    <div key={note.id} className="p-4 border border-neutral-100 rounded-xl hover:bg-neutral-50 transition flex justify-between items-center group">
                                        <div>
                                            <h4 className="font-bold text-neutral-800">{note.topic}</h4>
                                            <p className="text-xs text-neutral-500">{note.subject} • {note.isPublished ? <span className="text-green-600 font-bold">Published</span> : 'Draft'}</p>
                                        </div>
                                        {!note.isPublished && (
                                            <button
                                                onClick={() => publishNote(note.id)}
                                                className="text-xs bg-black text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition hover:bg-neutral-800"
                                            >
                                                Publish
                                            </button>
                                        )}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* Right: Preview Area */}
                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 min-h-[600px] flex flex-col relative">
                    {!generatedContent ? (
                        <div className="m-auto text-center text-neutral-400">
                            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                <FaMagic />
                            </div>
                            <p>Upload a PDF to see AI-generated insights.</p>
                        </div>
                    ) : (
                        <div className="space-y-6 flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="border-b border-neutral-200 pb-4">
                                <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">Extracted Summary</span>
                                <h2 className="text-2xl font-bold mt-1 text-neutral-900">{topic}</h2>
                                <p className="text-neutral-600 mt-2 leading-relaxed italic border-l-4 border-indigo-200 pl-4">{generatedContent.summary}</p>
                            </div>

                            <div>
                                <h4 className="font-bold text-neutral-800 mb-3">Key Takeaways</h4>
                                <ul className="space-y-2">
                                    {generatedContent.points.map((pt, i) => (
                                        <li key={i} className="flex gap-3 text-neutral-700 bg-white p-3 rounded-lg border border-neutral-100 shadow-sm">
                                            <span className="flex-shrink-0 w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                                            {pt}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold text-neutral-800 mb-3">Generated Quiz</h4>
                                <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100 space-y-3">
                                    {generatedContent.questions.map((q, i) => (
                                        <p key={i} className="text-sm text-indigo-900 font-medium">Q{i + 1}: {q}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {generatedContent && (
                        <div className="sticky bottom-0 pt-6 mt-6 border-t border-neutral-200 bg-neutral-50/95 backdrop-blur">
                            <button
                                onClick={handleSave}
                                className="w-full py-3 bg-neutral-900 text-white rounded-xl font-bold hover:bg-black transition flex justify-center items-center gap-2"
                            >
                                <FaCheckCircle /> Save Notes to Library
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherNotes;
