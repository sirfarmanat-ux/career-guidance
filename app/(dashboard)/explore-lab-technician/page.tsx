'use client';

import { Microscope, BookOpen, TrendingUp, MapPin, ArrowLeft, Star, Heart } from 'lucide-react';
import Link from 'next/link';

export default function ExploreLabTechnicianPage() {
    return (
        <div className="space-y-6">
            {/* Back button */}
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden min-h-[200px] flex items-center"
                style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 40%, #047857 100%)' }}>

                {/* Decorative elements */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute top-8 right-20 w-24 h-24 bg-emerald-300/20 rounded-full blur-xl" />
                <div className="absolute -bottom-8 right-32 w-32 h-32 bg-green-400/20 rounded-full blur-2xl" />

                <div className="relative z-10 flex-1 px-6 py-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <Microscope className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Lab Technician</h1>
                            <p className="text-white/80 text-sm">Science Stream • Beginner Level</p>
                        </div>
                    </div>

                    <p className="text-white/90 text-sm leading-relaxed max-w-lg">
                        Conduct laboratory tests, analyze samples, and support scientific research in medical, environmental, and industrial settings.
                    </p>

                    <div className="flex items-center gap-4 text-white/80 text-sm">
                        <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>Growing Demand</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>Hospitals & Labs</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* About */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">About Lab Technician</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Lab technicians play a crucial role in scientific research and healthcare. They perform complex tests on patient samples,
                            analyze data, maintain laboratory equipment, and ensure accurate results that help doctors diagnose and treat diseases.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            This career offers stability, good work-life balance, and opportunities for specialization in areas like microbiology,
                            chemistry, hematology, or immunology.
                        </p>
                    </div>

                    {/* Skills Required */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Skills Required</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                'Analytical Thinking',
                                'Attention to Detail',
                                'Technical Proficiency',
                                'Data Analysis',
                                'Safety Protocols',
                                'Communication',
                                'Problem Solving',
                                'Quality Control'
                            ].map((skill) => (
                                <div key={skill} className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                    <span className="text-sm text-slate-600">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Career Path */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Career Path</h2>
                        <div className="space-y-4">
                            {[
                                { level: 'Entry Level', title: 'Lab Assistant', salary: '₹2.5-4 LPA', exp: '0-2 years' },
                                { level: 'Mid Level', title: 'Lab Technician', salary: '₹4-7 LPA', exp: '2-5 years' },
                                { level: 'Senior Level', title: 'Senior Lab Technician', salary: '₹7-12 LPA', exp: '5+ years' },
                                { level: 'Specialist', title: 'Lab Supervisor/Manager', salary: '₹12-20 LPA', exp: '8+ years' }
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 bg-slate-50/80 rounded-2xl">
                                    <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-slate-700">{step.title}</p>
                                        <p className="text-xs text-slate-500">{step.level} • {step.exp}</p>
                                    </div>
                                    <span className="text-sm font-bold text-emerald-600">{step.salary}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Education */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="w-5 h-5 text-emerald-600" />
                            <h3 className="text-lg font-bold text-slate-800">Education</h3>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="font-semibold text-slate-700">Degree Required</p>
                                <p className="text-sm text-slate-600">B.Sc. in Medical Lab Technology / Biotechnology / Chemistry</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-700">Duration</p>
                                <p className="text-sm text-slate-600">3 years + 1 year internship</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-700">Certifications</p>
                                <p className="text-sm text-slate-600">DMLT, BMLT, NABL certification</p>
                            </div>
                        </div>
                    </div>

                    {/* Job Opportunities */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Top Employers</h3>
                        <div className="space-y-2">
                            {[
                                'Apollo Hospitals',
                                'Max Healthcare',
                                'AIIMS',
                                'Dr. Lal PathLabs',
                                'SRL Diagnostics',
                                'Government Labs'
                            ].map((employer) => (
                                <div key={employer} className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                    <span className="text-sm text-slate-600">{employer}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Stats</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-600">Average Salary</span>
                                <span className="font-bold text-emerald-600">₹4-6 LPA</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-600">Job Growth</span>
                                <span className="font-bold text-emerald-600">15% annually</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-600">Work Hours</span>
                                <span className="font-bold text-slate-700">8-10 hours/day</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-6 text-white">
                        <h3 className="text-lg font-bold mb-2">Ready to Start?</h3>
                        <p className="text-sm opacity-90 mb-4">Explore colleges offering this course</p>
                        <Link
                            href="/college-directory"
                            className="w-full bg-white/20 backdrop-blur-sm rounded-2xl py-3 text-center font-semibold hover:bg-white/30 transition-colors block"
                        >
                            Find Colleges
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}