'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
    Code, Database, Bot, Globe, Gamepad2, Shield,
    FlaskConical, Palette, TrendingUp,
    ArrowRight, BookOpen, Star, Zap,
    Calculator, Music, Landmark, Briefcase,
    HeartPulse, Cpu, PenTool, ArrowLeft,
    CheckCircle2, Clock, Award, Lightbulb, Target,
    DollarSign, Users, Rocket, AlertCircle,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

/* ─── Types ──────────────────────────────────────────────── */
interface CareerPath {
    id: string;
    title: string;
    stream: string;
    degree_required: string;
    description: string;
    preparation_for: string[];
    job_opportunities: string[];
}

interface RoadmapStep {
    year: string;
    title: string;
    description: string;
    tasks: string[];
}

/* ─── Career database ─────────────────────────────────────── */
const ALL_CAREERS: CareerPath[] = [
    { id: '1', title: 'Software Developer', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Build software applications and systems', preparation_for: ['GATE', 'Private IT Firms', 'Startups'], job_opportunities: ['Google', 'Infosys', 'TCS'] },
    { id: '2', title: 'Data Scientist', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Analyse large datasets to derive insights', preparation_for: ['M.Sc.', 'Private Firms', 'Govt. Research'], job_opportunities: ['Amazon', 'Flipkart', 'ISRO'] },
    { id: '3', title: 'Artificial Intelligence Engineer', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Design AI/ML systems and models', preparation_for: ['GATE', 'IIT-JAM', 'Tech Companies'], job_opportunities: ['Microsoft', 'OpenAI', 'DeepMind'] },
    { id: '4', title: 'Web Developer', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Build responsive websites and web apps', preparation_for: ['GATE', 'IT Companies', 'Startups'], job_opportunities: ['Wipro', 'HCL', 'Freelance'] },
    { id: '5', title: 'Game Developer', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Create video games for multiple platforms', preparation_for: ['GATE', 'Game Studios', 'Indie Dev'], job_opportunities: ['Ubisoft', 'EA', 'Rockstar'] },
    { id: '6', title: 'Cybersecurity Analyst', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Protect systems from digital threats', preparation_for: ['GATE', 'DRDO', 'Tech Firms'], job_opportunities: ['ISRO', 'NIC', 'Cisco'] },
    { id: '7', title: 'Graphic Designer', stream: 'arts', degree_required: 'B.F.A.', description: 'Create visual content for brands', preparation_for: ['Design Agencies', 'Ad Firms', 'Freelance'], job_opportunities: ['WPP', 'Ogilvy', 'Publicis'] },
    { id: '8', title: 'Content Writer', stream: 'arts', degree_required: 'B.A. English', description: 'Craft engaging written content', preparation_for: ['Media Houses', 'Publishing', 'Digital'], job_opportunities: ['HarperCollins', 'TOI', 'BuzzFeed'] },
    { id: '9', title: 'Film Director', stream: 'arts', degree_required: 'B.F.A.', description: 'Direct films and visual narratives', preparation_for: ['FTII', 'Film Studios', 'OTT'], job_opportunities: ['Bollywood', 'Netflix', 'Amazon Prime'] },
    { id: '10', title: 'UX Designer', stream: 'arts', degree_required: 'B.Des', description: 'Design user-centred digital experiences', preparation_for: ['Design Bootcamps', 'Tech Firms', 'Agencies'], job_opportunities: ['Google', 'Swiggy', 'Zomato'] },
    { id: '11', title: 'Journalist', stream: 'arts', degree_required: 'B.A. Journalism', description: 'Report and investigate news stories', preparation_for: ['IIMC', 'Media Houses', 'Freelance'], job_opportunities: ['NDTV', 'The Hindu', 'Reuters'] },
    { id: '12', title: 'Musician', stream: 'arts', degree_required: 'B.Music', description: 'Compose and perform music professionally', preparation_for: ['Music Labels', 'Film Industry', 'Teaching'], job_opportunities: ['T-Series', 'Sony Music', 'Spotify'] },
    { id: '13', title: 'Chartered Accountant', stream: 'commerce', degree_required: 'B.Com', description: 'Manage accounts, audits and taxation', preparation_for: ['CA Exams', 'Big 4 Firms', 'Govt'], job_opportunities: ['Deloitte', 'KPMG', 'EY'] },
    { id: '14', title: 'Investment Banker', stream: 'commerce', degree_required: 'BBA', description: 'Manage large financial transactions', preparation_for: ['MBA Finance', 'SEBI', 'Banks'], job_opportunities: ['Goldman Sachs', 'JP Morgan', 'HDFC'] },
    { id: '15', title: 'Marketing Manager', stream: 'commerce', degree_required: 'BBA', description: 'Drive brand growth and campaigns', preparation_for: ['MBA Marketing', 'Agencies', 'FMCG'], job_opportunities: ['HUL', 'P&G', 'Nestle'] },
    { id: '16', title: 'Entrepreneur', stream: 'commerce', degree_required: 'BBA', description: 'Build and scale your own business', preparation_for: ['Startup Incubators', 'VC Funding', 'IIM'], job_opportunities: ['Own Startup', 'Accelerators', 'CXO Roles'] },
    { id: '17', title: 'Financial Analyst', stream: 'commerce', degree_required: 'B.Com', description: 'Analyse financial data and investments', preparation_for: ['CFA', 'SEBI', 'Mutual Funds'], job_opportunities: ['Motilal Oswal', 'Zerodha', 'ICICI'] },
    { id: '18', title: 'HR Manager', stream: 'commerce', degree_required: 'BBA', description: 'Manage talent and organisational culture', preparation_for: ['MBA HR', 'Corporates', 'Consulting'], job_opportunities: ['Infosys', 'TCS', 'Accenture'] },
];

/* ─── Icon map ───────────────────────────────────────────── */
const ICON_MAP: Record<string, any> = {
    'Software Developer': Code,
    'Data Scientist': Database,
    'Artificial Intelligence Engineer': Bot,
    'Web Developer': Globe,
    'Game Developer': Gamepad2,
    'Cybersecurity Analyst': Shield,
    'Graphic Designer': PenTool,
    'Content Writer': BookOpen,
    'Film Director': Zap,
    'UX Designer': Cpu,
    'Journalist': Globe,
    'Musician': Music,
    'Chartered Accountant': Calculator,
    'Investment Banker': Landmark,
    'Marketing Manager': TrendingUp,
    'Entrepreneur': Briefcase,
    'Financial Analyst': TrendingUp,
    'HR Manager': Briefcase,
};

/* ─── Career roadmaps ─────────────────────────────────────── */
const CAREER_ROADMAPS: Record<string, RoadmapStep[]> = {
    'Software Developer': [
        {
            year: 'Year 1-2: Foundation',
            title: 'Build Core Fundamentals',
            description: 'Master programming languages and data structures',
            tasks: ['Learn Python/Java/C++', 'Study data structures & algorithms', 'Build 5-10 small projects', 'Learn version control (Git)']
        },
        {
            year: 'Year 2-3: Specialization',
            title: 'Choose a Path',
            description: 'Specialize in frontend, backend, or full-stack development',
            tasks: ['Learn web frameworks', 'Build 3-5 portfolio projects', 'Contribute to open source', 'Start freelancing for experience']
        },
        {
            year: 'Year 4: Professional Entry',
            title: 'Land First Role',
            description: 'Secure your first job as a junior developer',
            tasks: ['Polish resume & GitHub profile', 'Apply to 50+ companies', 'Prepare for technical interviews', 'Network with professionals']
        },
        {
            year: 'Year 5+: Growth',
            title: 'Career Advancement',
            description: 'Move to mid-level and senior positions',
            tasks: ['Lead projects', 'Mentor junior developers', 'Stay updated with technologies', 'Earn certifications']
        }
    ],
    'Data Scientist': [
        {
            year: 'Year 1-2: Fundamentals',
            title: 'Learn Core Skills',
            description: 'Master statistics, Python, and data analysis',
            tasks: ['Learn Python, R, or SQL', 'Study statistics & probability', 'Learn data visualization', 'Complete MOOCs on platforms']
        },
        {
            year: 'Year 2-3: Advanced Skills',
            title: 'Machine Learning & Analytics',
            description: 'Deep dive into ML algorithms and real datasets',
            tasks: ['Learn ML algorithms', 'Take Kaggle competitions', 'Build 5-8 ML projects', 'Learn business analytics']
        },
        {
            year: 'Year 3-4: Practical Experience',
            title: 'Internships & Projects',
            description: 'Gain real-world experience with data',
            tasks: ['Complete internships', 'Work on industry datasets', 'Build end-to-end pipelines', 'Get first role']
        },
        {
            year: 'Year 5+: Specialization',
            title: 'Expert Level',
            description: 'Become domain expert in specific area',
            tasks: ['Lead data initiatives', 'Mentor team members', 'Research new techniques', 'Publish papers or blogs']
        }
    ],
};

/* ─── Stream metadata ────────────────────────────────────── */
const STREAM_META: Record<string, any> = {
    science: {
        gradient: 'linear-gradient(135deg,#667eea,#764ba2)',
        icon: FlaskConical,
    },
    arts: {
        gradient: 'linear-gradient(135deg,#f093fb,#f5576c)',
        icon: Palette,
    },
    commerce: {
        gradient: 'linear-gradient(135deg,#ff6b6b,#ffa726)',
        icon: TrendingUp,
    },
};

/* ─── Skills & Salary Info ─────────────────────────────────── */
const CAREER_DETAILS: Record<string, any> = {
    'Software Developer': {
        skills: ['Java', 'Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'Problem Solving'],
        entry_salary: '₹4-6 LPA',
        mid_salary: '₹10-15 LPA',
        senior_salary: '₹20-30+ LPA',
        growth: '8-10 years to senior role',
        certifications: ['AWS Developer', 'Google Cloud Associate', 'Oracle Certified Associate'],
    },
    'Data Scientist': {
        skills: ['Python', 'R', 'SQL', 'TensorFlow', 'Machine Learning', 'Statistics', 'Data Visualization', 'Apache Spark'],
        entry_salary: '₹5-7 LPA',
        mid_salary: '₹12-18 LPA',
        senior_salary: '₹25-40+ LPA',
        growth: '7-10 years to lead role',
        certifications: ['Google Cloud Data Engineer', 'AWS Machine Learning', 'Andrew Ng ML Course'],
    },
};

export default function CareerDetailPage() {
    const params = useParams();
    const router = useRouter();
    const streamParam = Array.isArray(params.stream) ? params.stream[0] : params.stream;
    const careerIdParam = Array.isArray(params.careerId) ? params.careerId[0] : params.careerId;

    const [career, setCareer] = useState<CareerPath | null>(null);
    const [loading, setLoading] = useState(true);
    const [shortlisted, setShortlisted] = useState(false);

    useEffect(() => {
        const found = ALL_CAREERS.find(c => c.id === careerIdParam);
        setCareer(found || null);
        setLoading(false);
    }, [careerIdParam]);

    if (loading) {
        return <div className="p-8 text-center">Loading career details...</div>;
    }

    if (!career) {
        return (
            <div className="p-8 text-center">
                <p className="text-slate-600">Career not found</p>
                <button
                    onClick={() => router.back()}
                    className="mt-4 px-4 py-2 text-sm font-bold text-white rounded-lg"
                    style={{ background: '#667eea' }}
                >
                    Go Back
                </button>
            </div>
        );
    }

    const Icon = ICON_MAP[career.title] || Code;
    const meta = STREAM_META[career.stream] || STREAM_META.science;
    const StreamIcon = meta.icon;
    const roadmap = CAREER_ROADMAPS[career.title] || [];
    const details = CAREER_DETAILS[career.title] || {};

    return (
        <div className="space-y-6">
            {/* Hero Section */}
            <div className="rounded-3xl p-8 relative overflow-hidden" style={{ background: meta.gradient, boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}>
                <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.5)' }} />
                <div className="absolute bottom-0 left-[35%] w-32 h-32 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.6)' }} />

                <div className="relative z-10">
                    <button
                        onClick={() => router.back()}
                        className="mb-6 flex items-center gap-2 px-3 py-1.5 rounded-lg text-white text-xs font-bold transition-all hover:opacity-80"
                        style={{ background: 'rgba(255,255,255,0.15)' }}
                    >
                        <ArrowLeft className="w-3 h-3" /> Back to Stream
                    </button>

                    <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-black text-white">{career.title}</h1>
                                    <p className="text-white/80 text-sm mt-1">Explore a detailed career roadmap and requirements</p>
                                </div>
                            </div>
                            <p className="text-white/90 max-w-2xl leading-relaxed">{career.description}</p>
                        </div>
                        <button
                            onClick={() => setShortlisted(!shortlisted)}
                            className="flex-shrink-0 p-3 rounded-2xl transition-all hover:scale-110 active:scale-95"
                            style={{ background: 'rgba(255,255,255,0.15)' }}
                        >
                            <Star
                                className="w-6 h-6"
                                fill={shortlisted ? '#fbbf24' : 'transparent'}
                                stroke={shortlisted ? '#fbbf24' : 'rgba(255,255,255,0.7)'}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Key Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <h3 className="font-bold text-slate-700">Degree Required</h3>
                    </div>
                    <p className="text-sm text-slate-600">{career.degree_required}</p>
                </div>

                <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <Clock className="w-5 h-5 text-amber-600" />
                        <h3 className="font-bold text-slate-700">Time to Entry</h3>
                    </div>
                    <p className="text-sm text-slate-600">4-5 years (with degree)</p>
                </div>

                <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <Award className="w-5 h-5 text-green-600" />
                        <h3 className="font-bold text-slate-700">Difficulty Level</h3>
                    </div>
                    <p className="text-sm text-slate-600">Moderate to High</p>
                </div>
            </div>

            {/* Salary Overview */}
            {details.entry_salary && (
                <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
                    <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" /> Salary Progression
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl" style={{ background: 'rgba(100,200,100,0.1)', border: '1px solid rgba(100,200,100,0.3)' }}>
                            <p className="text-xs text-slate-600 mb-1">Entry Level (0-2 years)</p>
                            <p className="text-xl font-bold text-green-700">{details.entry_salary}</p>
                        </div>
                        <div className="p-4 rounded-xl" style={{ background: 'rgba(100,150,200,0.1)', border: '1px solid rgba(100,150,200,0.3)' }}>
                            <p className="text-xs text-slate-600 mb-1">Mid Level (3-7 years)</p>
                            <p className="text-xl font-bold text-blue-700">{details.mid_salary}</p>
                        </div>
                        <div className="p-4 rounded-xl" style={{ background: 'rgba(200,100,100,0.1)', border: '1px solid rgba(200,100,100,0.3)' }}>
                            <p className="text-xs text-slate-600 mb-1">Senior Level (8+ years)</p>
                            <p className="text-xl font-bold text-red-700">{details.senior_salary}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Skills Required */}
            {details.skills && (
                <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
                    <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-600" /> Key Skills Required
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {details.skills.map((skill: string, i: number) => (
                            <span
                                key={i}
                                className="px-4 py-2 rounded-full text-xs font-semibold text-white"
                                style={{ background: meta.gradient, opacity: 0.9 }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Career Roadmap */}
            {roadmap.length > 0 && (
                <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
                    <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                        <Rocket className="w-5 h-5 text-purple-600" /> Career Roadmap
                    </h2>
                    <div className="space-y-4">
                        {roadmap.map((step, i) => (
                            <div key={i} className="relative pl-8 pb-4">
                                <div className="absolute left-0 top-1 w-4 h-4 rounded-full" style={{ background: meta.gradient, boxShadow: `0 0 10px ${meta.gradient}` }} />
                                {i < roadmap.length - 1 && (
                                    <div className="absolute left-1.5 top-6 w-0.5 h-12" style={{ background: 'rgba(100,116,139,0.2)' }} />
                                )}
                                <div className="p-4 rounded-xl" style={{ background: 'rgba(100,116,139,0.05)', border: '1px solid rgba(100,116,139,0.1)' }}>
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">{step.year}</p>
                                    <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                                    <p className="text-sm text-slate-600 mb-3">{step.description}</p>
                                    <ul className="space-y-2">
                                        {step.tasks.map((task, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                                                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Job Opportunities */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
                <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" /> Top Employers
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {career.job_opportunities.map((job, i) => (
                        <div
                            key={i}
                            className="p-3 rounded-lg text-center"
                            style={{ background: 'rgba(100,116,139,0.08)', border: '1px solid rgba(100,116,139,0.15)' }}
                        >
                            <p className="text-sm font-semibold text-slate-700">{job}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Preparation Steps */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
                <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-600" /> Preparation Steps
                </h2>
                <div className="space-y-3">
                    {career.preparation_for.map((prep, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'rgba(100,116,139,0.05)' }}>
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-slate-700 font-medium">{prep}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="rounded-3xl p-8 flex items-center justify-between gap-4" style={{ background: meta.gradient, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}>
                <div>
                    <h3 className="text-white font-black text-lg leading-tight">Ready to start this career?</h3>
                    <p className="text-white/75 text-sm mt-1">Take our career assessment to confirm this is your perfect match.</p>
                </div>
                <button
                    onClick={() => router.push('/career-quiz')}
                    className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
                    style={{ background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
                >
                    Start Assessment <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
