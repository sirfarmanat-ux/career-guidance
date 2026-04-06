'use client';

import { HeartPulse, Stethoscope, Microscope, ArrowLeft, Star, BookOpen, TrendingUp, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ExploreMedicalProfessionalPage() {
    return (
        <div className="space-y-6">
            {/* Back button */}
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden min-h-[200px] flex items-center"
                style={{ background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 40%, #B91C1C 100%)' }}>

                {/* Decorative elements */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute top-8 right-20 w-24 h-24 bg-red-300/20 rounded-full blur-xl" />
                <div className="absolute -bottom-8 right-32 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl" />

                <div className="relative z-10 flex-1 px-6 py-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <HeartPulse className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Medical Professional</h1>
                            <p className="text-white/80 text-sm">Science Stream • Expert Level</p>
                        </div>
                    </div>

                    <p className="text-white/90 text-sm leading-relaxed max-w-lg">
                        Provide healthcare services, diagnose illnesses, perform surgeries, and improve patient outcomes in various medical specialties.
                    </p>

                    <div className="flex items-center gap-4 text-white/80 text-sm">
                        <div className="flex items-center gap-1">
                            <HeartPulse className="w-4 h-4" />
                            <span>Life Saving</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>Always in Demand</span>
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
                        <h2 className="text-xl font-bold text-slate-800 mb-4">About Medical Professionals</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Medical professionals are dedicated healthcare providers who diagnose, treat, and prevent diseases. This broad field includes
                            doctors, surgeons, nurses, pharmacists, and other specialists who work together to maintain and improve patient health.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Medical careers offer the opportunity to make a real difference in people's lives, with excellent job security, competitive
                            salaries, and continuous learning opportunities in various specialties.
                        </p>
                    </div>

                    {/* Specializations */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Popular Specializations</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { name: 'General Medicine', icon: Stethoscope, desc: 'Primary healthcare and diagnosis' },
                                { name: 'Surgery', icon: HeartPulse, desc: 'Surgical procedures and operations' },
                                { name: 'Pediatrics', icon: HeartPulse, desc: 'Child healthcare and development' },
                                { name: 'Cardiology', icon: HeartPulse, desc: 'Heart and cardiovascular health' },
                                { name: 'Neurology', icon: Microscope, desc: 'Brain and nervous system' },
                                { name: 'Orthopedics', icon: HeartPulse, desc: 'Bones, joints, and muscles' },
                                { name: 'Gynecology', icon: HeartPulse, desc: 'Women\'s health and maternity' },
                                { name: 'Dermatology', icon: HeartPulse, desc: 'Skin and cosmetic treatments' }
                            ].map((spec) => (
                                <div key={spec.name} className="flex items-start gap-3 p-3 bg-slate-50/80 rounded-2xl">
                                    <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <spec.icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-700 text-sm">{spec.name}</p>
                                        <p className="text-xs text-slate-500">{spec.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Career Path */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Career Path</h2>
                        <div className="space-y-4">
                            {[
                                { level: 'Foundation', title: 'MBBS Graduate', salary: '₹6-8 LPA', exp: 'Fresh graduate' },
                                { level: 'Training', title: 'Internship/Residency', salary: '₹8-12 LPA', exp: '1-3 years' },
                                { level: 'Specialist', title: 'MD/MS/DNB', salary: '₹12-25 LPA', exp: '3-5 years' },
                                { level: 'Senior', title: 'Consultant/Senior Doctor', salary: '₹25-50 LPA', exp: '5+ years' }
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 bg-slate-50/80 rounded-2xl">
                                    <div className="w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-slate-700">{step.title}</p>
                                        <p className="text-xs text-slate-500">{step.level} • {step.exp}</p>
                                    </div>
                                    <span className="text-sm font-bold text-red-600">{step.salary}</span>
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
                            <BookOpen className="w-5 h-5 text-red-600" />
                            <h3 className="text-lg font-bold text-slate-800">Education</h3>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="font-semibold text-slate-700">Degree Required</p>
                                <p className="text-sm text-slate-600">MBBS / BDS / BAMS / BHMS</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-700">Duration</p>
                                <p className="text-sm text-slate-600">5.5 years (including internship)</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-700">Exams</p>
                                <p className="text-sm text-slate-600">NEET-UG, NEET-PG, USMLE</p>
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
                                'Fortis Healthcare',
                                'Medanta',
                                'Government Hospitals',
                                'Private Clinics',
                                'Medical Colleges'
                            ].map((employer) => (
                                <div key={employer} className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full" />
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
                                <span className="font-bold text-red-600">₹8-15 LPA</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-600">Job Growth</span>
                                <span className="font-bold text-red-600">18% annually</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-600">Work Hours</span>
                                <span className="font-bold text-slate-700">10-12 hours/day</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl p-6 text-white">
                        <h3 className="text-lg font-bold mb-2">Start Your Journey</h3>
                        <p className="text-sm opacity-90 mb-4">Find medical colleges and courses</p>
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