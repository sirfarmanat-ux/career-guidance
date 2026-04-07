'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
 
import {
    Code, Database, Bot, Globe, Gamepad2, Shield,
    FlaskConical, Palette, TrendingUp,
    ChevronDown, ArrowRight, BookOpen, Star, Zap,
    Microscope, Calculator, Music, Landmark, Briefcase,
    HeartPulse, Cpu, PenTool, Search, Filter, ArrowLeft,
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
    { id: '1', title: 'Software Developer', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Build software applications and systems', preparation_for: ['GATE', 'Private IT Firms', 'Startups'], job_opportunities: ['Google', 'Infosys', 'TCS'] },
    { id: '2', title: 'Data Scientist', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Analyse large datasets to derive insights', preparation_for: ['M.Sc.', 'Private Firms', 'Govt. Research'], job_opportunities: ['Amazon', 'Flipkart', 'ISRO'] },
    { id: '3', title: 'Artificial Intelligence Engineer', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Design AI/ML systems and models', preparation_for: ['GATE', 'IIT-JAM', 'Tech Companies'], job_opportunities: ['Microsoft', 'OpenAI', 'DeepMind'] },
    { id: '4', title: 'Web Developer', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Build responsive websites and web apps', preparation_for: ['GATE', 'IT Companies', 'Startups'], job_opportunities: ['Wipro', 'HCL', 'Freelance'] },
    { id: '5', title: 'Game Developer', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Create video games for multiple platforms', preparation_for: ['GATE', 'Game Studios', 'Indie Dev'], job_opportunities: ['Ubisoft', 'EA', 'Rockstar'] },
    { id: '6', title: 'Cybersecurity Analyst', stream: 'science', degree_required: 'B.Sc. Computer Science', description: 'Protect systems from digital threats', preparation_for: ['GATE', 'DRDO', 'Tech Firms'], job_opportunities: ['ISRO', 'NIC', 'Cisco'] },

    // Arts Careers
    { id: '7', title: 'Graphic Designer', stream: 'arts', degree_required: 'B.F.A.', description: 'Create visual content for brands', preparation_for: ['Design Agencies', 'Ad Firms', 'Freelance'], job_opportunities: ['WPP', 'Ogilvy', 'Publicis'] },
    { id: '8', title: 'Content Writer', stream: 'arts', degree_required: 'B.A. English', description: 'Craft engaging written content', preparation_for: ['Media Houses', 'Publishing', 'Digital'], job_opportunities: ['HarperCollins', 'TOI', 'BuzzFeed'] },
    { id: '9', title: 'Film Director', stream: 'arts', degree_required: 'B.F.A.', description: 'Direct films and visual narratives', preparation_for: ['FTII', 'Film Studios', 'OTT'], job_opportunities: ['Bollywood', 'Netflix', 'Amazon Prime'] },
    { id: '10', title: 'UX Designer', stream: 'arts', degree_required: 'B.Des', description: 'Design user-centred digital experiences', preparation_for: ['Design Bootcamps', 'Tech Firms', 'Agencies'], job_opportunities: ['Google', 'Swiggy', 'Zomato'] },
    { id: '11', title: 'Journalist', stream: 'arts', degree_required: 'B.A. Journalism', description: 'Report and investigate news stories', preparation_for: ['IIMC', 'Media Houses', 'Freelance'], job_opportunities: ['NDTV', 'The Hindu', 'Reuters'] },
    { id: '12', title: 'Musician', stream: 'arts', degree_required: 'B.Music', description: 'Compose and perform music professionally', preparation_for: ['Music Labels', 'Film Industry', 'Teaching'], job_opportunities: ['T-Series', 'Sony Music', 'Spotify'] },

    // Commerce Careers
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

/* ─── Stream metadata ────────────────────────────────────── */
const STREAM_META: Record<string, any> = {
    science: {
        title: 'Science Careers',
        subtitle: 'Technology & Innovation',
        gradient: 'linear-gradient(135deg,#667eea,#764ba2)',
        icon: FlaskConical,
        stats: [
            { label: 'Tech Innovation', value: '98%', icon: Zap },
            { label: 'Job Growth', value: 'High', icon: TrendingUp },
            { label: 'Avg. Salary', value: '₹8-15 LPA', icon: Briefcase },
        ],
        cardGrads: [
            'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
            'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)',
            'linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)',
            'linear-gradient(135deg,#fa709a 0%,#fee140 100%)',
            'linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)',
            'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
        ],
    },
    arts: {
        title: 'Arts & Humanities',
        subtitle: 'Creative Expression',
        gradient: 'linear-gradient(135deg,#f093fb,#f5576c)',
        icon: Palette,
        stats: [
            { label: 'Creative Freedom', value: '95%', icon: Star },
            { label: 'Industry Growth', value: 'Rapid', icon: TrendingUp },
            { label: 'Avg. Salary', value: '₹4-10 LPA', icon: Briefcase },
        ],
        cardGrads: [
            'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
            'linear-gradient(135deg,#fccb90 0%,#d57eeb 100%)',
            'linear-gradient(135deg,#fd7043 0%,#ff8a65 100%)',
            'linear-gradient(135deg,#e96c8a 0%,#ee9ca7 100%)',
            'linear-gradient(135deg,#c471ed 0%,#f64f59 100%)',
            'linear-gradient(135deg,#f7971e 0%,#ffd200 100%)',
        ],
    },
    commerce: {
        title: 'Commerce & Business',
        subtitle: 'Financial Excellence',
        gradient: 'linear-gradient(135deg,#ff6b6b,#ffa726)',
        icon: TrendingUp,
        stats: [
            { label: 'Business Growth', value: 'High', icon: TrendingUp },
            { label: 'Demand', value: 'Very High', icon: Star },
            { label: 'Avg. Salary', value: '₹6-12 LPA', icon: Briefcase },
        ],
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
            }}
        >
            {/* Gradient header */}
            <div className="relative h-32 flex items-center justify-center overflow-hidden" style={{ background: gradient }}>
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.5)' }} />
                <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full opacity-15" style={{ background: 'rgba(255,255,255,0.4)' }} />
                <div className="absolute inset-x-0 bottom-0 px-4 py-3 flex items-center gap-2" style={{ background: 'rgba(0,0,0,0.18)', backdropFilter: 'blur(4px)' }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.25)' }}>
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
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
                    <Icon className="w-9 h-9 text-white" />
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 p-4 flex flex-col">
                <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">{career.description}</p>

                <div className="mb-3">
                    <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> Degree Required
                    </p>
                    <p className="text-xs text-slate-600">{career.degree_required}</p>
                </div>

                <div className="mb-3">
                    <p className="text-xs font-bold text-slate-700 mb-2">Prepares for:</p>
                    <div className="space-y-1">
                        {career.preparation_for.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#64748b' }} />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {career.job_opportunities && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {career.job_opportunities.slice(0, 3).map((job, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full text-xs font-medium text-slate-500" style={{ background: 'rgba(100,116,139,0.08)', border: '1px solid rgba(100,116,139,0.15)' }}>
                                {job}
                            </span>
                        ))}
                    </div>
                )}

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails();
                    }}
                    className="mt-auto w-full py-2.5 rounded-2xl text-white text-xs font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95"
                    style={{ background: gradient, boxShadow: `0 4px 14px rgba(0,0,0,0.15)` }}
                >
                    View Roadmap <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}

/* ─── Stream Page ────────────────────────────────────────── */
export default function StreamCareersPage() {
    const params = useParams();
    const router = useRouter();
    const streamParam = Array.isArray(params.stream) ? params.stream[0] : params.stream;
    const streamId = streamParam?.toLowerCase() || 'science';

    const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
    const [loading, setLoading] = useState(true);

    const meta = STREAM_META[streamId] || STREAM_META.science;
    const Icon = meta.icon;

    useEffect(() => {
        loadCareerPaths();
    }, [streamId]);

    const loadCareerPaths = useCallback(async () => {
        setLoading(true);
        try {
            const filtered = ALL_CAREERS.filter(c => c.stream.toLowerCase() === streamId);
            setCareerPaths(filtered);
        } catch (error) {
            console.error('Error loading careers:', error);
            const filtered = ALL_CAREERS.filter(c => c.stream.toLowerCase() === streamId);
            setCareerPaths(filtered);
        } finally {
            setLoading(false);
        }
    }, [streamId]);

    return (
        <div className="space-y-5">
            {/* Hero banner */}
            <div className="rounded-3xl p-7 relative overflow-hidden" style={{ background: meta.gradient, boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}>
                <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.5)' }} />
                <div className="absolute bottom-0 left-[35%] w-32 h-32 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.6)' }} />

                <div className="relative z-10">
                    <button
                        onClick={() => router.back()}
                        className="mb-4 flex items-center gap-2 px-3 py-1.5 rounded-lg text-white text-xs font-bold transition-all hover:opacity-80"
                        style={{ background: 'rgba(255,255,255,0.15)' }}
                    >
                        <ArrowLeft className="w-3 h-3" /> Back
                    </button>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.25)' }}>
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white leading-tight">{meta.title}</h1>
                            <p className="text-white/80 text-sm">{meta.subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {meta.stats.map((stat: any, i: number) => (
                    <div key={i} className="rounded-2xl p-5 text-center" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
                        <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: meta.gradient.split(',')[0].slice(-8) }} />
                        <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Career cards grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-72 rounded-3xl animate-pulse" style={{ background: 'rgba(255,255,255,0.6)' }} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {careerPaths.map((career, i) => (
                        <CareerCard
                            key={career.id}
                            career={career}
                            gradient={meta.cardGrads[i % meta.cardGrads.length]}
                            index={i}
                            onViewDetails={() => router.push(`/explore-career-paths/${streamId}/${career.id}`)}
                        />
                    ))}
                </div>
            )}

            {/* Bottom CTA */}
            <div className="rounded-3xl p-6 flex items-center justify-between gap-4" style={{ background: meta.gradient, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}>
                <div>
                    <h3 className="text-white font-black text-lg leading-tight">Ready to explore?</h3>
                    <p className="text-white/75 text-sm mt-1">Take our career assessment to find your perfect path.</p>
                </div>
                <button
                    onClick={() => router.push('/career-quiz')}
                    className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
                    style={{ background: 'rgba(255,255,255,0.95)', color: meta.gradient.split(',')[0].slice(-8), boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
                >
                    Start Quiz <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}