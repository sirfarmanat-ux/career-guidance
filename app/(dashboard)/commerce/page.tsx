'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
    Calculator, Landmark, TrendingUp, Briefcase,
    ChevronDown, ArrowRight, BookOpen, Star,
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

/* ─── Static fallback data for Commerce ──────────────────── */
const COMMERCE_CAREERS: CareerPath[] = [
    { id: '13', title: 'Chartered Accountant', stream: 'Commerce', degree_required: 'B.Com', description: 'Manage accounts, audits and taxation', preparation_for: ['CA Exams', 'Big 4 Firms', 'Govt'], job_opportunities: ['Deloitte', 'KPMG', 'EY'] },
    { id: '14', title: 'Investment Banker', stream: 'Commerce', degree_required: 'BBA', description: 'Manage large financial transactions', preparation_for: ['MBA Finance', 'SEBI', 'Banks'], job_opportunities: ['Goldman Sachs', 'JP Morgan', 'HDFC'] },
    { id: '15', title: 'Marketing Manager', stream: 'Commerce', degree_required: 'BBA', description: 'Drive brand growth and campaigns', preparation_for: ['MBA Marketing', 'Agencies', 'FMCG'], job_opportunities: ['HUL', 'P&G', 'Nestle'] },
    { id: '16', title: 'Entrepreneur', stream: 'Commerce', degree_required: 'BBA', description: 'Build and scale your own business', preparation_for: ['Startup Incubators', 'VC Funding', 'IIM'], job_opportunities: ['Own Startup', 'Accelerators', 'CXO Roles'] },
    { id: '17', title: 'Financial Analyst', stream: 'Commerce', degree_required: 'B.Com', description: 'Analyse financial data and investments', preparation_for: ['CFA', 'SEBI', 'Mutual Funds'], job_opportunities: ['Motilal Oswal', 'Zerodha', 'ICICI'] },
    { id: '18', title: 'HR Manager', stream: 'Commerce', degree_required: 'BBA', description: 'Manage talent and organisational culture', preparation_for: ['MBA HR', 'Corporates', 'Consulting'], job_opportunities: ['Infosys', 'TCS', 'Accenture'] },
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

/* ─── Gradient palette for Commerce ─────────────────────── */
const COMMERCE_GRADIENTS = [
    'linear-gradient(135deg,#ff6b6b 0%,#ffa726 100%)',
    'linear-gradient(135deg,#f7971e 0%,#ffd200 100%)',
    'linear-gradient(135deg,#11998e 0%,#38ef7d 100%)',
    'linear-gradient(135deg,#fc4a1a 0%,#f7b733 100%)',
    'linear-gradient(135deg,#16a085 0%,#f4d03f 100%)',
    'linear-gradient(135deg,#e44d26 0%,#f16529 100%)',
];

const COMMERCE_DEGREES = ['B.Com', 'BBA', 'B.Com (Hons)', 'BMS'];

/* ─── Career Card ────────────────────────────────────────── */
function CareerCard({ career, gradient, index }: { career: CareerPath; gradient: string; index: number }) {
    const [shortlisted, setShortlisted] = useState(false);
    const Icon = ICON_MAP[career.title] || Calculator;

    return (
        <div
            className="rounded-3xl overflow-hidden flex flex-col hover:scale-[1.02] transition-all duration-300 group"
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

                {/* Prepares for */}
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

                {/* Job tags */}
                {career.job_opportunities && career.job_opportunities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {career.job_opportunities.slice(0, 3).map((job, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full text-xs font-medium text-slate-500"
                                style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.15)' }}>
                                {job}
                            </span>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <button
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
export default function CommercePage() {
    const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
    const [selectedDegree, setSelectedDegree] = useState('B.Com');
    const [loading, setLoading] = useState(false);

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
            setCareerPaths(data && data.length > 0 ? data : COMMERCE_CAREERS);
        } catch {
            setCareerPaths(COMMERCE_CAREERS);
        } finally {
            setLoading(false);
        }
    }

    const displayed = careerPaths.length > 0 ? careerPaths : COMMERCE_CAREERS;

    return (
        <div className="space-y-5">

            {/* ── Hero banner ── */}
            <div
                className="rounded-3xl p-7 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg,#ff6b6b,#ffa726)', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}
            >
                {/* Blobs */}
                <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.5)' }} />
                <div className="absolute bottom-0 left-[35%] w-32 h-32 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.6)' }} />
                <div className="absolute top-6 right-[18%] w-10 h-10 rounded-full opacity-25" style={{ background: 'rgba(255,255,255,0.8)' }} />

                <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-white/80" />
                            <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Commerce Careers</span>
                        </div>
                        <h1 className="text-3xl font-black text-white leading-tight mb-2">Commerce Career Paths</h1>
                        <p className="text-white/80 text-sm leading-relaxed max-w-lg">
                            Discover exciting career opportunities in the world of commerce, finance, and business.
                        </p>
                    </div>
                    <div
                        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl flex-shrink-0"
                        style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
                    >
                        <Star className="w-4 h-4 text-yellow-300" fill="#fbbf24" />
                        <span className="text-white text-sm font-semibold">{displayed.length * 890}+ students exploring</span>
                    </div>
                </div>
            </div>

            {/* ── Controls row ── */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Degree dropdown */}
                <div className="relative">
                    <select
                        value={selectedDegree}
                        onChange={e => setSelectedDegree(e.target.value)}
                        className="appearance-none pl-4 pr-9 py-2.5 rounded-2xl text-sm font-semibold text-slate-700 outline-none cursor-pointer transition-all hover:shadow-md"
                        style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                    >
                        {COMMERCE_DEGREES.map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
            </div>

            {/* ── Stats strip ── */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Career Paths', value: `${displayed.length}+` },
                    { label: 'Avg. Salary', value: '₹6–18 LPA' },
                    { label: 'Top Recruiters', value: '300+' },
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
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-72 rounded-3xl animate-pulse"
                            style={{ background: 'rgba(255,255,255,0.6)' }} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayed.map((career, i) => (
                        <CareerCard
                            key={career.id}
                            career={career}
                            gradient={COMMERCE_GRADIENTS[i % COMMERCE_GRADIENTS.length]}
                            index={i}
                        />
                    ))}
                </div>
            )}

            {/* ── Bottom CTA ── */}
            <div
                className="rounded-3xl p-6 flex items-center justify-between gap-4"
                style={{ background: 'linear-gradient(135deg,#ff6b6b,#ffa726)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}
            >
                <div>
                    <h3 className="text-white font-black text-lg leading-tight">Ready to start your commerce journey?</h3>
                    <p className="text-white/75 text-sm mt-1">Take our aptitude quiz to get personalized career recommendations.</p>
                </div>
                <button
                    className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
                    style={{ background: 'rgba(255,255,255,0.95)', color: '#ff6b6b', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
                >
                    Take Quiz <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}