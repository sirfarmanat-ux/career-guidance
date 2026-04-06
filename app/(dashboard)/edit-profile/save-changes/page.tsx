'use client';

import { useState, useEffect } from 'react';
import { Save, Clock, History, RotateCcw, CheckCircle, AlertCircle, Loader2, Eye, Download, Upload, Trash2, Calendar, User, Edit3 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface ProfileChange {
    id: string;
    field: string;
    old_value: string;
    new_value: string;
    timestamp: string;
    status: 'draft' | 'saved' | 'pending';
}

interface ProfileDraft {
    id: string;
    data: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export default function SaveChangesPage() {
    const [activeTab, setActiveTab] = useState<'drafts' | 'history' | 'auto-save'>('drafts');
    const [drafts, setDrafts] = useState<ProfileDraft[]>([]);
    const [changes, setChanges] = useState<ProfileChange[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
    const [lastAutoSave, setLastAutoSave] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const router = useRouter();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            // Load drafts and changes from localStorage for demo
            // In a real app, this would come from the database
            const savedDrafts = localStorage.getItem('profile_drafts');
            const savedChanges = localStorage.getItem('profile_changes');
            const autoSaveSetting = localStorage.getItem('auto_save_enabled');
            const lastSave = localStorage.getItem('last_auto_save');

            if (savedDrafts) {
                setDrafts(JSON.parse(savedDrafts));
            }

            if (savedChanges) {
                setChanges(JSON.parse(savedChanges));
            }

            if (autoSaveSetting !== null) {
                setAutoSaveEnabled(JSON.parse(autoSaveSetting));
            }

            if (lastSave) {
                setLastAutoSave(lastSave);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveDraft = async () => {
        setSaving(true);
        try {
            // Get current profile data from the main edit page
            const currentProfile = JSON.parse(localStorage.getItem('current_profile') || '{}');

            const newDraft: ProfileDraft = {
                id: Date.now().toString(),
                data: currentProfile,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const updatedDrafts = [newDraft, ...drafts];
            setDrafts(updatedDrafts);
            localStorage.setItem('profile_drafts', JSON.stringify(updatedDrafts));

            setMessage({ type: 'success', text: 'Draft saved successfully!' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save draft' });
        } finally {
            setSaving(false);
        }
    };

    const deleteDraft = async (draftId: string) => {
        const updatedDrafts = drafts.filter(d => d.id !== draftId);
        setDrafts(updatedDrafts);
        localStorage.setItem('profile_drafts', JSON.stringify(updatedDrafts));
        setMessage({ type: 'success', text: 'Draft deleted successfully!' });
        setTimeout(() => setMessage(null), 3000);
    };

    const applyDraft = async (draft: ProfileDraft) => {
        localStorage.setItem('current_profile', JSON.stringify(draft.data));
        setMessage({ type: 'success', text: 'Draft applied successfully!' });
        setTimeout(() => setMessage(null), 3000);
        router.push('/edit-profile');
    };

    const toggleAutoSave = () => {
        const newValue = !autoSaveEnabled;
        setAutoSaveEnabled(newValue);
        localStorage.setItem('auto_save_enabled', JSON.stringify(newValue));
    };

    const exportProfile = () => {
        const profileData = localStorage.getItem('current_profile') || '{}';
        const dataStr = JSON.stringify(JSON.parse(profileData), null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'profile_backup.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const importProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target?.result as string);
                    localStorage.setItem('current_profile', JSON.stringify(importedData));
                    setMessage({ type: 'success', text: 'Profile imported successfully!' });
                    setTimeout(() => setMessage(null), 3000);
                } catch (error) {
                    setMessage({ type: 'error', text: 'Invalid file format' });
                }
            };
            reader.readAsText(file);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                    <span className="text-slate-600">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#E8ECF5] p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/edit-profile"
                            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Back to Edit Profile
                        </Link>
                        <div className="h-6 w-px bg-slate-300" />
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Save & Change Management</h1>
                            <p className="text-slate-600">Manage your profile drafts, changes, and auto-save settings</p>
                        </div>
                    </div>
                </div>

                {/* Message */}
                {message && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success'
                            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                            : 'bg-rose-50 border border-rose-200 text-rose-800'
                        }`}>
                        {message.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        ) : (
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        )}
                        <span className="font-medium">{message.text}</span>
                    </div>
                )}

                {/* Tabs */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/80">
                    <div className="flex gap-1 mb-6">
                        {[
                            { id: 'drafts', label: 'Drafts', icon: Save },
                            { id: 'history', label: 'Change History', icon: History },
                            { id: 'auto-save', label: 'Auto-Save Settings', icon: Clock }
                        ].map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id
                                            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-700'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'drafts' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-slate-800">Profile Drafts</h3>
                                <button
                                    onClick={saveDraft}
                                    disabled={saving}
                                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white px-4 py-2 rounded-xl font-medium transition-colors disabled:cursor-not-allowed"
                                >
                                    {saving ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    Save Current Draft
                                </button>
                            </div>

                            {drafts.length === 0 ? (
                                <div className="text-center py-12">
                                    <Save className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <h4 className="text-lg font-medium text-slate-600 mb-2">No drafts saved yet</h4>
                                    <p className="text-slate-500">Save your current profile changes as a draft to access them later.</p>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {drafts.map((draft) => (
                                        <div key={draft.id} className="bg-slate-50/80 rounded-xl p-4 border border-slate-200">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                                                        <Save className="w-5 h-5 text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-slate-800">Draft #{draft.id}</h4>
                                                        <p className="text-sm text-slate-500">
                                                            Created: {new Date(draft.created_at).toLocaleDateString()} at {new Date(draft.created_at).toLocaleTimeString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => applyDraft(draft)}
                                                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        Apply
                                                    </button>
                                                    <button
                                                        onClick={() => deleteDraft(draft.id)}
                                                        className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="text-sm text-slate-600">
                                                <span className="font-medium">Fields:</span> {Object.keys(draft.data).join(', ')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-slate-800">Change History</h3>

                            {changes.length === 0 ? (
                                <div className="text-center py-12">
                                    <History className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <h4 className="text-lg font-medium text-slate-600 mb-2">No changes recorded</h4>
                                    <p className="text-slate-500">Your profile change history will appear here.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {changes.map((change) => (
                                        <div key={change.id} className="bg-slate-50/80 rounded-xl p-4 border border-slate-200">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${change.status === 'saved' ? 'bg-emerald-100 text-emerald-600' :
                                                            change.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                                                                'bg-slate-100 text-slate-600'
                                                        }`}>
                                                        {change.status === 'saved' ? <CheckCircle className="w-4 h-4" /> :
                                                            change.status === 'pending' ? <Clock className="w-4 h-4" /> :
                                                                <Edit3 className="w-4 h-4" />}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-slate-800 capitalize">{change.field.replace('_', ' ')}</h4>
                                                        <p className="text-sm text-slate-500">
                                                            {new Date(change.timestamp).toLocaleDateString()} at {new Date(change.timestamp).toLocaleTimeString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${change.status === 'saved' ? 'bg-emerald-100 text-emerald-700' :
                                                        change.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                            'bg-slate-100 text-slate-700'
                                                    }`}>
                                                    {change.status}
                                                </span>
                                            </div>
                                            <div className="text-sm text-slate-600">
                                                <span className="font-medium">Changed:</span> "{change.old_value}" → "{change.new_value}"
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'auto-save' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-slate-800">Auto-Save Settings</h3>

                            <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h4 className="font-medium text-slate-800 mb-1">Auto-Save Profile Changes</h4>
                                        <p className="text-sm text-slate-600">Automatically save your profile changes as you type</p>
                                    </div>
                                    <button
                                        onClick={toggleAutoSave}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoSaveEnabled ? 'bg-indigo-600' : 'bg-slate-300'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoSaveEnabled ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>

                                {lastAutoSave && (
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Clock className="w-4 h-4" />
                                        Last auto-saved: {new Date(lastAutoSave).toLocaleString()}
                                    </div>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Download className="w-5 h-5 text-indigo-600" />
                                        <h4 className="font-medium text-slate-800">Export Profile</h4>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-4">Download your profile data as a JSON file for backup</p>
                                    <button
                                        onClick={exportProfile}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                                    >
                                        Export Profile Data
                                    </button>
                                </div>

                                <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Upload className="w-5 h-5 text-emerald-600" />
                                        <h4 className="font-medium text-slate-800">Import Profile</h4>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-4">Upload a previously exported profile JSON file</p>
                                    <label className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-medium transition-colors cursor-pointer block text-center">
                                        <input
                                            type="file"
                                            accept=".json"
                                            onChange={importProfile}
                                            className="hidden"
                                        />
                                        Import Profile Data
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}