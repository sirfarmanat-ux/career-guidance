'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
    Code, Database, Bot, Globe, Gamepad2, Shield,
    FlaskConical, Palette, TrendingUp, Wrench,
    ChevronDown, ArrowRight, BookOpen, Star, Zap,
    Microscope, Calculator, Music, Landmark, Briefcase,
    HeartPulse, Cpu, PenTool, Search, Filter,
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

/* ─── Combined fallback data for all streams ─────────────── */
const ALL_CAREERS: CareerPath[] = [
    // Science Careers
    { id: '1', title: 'Software Developer', stream: 'Science', degree_required: 'B.Sc. Computer Science', description: 'Build software applications and systems', preparation_for: ['GATE', 'Private IT Firms', 'Startups'], job_opportunities: ['Google', 'Infosys', 'TCS'] },
    { id: '2', title: 'Data Scientist', stream: 'Science', degree_required: 'B.Sc. Computer Science', description: 'Analyse large datasets to derive insights', preparation_for: ['M.Sc.', 'Private Firms', 'Govt. Research'], job_opportunities: ['Amazon', 'Flipkart', 'ISRO'] },
    { id: '3', title: 'Artificial Intelligence Engineer', stream: 'Science', degree_required: 'B.Sc. Computer Science', description: 'Design AI/ML systems and models', preparation_for: ['GATE', 'IIT-JAM', 'Tech Companies'], job_opportunities: ['Microsoft', 'OpenAI', 'DeepMind'] },
    { id: '4', title: 'Web Developer', stream: 'Science', degree_required: 'B.Sc. Computer Science', description: 'Build responsive websites and web apps', preparation_for: ['GATE', 'IT Companies', 'Startups'], job_opportunities: ['Wipro', 'HCL', 'Freelance'] },
    { id: '5', title: 'Game Developer', stream: 'Science', degree_required: 'B.Sc. Computer Science', description: 'Create video games for multiple platforms', preparation_for: ['GATE', 'Game Studios', 'Indie Dev'], job_opportunities: ['Ubisoft', 'EA', 'Rockstar'] },
    { id: '6', title: 'Cybersecurity Analyst', stream: 'Science', degree_required: 'B.Sc. Computer Science', description: 'Protect systems from digital threats', preparation_for: ['GATE', 'DRDO', 'Tech Firms'], job_opportunities: ['ISRO', 'NIC', 'Cisco'] },

    // Arts Careers
    { id: '7', title: 'Graphic Designer', stream: 'Arts', degree_required: 'B.F.A.', description: 'Create visual content for brands', preparation_for: ['Design Agencies', 'Ad Firms', 'Freelance'], job_opportunities: ['WPP', 'Ogilvy', 'Publicis'] },
    { id: '8', title: 'Content Writer', stream: 'Arts', degree_required: 'B.A. English', description: 'Craft engaging written content', preparation_for: ['Media Houses', 'Publishing', 'Digital'], job_opportunities: ['HarperCollins', 'TOI', 'BuzzFeed'] },
    { id: '9', title: 'Film Director', stream: 'Arts', degree_required: 'B.F.A.', description: 'Direct films and visual narratives', preparation_for: ['FTII', 'Film Studios', 'OTT'], job_opportunities: ['Bollywood', 'Netflix', 'Amazon Prime'] },
    { id: '10', title: 'UX Designer', stream: 'Arts', degree_required: 'B.Des', description: 'Design user-centred digital experiences', preparation_for: ['Design Bootcamps', 'Tech Firms', 'Agencies'], job_opportunities: ['Google', 'Swiggy', 'Zomato'] },
    { id: '11', title: 'Journalist', stream: 'Arts', degree_required: 'B.A. Journalism', description: 'Report and investigate news stories', preparation_for: ['IIMC', 'Media Houses', 'Freelance'], job_opportunities: ['NDTV', 'The Hindu', 'Reuters'] },
    { id: '12', title: 'Musician', stream: 'Arts', degree_required: 'B.Music', description: 'Compose and perform music professionally', preparation_for: ['Music Labels', 'Film Industry', 'Teaching'], job_opportunities: ['T-Series', 'Sony Music', 'Spotify'] },

    // Commerce Careers
    { id: '13', title: 'Chartered Accountant', stream: 'Commerce', degree_required: 'B.Com', description: 'Manage accounts, audits and taxation', preparation_for: ['CA Exams', 'Big 4 Firms', 'Govt'], job_opportunities: ['Deloitte', 'KPMG', 'EY'] },
    { id: '14', title: 'Investment Banker', stream: 'Commerce', degree_required: 'BBA', description: 'Manage large financial transactions', preparation_for: ['MBA Finance', 'SEBI', 'Banks'], job_opportunities: ['Goldman Sachs', 'JP Morgan', 'HDFC'] },
    { id: '15', title: 'Marketing Manager', stream: 'Commerce', degree_required: 'BBA', description: 'Drive brand growth and campaigns', preparation_for: ['MBA Marketing', 'Agencies', 'FMCG'], job_opportunities: ['HUL', 'P&G', 'Nestle'] },
    { id: '16', title: 'Entrepreneur', stream: 'Commerce', degree_required: 'BBA', description: 'Build and scale your own business', preparation_for: ['Startup Incubators', 'VC Funding', 'IIM'], job_opportunities: ['Own Startup', 'Accelerators', 'CXO Roles'] },
    { id: '17', title: 'Financial Analyst', stream: 'Commerce', degree_required: 'B.Com', description: 'Analyse financial data and investments', preparation_for: ['CFA', 'SEBI', 'Mutual Funds'], job_opportunities: ['Motilal Oswal', 'Zerodha', 'ICICI'] },
    { id: '18', title: 'HR Manager', stream: 'Commerce', degree_required: 'BBA', description: 'Manage talent and organisational culture', preparation_for: ['MBA HR', 'Corporates', 'Consulting'], job_opportunities: ['Infosys', 'TCS', 'Accenture'] },
];

/* ─── Icon map ───────────────────────────────────────────── */
const ICON_MAP: Record<string, any> = {
    // Science
    'Software Developer': Code,
    'Data Scientist': Database,
    'Artificial Intelligence Engineer': Bot,
    'Web Developer': Globe,
    'Game Developer': Gamepad2,
    'Cybersecurity Analyst': Shield,
    // Arts
    'Graphic Designer': PenTool,
    'Content Writer': BookOpen,
    'Film Director': Zap,
    'UX Designer': Cpu,
    'Journalist': Globe,
    'Musician': Music,
    // Commerce
    'Chartered Accountant': Calculator,
    'Investment Banker': Landmark,
    'Marketing Manager': TrendingUp,
    'Entrepreneur': Briefcase,
    'Financial Analyst': TrendingUp,
    'HR Manager': Briefcase,
};

/* ─── Stream colors and gradients ────────────────────────── */
const STREAM_CONFIG = {
    Science: {
        gradient: 'linear-gradient(135deg,#667eea,#764ba2)',
        pill: '#667eea',
        cardGrads: [
            'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
            'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)',
            'linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)',
            'linear-gradient(135deg,#fa709a 0%,#fee140 100%)',
            'linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)',
            'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
        ],
    },
    Arts: {
        gradient: 'linear-gradient(135deg,#f093fb,#f5576c)',
        pill: '#f5576c',
        cardGrads: [
            'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
            'linear-gradient(135deg,#fccb90 0%,#d57eeb 100%)',
            'linear-gradient(135deg,#fd7043 0%,#ff8a65 100%)',
            'linear-gradient(135deg,#e96c8a 0%,#ee9ca7 100%)',
            'linear-gradient(135deg,#c471ed 0%,#f64f59 100%)',
            'linear-gradient(135deg,#f7971e 0%,#ffd200 100%)',
        ],
    },
    Commerce: {
        gradient: 'linear-gradient(135deg,#ff6b6b,#ffa726)',
        pill: '#ff6b6b',
        cardGrads: [
            'linear-gradient(135deg,#ff6b6b 0%,#ffa726 100%)',
            'linear-gradient(135deg,#ff9a9e 0%,#fecfef 100%)',
            'linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)',
            'linear-gradient(135deg,#ff9a9e 0%,#fecfef 100%)',
            'linear-gradient(135deg,#a8edea 0%,#fed6e3 100%)',
            'linear-gradient(135deg,#d299c2 0%,#fef9d7 100%)',
        ],
    },
};

/* ─── Career Card ────────────────────────────────────────── */
function CareerCard({ career, gradient, index, onViewDetails }: { career: CareerPath; gradient: string; index: number; onViewDetails: () => void }) {
    const [shortlisted, setShortlisted] = useState(false);
    const Icon = ICON_MAP[career.title] || Code;

    return (
        <div
            className="rounded-3xl overflow-hidden flex flex-col hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
            onClick={onViewDetails}
            style={{
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.7)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                animationDelay: `${index * 60}ms`,
            }}
        >
            {/* Gradient header */}
            <div className="relative h-32 flex items-center justify-center overflow-hidden" style={{ background: gradient }}>
                {/* Decorative blobs */}
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.5)' }} />
                <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full opacity-15" style={{ background: 'rgba(255,255,255,0.4)' }} />
                {/* Title strip */}
                <div className="absolute inset-x-0 bottom-0 px-4 py-3 flex items-center gap-2"
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
                {/* Big icon in center */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10"
                    style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
                    <Icon className="w-9 h-9 text-white" />
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 p-4 flex flex-col">
                <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">{career.description}</p>

                {/* Stream badge */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium text-slate-500"
                        style={{
                            background: `rgba(${career.stream === 'Science' ? '102,126,234' : career.stream === 'Arts' ? '240,147,251' : '255,107,107'},0.08)`,
                            border: `1px solid rgba(${career.stream === 'Science' ? '102,126,234' : career.stream === 'Arts' ? '240,147,251' : '255,107,107'},0.15)`
                        }}>
                        {career.stream}
                    </span>
                    <span className="text-xs text-slate-400">{career.degree_required}</span>
                </div>

                {/* Prepares for */}
                <div className="mb-3">
                    <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" style={{ color: '#64748b' }} />
                        Prepares for:
                    </p>
                    <ul className="space-y-1.5">
                        {career.preparation_for.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#64748b' }} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Job tags */}
                {career.job_opportunities && career.job_opportunities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
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
                    onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails();
                    }}
                    className="mt-auto w-full py-2.5 rounded-2xl text-white text-xs font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95"
                    style={{ background: gradient, boxShadow: `0 4px 14px rgba(0,0,0,0.15)` }}
                >
                    View Career Roadmap <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function ExploreCareerPathsPage() {
    const router = useRouter();
    const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
    const [filteredCareers, setFilteredCareers] = useState<CareerPath[]>([]);
    const [selectedStream, setSelectedStream] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCareerPaths();
    }, []);

    useEffect(() => {
        filterCareers();
    }, [careerPaths, selectedStream, searchQuery]);

    async function loadCareerPaths() {
        setLoading(true);
        try {
            const { data } = await supabase
                .from('career_paths')
                .select('*');
            setCareerPaths(data && data.length > 0 ? data : ALL_CAREERS);
        } catch {
            setCareerPaths(ALL_CAREERS);
        } finally {
            setLoading(false);
        }
    }

    const filterCareers = useCallback(() => {
        let filtered = careerPaths;

        // Filter by stream
        if (selectedStream !== 'All') {
            filtered = filtered.filter(career => career.stream === selectedStream);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            filtered = filtered.filter(career =>
                career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                career.stream.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredCareers(filtered);
    }, [careerPaths, selectedStream, searchQuery]);

    const displayed = filteredCareers.length > 0 ? filteredCareers : careerPaths;

    return (
        <div className="space-y-5">

            {/* ── Hero banner ── */}
            <div
                className="rounded-3xl p-7 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 40%, #f5576c 70%, #ff6b6b 100%)', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}
            >
                {/* Blobs */}
                <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.5)' }} />
                <div className="absolute bottom-0 left-[35%] w-32 h-32 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.6)' }} />
                <div className="absolute top-6 right-[18%] w-10 h-10 rounded-full opacity-25" style={{ background: 'rgba(255,255,255,0.8)' }} />

                <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Search className="w-4 h-4 text-white/80" />
                            <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Explore All</span>
                        </div>
                        <h1 className="text-3xl font-black text-white leading-tight mb-2">Explore Career Paths</h1>
                        <p className="text-white/80 text-sm leading-relaxed max-w-lg">
                            Discover all available career opportunities across Science, Arts, and Commerce streams.
                        </p>
                    </div>
                    <div
                        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl flex-shrink-0"
                        style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
                    >
                        <Star className="w-4 h-4 text-yellow-300" fill="#fbbf24" />
                        <span className="text-white text-sm font-semibold">{displayed.length} careers available</span>
                    </div>
                </div>
            </div>

            {/* ── Filters row ── */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Stream filter */}
                <div className="relative">
                    <select
                        value={selectedStream}
                        onChange={e => setSelectedStream(e.target.value)}
                        className="appearance-none pl-4 pr-9 py-2.5 rounded-2xl text-sm font-semibold text-slate-700 outline-none cursor-pointer transition-all hover:shadow-md"
                        style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                    >
                        <option value="All">All Streams</option>
                        <option value="Science">Science</option>
                        <option value="Arts">Arts</option>
                        <option value="Commerce">Commerce</option>
                    </select>
                    <Filter className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search careers..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-sm text-slate-700 outline-none transition-all hover:shadow-md"
                        style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                    />
                </div>
            </div>

            {/* ── Stats strip ── */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Total Careers', value: `${careerPaths.length}+` },
                    { label: 'Streams', value: '3' },
                    { label: 'Opportunities', value: '200+' },
                ].map((s, i) => (
                    <div key={i} className="rounded-2xl px-5 py-4 text-center"
                        style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
                        <p className="text-2xl font-black text-slate-800">{s.value}</p>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* ── Career cards grid ── */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 18 }).map((_, i) => (
                        <div key={i} className="h-72 rounded-3xl animate-pulse"
                            style={{ background: 'rgba(255,255,255,0.6)' }} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayed.map((career, i) => {
                        const streamConfig = STREAM_CONFIG[career.stream as keyof typeof STREAM_CONFIG];
                        const gradient = streamConfig?.cardGrads[i % streamConfig.cardGrads.length] || STREAM_CONFIG.Science.cardGrads[0];
                        return (
                            <CareerCard
                                key={career.id}
                                career={career}
                                gradient={gradient}
                                index={i}
                                onViewDetails={() => router.push(`/explore-career-paths/${career.stream.toLowerCase()}/${career.id}`)}
                            />
                        );
                    })}
                </div>
            )}

            {/* ── Bottom CTA ── */}
            <div
                className="rounded-3xl p-6 flex items-center justify-between gap-4"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 60%, #f5576c 100%)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}
            >
                <div>
                    <h3 className="text-white font-black text-lg leading-tight">Can&apos;t find your ideal career?</h3>
                    <p className="text-white/75 text-sm mt-1">Take our comprehensive career assessment to discover personalized recommendations.</p>
                </div>
                <button
                    className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
                    style={{ background: 'rgba(255,255,255,0.95)', color: '#667eea', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
                    onClick={() => router.push('/career-quiz')}
                >
                    Take Assessment <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}