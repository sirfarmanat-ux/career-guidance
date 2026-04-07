'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
 
import {
    Code, Database, Bot, Globe, Gamepad2, Shield,
    FlaskConical, Palette, TrendingUp, Wrench,
    ChevronDown, ArrowRight, BookOpen, Star, Zap,
    Microscope, Calculator, Music, Landmark, Briefcase,
    HeartPulse, Cpu, PenTool, Search, Filter, X,
    DollarSign, Users, Award, Clock, Target,
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
    salary_range?: string;
    growth_rate?: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
}

/* ─── Static fallback data for Commerce ───────────────────── */
const FALLBACK_COMMERCE: CareerPath[] = [
    {
        id: '13',
        title: 'Chartered Accountant',
        stream: 'Commerce',
        degree_required: 'B.Com',
        description: 'Manage accounts, audits and taxation for businesses and individuals',
        preparation_for: ['CA Exams', 'Big 4 Firms', 'Govt'],
        job_opportunities: ['Deloitte', 'KPMG', 'EY'],
        salary_range: '₹8-20 LPA',
        growth_rate: 'High',
        difficulty: 'Hard'
    },
    {
        id: '14',
        title: 'Investment Banker',
        stream: 'Commerce',
        degree_required: 'BBA',
        description: 'Manage large financial transactions and investment portfolios',
        preparation_for: ['MBA Finance', 'SEBI', 'Banks'],
        job_opportunities: ['Goldman Sachs', 'JP Morgan', 'HDFC'],
        salary_range: '₹12-30 LPA',
        growth_rate: 'Very High',
        difficulty: 'Hard'
    },
    {
        id: '15',
        title: 'Marketing Manager',
        stream: 'Commerce',
        degree_required: 'BBA',
        description: 'Drive brand growth and develop marketing strategies for companies',
        preparation_for: ['MBA Marketing', 'Agencies', 'FMCG'],
        job_opportunities: ['HUL', 'P&G', 'Nestle'],
        salary_range: '₹8-18 LPA',
        growth_rate: 'High',
        difficulty: 'Medium'
    },
    {
        id: '16',
        title: 'Entrepreneur',
        stream: 'Commerce',
        degree_required: 'BBA',
        description: 'Build and scale your own business ventures and startups',
        preparation_for: ['Startup Incubators', 'VC Funding', 'IIM'],
        job_opportunities: ['Own Startup', 'Accelerators', 'CXO Roles'],
        salary_range: '₹10-50 LPA',
        growth_rate: 'Very High',
        difficulty: 'Hard'
    },
    {
        id: '17',
        title: 'Financial Analyst',
        stream: 'Commerce',
        degree_required: 'B.Com',
        description: 'Analyse financial data and provide investment recommendations',
        preparation_for: ['CFA', 'SEBI', 'Mutual Funds'],
        job_opportunities: ['Motilal Oswal', 'Zerodha', 'ICICI'],
        salary_range: '₹6-15 LPA',
        growth_rate: 'High',
        difficulty: 'Medium'
    },
    {
        id: '18',
        title: 'HR Manager',
        stream: 'Commerce',
        degree_required: 'BBA',
        description: 'Manage talent and organisational culture in corporate settings',
        preparation_for: ['MBA HR', 'Corporates', 'Consulting'],
        job_opportunities: ['Infosys', 'TCS', 'Accenture'],
        salary_range: '₹7-16 LPA',
        growth_rate: 'Medium',
        difficulty: 'Medium'
    },
];

/* ─── Icon map ───────────────────────────────────────────── */
const ICON_MAP: Record<string, any> = {
    'Chartered Accountant': Calculator,
    'Investment Banker': Landmark,
    'Marketing Manager': TrendingUp,
    'Entrepreneur': Briefcase,
    'Financial Analyst': TrendingUp,
    'HR Manager': Briefcase,
};

/* ─── Gradient palette for Commerce ───────────────────────── */
const STREAM_META = {
    tab: 'linear-gradient(135deg,#ff6b6b,#ffa726)',
    pill: '#ff6b6b',
    cardGrads: [
        'linear-gradient(135deg,#ff6b6b 0%,#ffa726 100%)',
        'linear-gradient(135deg,#f7971e 0%,#ffd200 100%)',
        'linear-gradient(135deg,#11998e 0%,#38ef7d 100%)',
        'linear-gradient(135deg,#fc4a1a 0%,#f7b733 100%)',
        'linear-gradient(135deg,#16a085 0%,#f4d03f 100%)',
        'linear-gradient(135deg,#e44d26 0%,#f16529 100%)',
    ],
};

const DEGREES_COMMERCE = ['B.Com', 'BBA', 'B.Com (Hons)', 'BMS'];
const SALARY_RANGES = ['₹0-5 LPA', '₹5-10 LPA', '₹10-15 LPA', '₹15-20 LPA', '₹20+ LPA'];
const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'];

/* ─── Illustrated SVG banner per career ─────────────────── */
function CareerIllustration({ title, gradient }: { title: string; gradient: string }) {
    const Icon = ICON_MAP[title] || Code;
    return (
        <div className="relative w-full h-28 rounded-2xl overflow-hidden flex items-center justify-center mb-4"
            style={{ background: gradient }}>
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.6)' }} />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-15" style={{ background: 'rgba(255,255,255,0.5)' }} />
            {/* Icon */}
            <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.25)' }}>
                    <Icon className="w-8 h-8 text-white" />
                </div>
            </div>
        </div>
    );
}

/* ─── Career Card ────────────────────────────────────────── */
function CareerCard({ career, gradient, index }: { career: CareerPath; gradient: string; index: number }) {
    const [shortlisted, setShortlisted] = useState(false);
    const Icon = ICON_MAP[career.title] || Code;

    const getDifficultyColor = (difficulty?: string) => {
        switch (difficulty) {
            case 'Easy': return '#10b981';
            case 'Medium': return '#f59e0b';
            case 'Hard': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const getGrowthColor = (growth?: string) => {
        switch (growth) {
            case 'Very High': return '#10b981';
            case 'High': return '#3b82f6';
            case 'Medium': return '#f59e0b';
            default: return '#6b7280';
        }
    };

    return (
        <div
            className="rounded-3xl overflow-hidden flex flex-col hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
            style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                animationDelay: `${index * 60}ms`,
            }}
        >
            {/* Gradient header */}
            <div className="relative h-36 flex items-center justify-center overflow-hidden" style={{ background: gradient }}>
                {/* Decorative blobs */}
                <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-24 h-24 sm:w-32 sm:h-32 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.5)' }} />
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full opacity-15" style={{ background: 'rgba(255,255,255,0.4)' }} />
                {/* Title strip */}
                <div className="absolute inset-x-0 bottom-0 px-3 sm:px-4 py-3 flex items-center gap-2"
                    style={{ background: 'rgba(0,0,0,0.18)', backdropFilter: 'blur(4px)' }}>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(255,255,255,0.25)' }}>
                        <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-xs sm:text-sm leading-tight flex-1">{career.title}</h3>
                    <button
                        onClick={(e) => { e.stopPropagation(); setShortlisted(s => !s); }}
                        className="flex-shrink-0 transition-transform hover:scale-110 active:scale-95"
                    >
                        <Star
                            className="w-3 h-3 sm:w-4 sm:h-4 transition-colors"
                            fill={shortlisted ? '#fbbf24' : 'transparent'}
                            stroke={shortlisted ? '#fbbf24' : 'rgba(255,255,255,0.7)'}
                        />
                    </button>
                </div>
                {/* Big icon in center */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center relative z-10"
                    style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
                    <Icon className="w-6 h-6 sm:w-9 sm:h-9 text-white" />
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 p-3 sm:p-4 flex flex-col">
                <p className="text-xs text-slate-600 mb-3 leading-relaxed line-clamp-2">{career.description}</p>

                {/* Stats row */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-xs font-semibold text-slate-700">{career.salary_range || '₹8-15 LPA'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Target className="w-3.5 h-3.5" style={{ color: getGrowthColor(career.growth_rate) }} />
                        <span className="text-xs font-medium" style={{ color: getGrowthColor(career.growth_rate) }}>
                            {career.growth_rate || 'High'}
                        </span>
                    </div>
                </div>

                {/* Difficulty badge */}
                <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 rounded-full text-xs font-bold text-white"
                        style={{ background: getDifficultyColor(career.difficulty) }}>
                        {career.difficulty || 'Medium'}
                    </span>
                    <span className="text-xs text-slate-500">{career.degree_required}</span>
                </div>

                {/* Prepares for */}
                <div className="mb-3">
                    <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" style={{ color: '#ff6b6b' }} />
                        Prepares for:
                    </p>
                    <div className="flex flex-wrap gap-1">
                        {career.preparation_for.slice(0, 2).map((item, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full text-xs font-medium text-slate-600"
                                style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.15)' }}>
                                {item}
                            </span>
                        ))}
                        {career.preparation_for.length > 2 && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium text-slate-400"
                                style={{ background: 'rgba(148,163,184,0.08)' }}>
                                +{career.preparation_for.length - 2}
                            </span>
                        )}
                    </div>
                </div>

                {/* Job tags */}
                {career.job_opportunities && career.job_opportunities.length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-slate-500" />
                            Top Recruiters:
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {career.job_opportunities.slice(0, 3).map((job, i) => (
                                <span key={i} className="px-2 py-0.5 rounded-full text-xs font-medium text-slate-500"
                                    style={{ background: 'rgba(100,116,139,0.08)', border: '1px solid rgba(100,116,139,0.15)' }}>
                                    {job}
                                </span>
                            ))}
                        </div>
                )}

                        {/* CTA */}
                        <button
                            onClick={() => router.push(`/career-paths/commerce/${career.id}`)}
                            className="mt-auto w-full py-2.5 rounded-2xl text-white text-xs font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95 cursor-pointer"
                            style={{ background: gradient, boxShadow: `0 4px 14px rgba(0,0,0,0.15)` }}
                        >
                            View Career Roadmap <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
        </div>
            );
}
            style={{ background: 'rgba(0,0,0,0.18)', backdropFilter: 'blur(4px)' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.25)' }}>
                <Icon className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-white font-bold text-sm leading-tight">{career.title}</h3>
            <button
                onClick={() => setShortlisted(s => !s)}
                className="ml-auto flex-shrink-0 transition-transform hover:scale-110 active:scale-95"
            >
                <Star
                    className="w-4 h-4 transition-colors"
                    fill={shortlisted ? '#fbbf24' : 'transparent'}
                    stroke={shortlisted ? '#fbbf24' : 'rgba(255,255,255,0.7)'}
                />
            </button>
        </div>
            {/* Big icon in center */ }
    <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10"
        style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
        <Icon className="w-9 h-9 text-white" />
    </div>
        </div >

        {/* Body */ }
        < div className = "flex-1 p-4 flex flex-col" >
            <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">{career.description}</p>

    {/* Prepares for */ }
    <div className="mb-3">
        <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" style={{ color: '#ff6b6b' }} />
            Prepares for:
        </p>
        <ul className="space-y-1.5">
            {career.preparation_for.slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#ff6b6b' }} />
                    {item}
                </li>
            ))}
        </ul>
    </div>

    {/* Job tags */ }
    {
        career.job_opportunities && career.job_opportunities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
                {career.job_opportunities.slice(0, 3).map((job, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full text-xs font-medium text-slate-500"
                        style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.15)' }}>
                        {job}
                    </span>
                ))}
            </div>
        )
    }

    {/* CTA */ }
    <button
        onClick={() => router.push(`/career-paths/commerce/${career.id}`)}
        className="mt-auto w-full py-2.5 rounded-2xl text-white text-xs font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95 cursor-pointer"
        style={{ background: gradient, boxShadow: `0 4px 14px rgba(0,0,0,0.15)` }}
    >
        View Career Roadmap <ArrowRight className="w-3.5 h-3.5" />
    </button>
    </div >
        </div >
    );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function CommerceCareersPage() {
    const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
    const [selectedDegree, setSelectedDegree] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSalary, setSelectedSalary] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setSelectedDegree(DEGREES_COMMERCE[0]);
    }, []);

    useEffect(() => {
        loadCareerPaths();
    }, []);

    async function loadCareerPaths() {
        setLoading(true);
        try {
            const { data } = await supabase
                .from('career_paths')
                .select('*')
                .eq('stream', 'Commerce');
            setCareerPaths(data && data.length > 0 ? data : FALLBACK_COMMERCE);
        } catch {
            setCareerPaths(FALLBACK_COMMERCE);
        } finally {
            setLoading(false);
        }
    }

    const displayed = careerPaths.length > 0 ? careerPaths : FALLBACK_COMMERCE;

    // Filter careers based on search and filters
    const filteredCareers = displayed.filter(career => {
        const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            career.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDegree = !selectedDegree || career.degree_required === selectedDegree;
        const matchesSalary = !selectedSalary || career.salary_range === selectedSalary;
        const matchesDifficulty = !selectedDifficulty || career.difficulty === selectedDifficulty;

        return matchesSearch && matchesDegree && matchesSalary && matchesDifficulty;
    });

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedDegree('');
        setSelectedSalary('');
        setSelectedDifficulty('');
    };

    return (
        <div className="space-y-5">

            {/* ── Hero banner ── */}
            <div
                className="rounded-3xl p-4 sm:p-7 relative overflow-hidden"
                style={{ background: STREAM_META.tab, boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}
            >
                {/* Blobs */}
                <div className="absolute -top-12 -right-12 w-32 h-32 sm:w-52 sm:h-52 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.5)' }} />
                <div className="absolute bottom-0 left-[35%] w-20 h-20 sm:w-32 sm:h-32 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.6)' }} />
                <div className="absolute top-6 right-[18%] w-6 h-6 sm:w-10 sm:h-10 rounded-full opacity-25" style={{ background: 'rgba(255,255,255,0.8)' }} />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-white/80" />
                            <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Commerce Careers</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">Commerce Career Paths</h1>
                        <p className="text-white/80 text-sm leading-relaxed max-w-lg">
                            Explore business and financial career opportunities in the field of Commerce.
                        </p>
                    </div>
                    <div
                        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl flex-shrink-0 self-start"
                        style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
                    >
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" fill="#fbbf24" />
                        <span className="text-white text-xs sm:text-sm font-semibold">{displayed.length * 1240}+ students exploring</span>
                    </div>
                </div>
            </div>

            {/* ── Search and Filters ── */}
            <div className="space-y-4">
                {/* Search bar */}
                <div className="relative">
                    <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search careers by name or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl text-sm font-medium outline-none transition-all hover:shadow-md"
                        style={{
                            background: 'rgba(255,255,255,0.9)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.6)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
                        }}
                    />
                </div>

                {/* Filter toggle and active filters */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all hover:shadow-md"
                        style={{
                            background: 'rgba(255,255,255,0.9)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.6)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                            color: showFilters ? STREAM_META.pill : '#64748b'
                        }}
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                        {(selectedDegree || selectedSalary || selectedDifficulty) && (
                            <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                        )}
                    </button>

                    {(selectedDegree || selectedSalary || selectedDifficulty) && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                        >
                            <X className="w-4 h-4" />
                            Clear all
                        </button>
                    )}
                </div>

                {/* Filter options */}
                {showFilters && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-5 rounded-3xl"
                        style={{
                            background: 'rgba(255,255,255,0.9)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.6)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.06)'
                        }}
                    >
                        {/* Degree filter */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Degree</label>
                            <select
                                value={selectedDegree}
                                onChange={(e) => setSelectedDegree(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                                style={{
                                    background: 'rgba(255,255,255,0.8)',
                                    border: '1px solid rgba(148,163,184,0.3)'
                                }}
                            >
                                <option value="">All Degrees</option>
                                {DEGREES_COMMERCE.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>

                        {/* Salary filter */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Salary Range</label>
                            <select
                                value={selectedSalary}
                                onChange={(e) => setSelectedSalary(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                                style={{
                                    background: 'rgba(255,255,255,0.8)',
                                    border: '1px solid rgba(148,163,184,0.3)'
                                }}
                            >
                                <option value="">All Ranges</option>
                                {SALARY_RANGES.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        {/* Difficulty filter */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Difficulty</label>
                            <select
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                                style={{
                                    background: 'rgba(255,255,255,0.8)',
                                    border: '1px solid rgba(148,163,184,0.3)'
                                }}
                            >
                                <option value="">All Levels</option>
                                {DIFFICULTY_LEVELS.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Stats strip ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { label: 'Career Paths', value: `${filteredCareers.length}`, icon: Target },
                    { label: 'Avg. Salary', value: '₹8–20 LPA', icon: DollarSign },
                    { label: 'Top Recruiters', value: '400+', icon: Users },
                    { label: 'High Growth', value: '78%', icon: TrendingUp },
                ].map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <div key={i} className="rounded-2xl px-3 sm:px-4 py-3 sm:py-4 text-center"
                            style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2" style={{ color: STREAM_META.pill }} />
                            <p className="text-lg sm:text-xl font-black text-slate-800">{s.value}</p>
                            <p className="text-xs text-slate-400 font-medium mt-0.5">{s.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* ── Career cards grid ── */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-80 rounded-3xl animate-pulse"
                            style={{ background: 'rgba(255,255,255,0.6)' }} />
                    ))}
                </div>
            ) : filteredCareers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCareers.map((career, i) => (
                        <CareerCard
                            key={career.id}
                            career={career}
                            gradient={STREAM_META.cardGrads[i % STREAM_META.cardGrads.length]}
                            index={i}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4"
                        style={{ background: 'rgba(255,107,107,0.1)' }}>
                        <Search className="w-8 h-8" style={{ color: STREAM_META.pill }} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">No careers found</h3>
                    <p className="text-slate-500 mb-4">Try adjusting your search or filters</p>
                    <button
                        onClick={clearFilters}
                        className="px-6 py-2 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: STREAM_META.tab }}
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            {/* ── Career Insights ── */}
            <div className="rounded-3xl p-4 sm:p-6"
                style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                    <Award className="w-5 h-5" style={{ color: STREAM_META.pill }} />
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Career Insights</h3>
                        <p className="text-sm text-slate-500">What makes Commerce careers successful</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,107,107,0.1)' }}>
                                <TrendingUp className="w-4 h-4 text-red-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800 text-sm">Financial Acumen</p>
                                <p className="text-xs text-slate-500">Strong foundation in finance and business principles</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16,185,129,0.1)' }}>
                                <Users className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800 text-sm">Leadership Skills</p>
                                <p className="text-xs text-slate-500">Develop management and team leadership abilities</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(59,130,246,0.1)' }}>
                                <Clock className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800 text-sm">Professional Certifications</p>
                                <p className="text-xs text-slate-500">CA, CFA, MBA enhance career prospects significantly</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(139,92,246,0.1)' }}>
                                <Target className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800 text-sm">Global Opportunities</p>
                                <p className="text-xs text-slate-500">International firms offer diverse career paths worldwide</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Bottom CTA ── */}
            <div
                className="rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                style={{ background: STREAM_META.tab, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}
            >
                <div className="flex-1">
                    <h3 className="text-white font-black text-lg leading-tight">Not sure which path to take?</h3>
                    <p className="text-white/75 text-sm mt-1">Take our aptitude quiz to get AI-powered career recommendations.</p>
                </div>
                <button
                    onClick={() => router.push('/course-suggestions')}
                    className="flex-shrink-0 flex items-center gap-2 px-4 sm:px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
                    style={{ background: 'rgba(255,255,255,0.95)', color: STREAM_META.pill, boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
                >
                    Take Quiz <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}