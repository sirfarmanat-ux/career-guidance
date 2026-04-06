'use client';

import { Code, Database, Globe, Gamepad2, ArrowLeft, Star, Heart, Cpu, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function ExploreSoftwareDeveloperPage() {
    return (
        <div className="space-y-6">
            {/* Back button */}
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden min-h-[200px] flex items-center"
                style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 40%, #1E40AF 100%)' }}>

                {/* Decorative elements */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute top-8 right-20 w-24 h-24 bg-blue-300/20 rounded-full blur-xl" />
                <div className="absolute -bottom-8 right-32 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl" />

                <div className="relative z-10 flex-1 px-6 py-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <Code className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Software Developer</h1>
                            <p className="text-white/80 text-sm">Science Stream • Advanced Level</p>
                        </div>
                    </div>

                    <p className="text-white/90 text-sm leading-relaxed max-w-lg">
                        Design, develop, and maintain software applications using programming languages, frameworks, and modern development practices.
                    </p>

                    <div className="flex items-center gap-4 text-white/80 text-sm">
                        <div className="flex items-center gap-1">
                            <Cpu className="w-4 h-4" />
                            <span>High Demand</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            <span>Remote Work</span>
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
                        <h2 className="text-xl font-bold text-slate-800 mb-4">About Software Developer</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Software developers are the architects of the digital world. They write code, build applications, solve complex problems,
                            and create solutions that power businesses and improve lives. From mobile apps to enterprise systems, software developers
                            work across industries and technologies.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            This career offers excellent growth opportunities, competitive salaries, and the chance to work on cutting-edge technologies
                            like AI, blockchain, cloud computing, and more.
                        </p>
                    </div>

                    {/* Skills Required */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Skills Required</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                'Programming Languages',
                                'Problem Solving',
                                'Data Structures & Algorithms',
                                'Version Control (Git)',
                                'Database Management',
                                'API Development',
                                'Testing & Debugging',
                                'Agile Methodology'
                            ].map((skill) => (
                                <div key={skill} className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                    <span className="text-sm text-slate-600">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tools & Technologies */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Tools & Technologies</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-slate-700 mb-2">Programming Languages</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['JavaScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust'].map((lang) => (
                                        <span key={lang} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-700 mb-2">Frameworks & Libraries</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'Angular', 'Vue.js', 'Node.js', 'Django', 'Spring', 'Express.js'].map((framework) => (
                                        <span key={framework} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                                            {framework}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-700 mb-2">Databases</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle'].map((db) => (
                                        <span key={db} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                                            {db}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-700 mb-2">DevOps & Cloud</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['AWS', 'Azure', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions'].map((tool) => (
                                        <span key={tool} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Career Path */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Career Path</h2>
                        <div className="space-y-4">
                            {[
                                { level: 'Entry Level', title: 'Junior Developer', salary: '₹3-6 LPA', exp: '0-2 years' },
                                { level: 'Mid Level', title: 'Software Developer', salary: '₹6-12 LPA', exp: '2-5 years' },
                                { level: 'Senior Level', title: 'Senior Developer', salary: '₹12-20 LPA', exp: '5-8 years' },
                                { level: 'Expert', title: 'Tech Lead/Architect', salary: '₹20-40 LPA', exp: '8+ years' }
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 bg-slate-50/80 rounded-2xl">
                                    <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-slate-700">{step.title}</p>
                                        <p className="text-xs text-slate-500">{step.level} • {step.exp}</p>
                                    </div>
                                    <span className="text-sm font-bold text-blue-600">{step.salary}</span>
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
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            <h3 className="text-lg font-bold text-slate-800">Education</h3>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="font-semibold text-slate-700">Degree Required</p>
                                <p className="text-sm text-slate-600">B.Sc. Computer Science / BCA / B.Tech</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-700">Duration</p>
                                <p className="text-sm text-slate-600">3-4 years</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-700">Certifications</p>
                                <p className="text-sm text-slate-600">AWS, Azure, Google Cloud, Full Stack</p>
                            </div>
                        </div>
                    </div>

                    {/* Job Opportunities */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Top Employers</h3>
                        <div className="space-y-2">
                            {[
                                'Google',
                                'Microsoft',
                                'Amazon',
                                'Infosys',
                                'TCS',
                                'Wipro',
                                'Flipkart',
                                'Swiggy'
                            ].map((employer) => (
                                <div key={employer} className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
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
                                <span className="font-bold text-blue-600">₹6-12 LPA</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-600">Job Growth</span>
                                <span className="font-bold text-blue-600">22% annually</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-600">Work Type</span>
                                <span className="font-bold text-slate-700">Office/Remote</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-6 text-white">
                        <h3 className="text-lg font-bold mb-2">Ready to Code?</h3>
                        <p className="text-sm opacity-90 mb-4">Explore colleges offering CS courses</p>
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