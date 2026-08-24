import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { format } from 'date-fns';
import { FaBullhorn, FaPen, FaPaperPlane } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';

const TeacherNotices = () => {
    const { user } = useAuth();
    const { data, postNotice } = useData();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [targetClass, setTargetClass] = useState('');
    const [loading, setLoading] = useState(false);

    const teacherData = data.teacherData?.[user.id] || {};
    const classes = teacherData.classes || [];
    const myNotices = data.notices?.filter(n => n.authorId === user.id) || [];

    const handlePublish = async (e) => {
        e.preventDefault();
        if (!title || !content || !targetClass) return;

        setLoading(true);
        try {
            postNotice({
                id: Date.now(),
                title,
                content,
                targetClasses: [targetClass],
                authorId: user.id,
                date: new Date().toISOString()
            });

            setTitle('');
            setContent('');
            setTargetClass('');
        } catch (error) {
            console.error('Failed to publish notice:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary mb-2">Notice Board</h1>
                <p className="text-text-muted">Create and manage class notices</p>
            </div>

            {/* Create Notice */}
            <Card>
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-gold/20 rounded-xl flex items-center justify-center">
                        <FaPen className="text-accent-gold" />
                    </div>
                    Draft New Notice
                </h3>
                <form onSubmit={handlePublish} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">Title</label>
                            <Input
                                placeholder="e.g. Assignment Deadline Extended"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">Target Class</label>
                            <select
                                className="w-full px-4 py-2.5 bg-dark-800 text-text-primary rounded-xl border border-dark-700 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all"
                                value={targetClass}
                                onChange={(e) => setTargetClass(e.target.value)}
                                required
                            >
                                <option value="">Select Class...</option>
                                {classes.map(cls => (
                                    <option key={cls.id} value={cls.id}>{cls.name} ({cls.subject})</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                        <textarea
                            className="w-full px-4 py-3 bg-dark-800 text-text-primary rounded-xl border border-dark-700 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 h-32 resize-none transition-all placeholder-text-muted"
                            placeholder="Type your announcement details here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <LoadingSpinner size="sm" centered={false} />
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <FaPaperPlane />
                                    Publish Notice
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Card>

            {/* History */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-text-primary">Published Notices</h3>
                {myNotices.length > 0 ? (
                    <div className="grid gap-4">
                        {myNotices.map((notice) => {
                            const targetClassName = classes.find(c => notice.targetClasses.includes(c.id))?.name || 'Unknown Class';
                            return (
                                <Card key={notice.id} hover>
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-text-primary mb-2">{notice.title}</h4>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-3 py-1 bg-dark-800 rounded-lg text-xs text-text-secondary">
                                                    {targetClassName}
                                                </span>
                                                <span className="text-xs text-text-muted">
                                                    • {format(new Date(notice.date), 'MMM dd, yyyy h:mm a')}
                                                </span>
                                            </div>
                                            <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
                                                {notice.content}
                                            </p>
                                        </div>
                                        <div className="w-10 h-10 bg-accent-gold/20 rounded-xl flex items-center justify-center ml-4 flex-shrink-0">
                                            <FaBullhorn className="text-accent-gold" />
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <EmptyState
                        title="No Notices Published"
                        message="You haven't published any notices yet. Create your first notice above."
                        variant="folder"
                    />
                )}
            </div>
        </div>
    );
};

export default TeacherNotices;
