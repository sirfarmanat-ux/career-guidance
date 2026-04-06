'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CircleCheck as CheckCircle2,
  Circle,
  FlaskConical,
  Palette,
  TrendingUp,
  RefreshCw,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';

/* ─── Design tokens ─────────────────────────────────────── */
const GRAD = {
  science: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  arts: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  commerce: 'linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%)',
  page: 'linear-gradient(135deg, #ff6b9d 0%, #ff8c42 40%, #ff6b6b 70%, #c95cf4 100%)',
  quiz: 'linear-gradient(135deg, #667eea 0%, #764ba2 60%, #f5576c 100%)',
};

/* ─── Data ─────────────────────────────────────────────── */
const QUESTIONS = [
  {
    question: 'Which subjects do you enjoy the most?',
    options: ['Science & Mathematics', 'Languages & Literature', 'Business & Economics', 'Arts & Design']
  },
  {
    question: 'What type of career appeals to you?',
    options: ['Technology & Innovation', 'Creative & Artistic', 'Business & Management', 'Research & Analysis']
  },
  {
    question: 'How do you prefer to work?',
    options: ['Independently', 'In teams', 'Mix of both', 'Leading others']
  },
  {
    question: 'What motivates you the most?',
    options: ['Solving problems', 'Helping others', 'Creating new things', 'Achieving goals']
  },
];

const STREAMS = [
  {
    id: 'science', label: 'Science', icon: FlaskConical,
    gradient: GRAD.science, students: '12.4k',
    courses: [
      { name: 'B.Sc.', sub: 'Computer Science' },
      { name: 'B.Pharma', sub: 'Pharmacy' },
      { name: 'BCA', sub: 'Computer Applications' },
      { name: 'B.Nursing', sub: 'Nursing Science' },
    ],
  },
  {
    id: 'arts', label: 'Arts', icon: Palette,
    gradient: GRAD.arts, students: '8.7k',
    courses: [
      { name: 'B.A.', sub: 'Bachelor of Arts' },
      { name: 'BFA', sub: 'Bachelor of Fine Arts' },
      { name: 'BHM', sub: 'Bachelor of Hotel Management' },
      { name: 'B.Des', sub: 'Bachelor of Design' },
    ],
  },
  {
    id: 'commerce', label: 'Commerce', icon: TrendingUp,
    gradient: GRAD.commerce, students: '10.2k',
    courses: [
      { name: 'B.Com', sub: 'Bachelor of Commerce' },
      { name: 'BBA', sub: 'Business Administration' },
      { name: 'CA/CS', sub: 'Chartered Accountant' },
      { name: 'BMS', sub: 'Management Studies' },
    ],
  },
];

const RESULT_COURSES = [
  { name: 'B.Sc. Computer Science', match: 95, description: 'Perfect for problem solvers passionate about technology and logic.', careers: ['Software Developer', 'Data Scientist', 'AI Engineer'], color: '#667eea' },
  { name: 'B.Tech Information Technology', match: 88, description: 'Ideal for those who love building software systems and networks.', careers: ['Web Developer', 'System Analyst', 'Network Engineer'], color: '#f5576c' },
  { name: 'B.Sc. Mathematics', match: 75, description: 'Great for analytical thinkers who thrive with numbers and logic.', careers: ['Data Analyst', 'Statistician', 'Actuarial Scientist'], color: '#ff8c42' },
];

const TABS = ['Suggested Streams', 'Compare Streams', 'All Streams'];

/* ─── Suggested Streams Data ────────────────────────── */
const SUGGESTED_STREAMS = [
  {
    id: 'science',
    label: 'Science',
    icon: FlaskConical,
    gradient: GRAD.science,
    match: 92,
    reason: 'Based on your interest in problem-solving and technology',
    strengths: ['Logical thinking', 'Analytical skills', 'Innovation'],
    courses: ['B.Sc. Computer Science', 'B.Tech', 'B.Pharma'],
    careers: ['Software Developer', 'Data Scientist', 'Research Scientist'],
    salary: '₹8-15 LPA',
    growth: 'High',
  },
  {
    id: 'commerce',
    label: 'Commerce',
    icon: TrendingUp,
    gradient: GRAD.commerce,
    match: 78,
    reason: 'Your business-oriented mindset and goal achievement focus',
    strengths: ['Business acumen', 'Leadership', 'Financial literacy'],
    courses: ['BBA', 'B.Com', 'CA'],
    careers: ['Investment Banker', 'Entrepreneur', 'Management Consultant'],
    salary: '₹6-12 LPA',
    growth: 'High',
  },
  {
    id: 'arts',
    label: 'Arts',
    icon: Palette,
    gradient: GRAD.arts,
    match: 65,
    reason: 'Creative aspects of your personality',
    strengths: ['Creativity', 'Communication', 'Adaptability'],
    courses: ['B.A.', 'BFA', 'B.Des'],
    careers: ['Graphic Designer', 'Content Creator', 'UX Designer'],
    salary: '₹4-8 LPA',
    growth: 'Medium',
  },
];

/* ─── Comparison Data ──────────────────────────────────── */
const COMPARISON_DATA = {
  science: {
    pros: ['High salary potential', 'Job security', 'Innovation opportunities', 'Global demand'],
    cons: ['High competition', 'Continuous learning required', 'Work-life balance challenges'],
    difficulty: 'High',
    jobMarket: 'Excellent',
    futureOutlook: 'Very Positive',
  },
  arts: {
    pros: ['Creative freedom', 'Flexible work', 'Personal fulfillment', 'Diverse opportunities'],
    cons: ['Variable income', 'Subjective success metrics', 'Less structured path'],
    difficulty: 'Medium',
    jobMarket: 'Growing',
    futureOutlook: 'Positive',
  },
  commerce: {
    pros: ['Stable careers', 'Entrepreneurial opportunities', 'Good work-life balance', 'Transferable skills'],
    cons: ['High competition in some areas', 'May require additional certifications'],
    difficulty: 'Medium',
    jobMarket: 'Strong',
    futureOutlook: 'Positive',
  },
};

/* ─── Suggested Stream Card ───────────────────────────── */
function SuggestedStreamCard({ stream }: { stream: typeof SUGGESTED_STREAMS[0] }) {
  const router = useRouter();
  const Icon = stream.icon;
  return (
    <div
      className="rounded-3xl overflow-hidden flex flex-col hover:scale-[1.02] transition-all duration-300 cursor-pointer"
      style={{ background: stream.gradient, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
    >
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.25)' }}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">{stream.label}</span>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: 'rgba(255,255,255,0.25)' }}>
            {stream.match}% Match
          </span>
        </div>
        <p className="text-white/80 text-sm mb-3">{stream.reason}</p>
        <div className="h-2 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${stream.match}%` }} />
        </div>
      </div>

      <div className="mx-5 mb-3" style={{ height: '1px', background: 'rgba(255,255,255,0.2)' }} />

      <div className="flex-1 px-5 pb-2 space-y-3">
        <div>
          <p className="text-white font-semibold text-sm mb-2">Key Strengths:</p>
          <div className="flex flex-wrap gap-1.5">
            {stream.strengths.map((s, i) => (
              <span key={i} className="px-2 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-white font-semibold text-sm mb-2">Popular Courses:</p>
          <div className="space-y-1">
            {stream.courses.slice(0, 2).map((c, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-white/90">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                {c}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div>
            <p className="text-white/70">Avg. Salary</p>
            <p className="text-white font-semibold">{stream.salary}</p>
          </div>
          <div>
            <p className="text-white/70">Growth</p>
            <p className="text-white font-semibold">{stream.growth}</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <button
          onClick={() => router.push(`/explore-career-paths/${stream.id}`)}
          className="w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          style={{ background: 'rgba(255,255,255,0.25)', color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}
        >
          Explore Careers <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ─── Comparison View ─────────────────────────────────── */
function ComparisonView() {
  const router = useRouter();
  const [selectedStreams, setSelectedStreams] = useState<string[]>(['science', 'commerce']);

  const toggleStream = (streamId: string) => {
    setSelectedStreams(prev =>
      prev.includes(streamId)
        ? prev.filter(id => id !== streamId)
        : prev.length < 3 ? [...prev, streamId] : prev
    );
  };

  return (
    <div className="space-y-5">
      {/* Stream Selector */}
      <div className="rounded-3xl p-6" style={{ ...glassWhite, boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
        <h3 className="text-lg font-bold text-slate-800 mb-4">Select Streams to Compare</h3>
        <div className="flex flex-wrap gap-3">
          {STREAMS.map(stream => {
            const Icon = stream.icon;
            const isSelected = selectedStreams.includes(stream.id);
            return (
              <button
                key={stream.id}
                onClick={() => toggleStream(stream.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200"
                style={{
                  background: isSelected ? stream.gradient : 'rgba(255,255,255,0.5)',
                  color: isSelected ? 'white' : '#64748b',
                  border: isSelected ? 'none' : '1px solid rgba(100,116,139,0.2)',
                  boxShadow: isSelected ? `0 4px 14px rgba(0,0,0,0.15)` : 'none'
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{stream.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="rounded-3xl overflow-hidden" style={{ ...glassWhite, boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left p-4 font-bold text-slate-800">Aspect</th>
                {selectedStreams.map(streamId => {
                  const stream = STREAMS.find(s => s.id === streamId)!;
                  const Icon = stream.icon;
                  return (
                    <th key={streamId} className="text-center p-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: stream.gradient }}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-slate-800">{stream.label}</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-4 font-semibold text-slate-700">Difficulty Level</td>
                {selectedStreams.map(streamId => (
                  <td key={streamId} className="p-4 text-center">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{
                      background: COMPARISON_DATA[streamId as keyof typeof COMPARISON_DATA].difficulty === 'High' ? '#ef4444' :
                        COMPARISON_DATA[streamId as keyof typeof COMPARISON_DATA].difficulty === 'Medium' ? '#f59e0b' : '#10b981'
                    }}>
                      {COMPARISON_DATA[streamId as keyof typeof COMPARISON_DATA].difficulty}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-4 font-semibold text-slate-700">Job Market</td>
                {selectedStreams.map(streamId => (
                  <td key={streamId} className="p-4 text-center">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{
                      background: COMPARISON_DATA[streamId as keyof typeof COMPARISON_DATA].jobMarket === 'Excellent' ? '#10b981' :
                        COMPARISON_DATA[streamId as keyof typeof COMPARISON_DATA].jobMarket === 'Strong' ? '#3b82f6' : '#8b5cf6'
                    }}>
                      {COMPARISON_DATA[streamId as keyof typeof COMPARISON_DATA].jobMarket}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-4 font-semibold text-slate-700">Future Outlook</td>
                {selectedStreams.map(streamId => (
                  <td key={streamId} className="p-4 text-center">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{
                      background: COMPARISON_DATA[streamId as keyof typeof COMPARISON_DATA].futureOutlook === 'Very Positive' ? '#10b981' :
                        COMPARISON_DATA[streamId as keyof typeof COMPARISON_DATA].futureOutlook === 'Positive' ? '#3b82f6' : '#f59e0b'
                    }}>
                      {COMPARISON_DATA[streamId as keyof typeof COMPARISON_DATA].futureOutlook}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-700">Key Advantages</td>
                {selectedStreams.map(streamId => (
                  <td key={streamId} className="p-4">
                    <div className="space-y-1">
                      {COMPARISON_DATA[streamId as keyof typeof COMPARISON_DATA].pros.slice(0, 2).map((pro, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-green-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                          {pro}
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {selectedStreams.map(streamId => {
          const stream = STREAMS.find(s => s.id === streamId)!;
          const comparison = COMPARISON_DATA[streamId as keyof typeof COMPARISON_DATA];
          const Icon = stream.icon;

          return (
            <div key={streamId} className="rounded-3xl p-6" style={{ ...glassWhite, boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: stream.gradient }}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{stream.label} Stream</h3>
                  <p className="text-sm text-slate-500">{stream.students} students enrolled</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Advantages
                  </h4>
                  <div className="space-y-1">
                    {comparison.pros.map((pro, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-0.5" />
                        {pro}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    Challenges
                  </h4>
                  <div className="space-y-1">
                    {comparison.cons.map((con, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-0.5" />
                        {con}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push(`/explore-career-paths/${streamId}`)}
                className="w-full mt-6 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95"
                style={{ background: stream.gradient, color: 'white', boxShadow: `0 4px 14px rgba(0,0,0,0.15)` }}
              >
                Explore {stream.label} Careers <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── All Streams View ────────────────────────────────── */
function AllStreamsView() {
  const router = useRouter();
  return (
    <div className="space-y-5">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STREAMS.map(stream => {
          const Icon = stream.icon;
          return (
            <div key={stream.id} className="rounded-3xl p-6 text-center" style={{ ...glassWhite, boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4" style={{ background: stream.gradient }}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">{stream.label}</h3>
              <p className="text-sm text-slate-500 mb-2">{stream.students} students</p>
              <p className="text-xs text-slate-400">{stream.courses.length} courses available</p>
            </div>
          );
        })}
      </div>

      {/* Stream Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STREAMS.map(s => <StreamCard key={s.id} stream={s} onViewCareers={() => router.push(`/explore-career-paths/${s.id}`)} />)}
      </div>

      {/* Career Path Preview */}
      <div className="rounded-3xl p-6" style={{ ...glassWhite, boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-black text-slate-800">Popular Career Paths</h2>
            <p className="text-xs text-slate-400 mt-0.5">Discover where each degree can take you</p>
          </div>
          <button
            onClick={() => router.push('/explore-career-paths')}
            className="text-sm font-bold flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
            style={{ color: '#ff6b9d' }}
          >
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { degree: 'B.Sc. Computer Science', roles: ['Software Developer', 'Data Scientist'], grad: GRAD.science, emoji: '💻', stream: 'science' },
            { degree: 'B.Com', roles: ['Accountant', 'Financial Analyst'], grad: GRAD.commerce, emoji: '📊', stream: 'commerce' },
            { degree: 'B.A. Psychology', roles: ['Counsellor', 'HR Manager'], grad: GRAD.arts, emoji: '🎨', stream: 'arts' },
          ].map((path, i) => (
            <div
              key={i}
              onClick={() => router.push(`/explore-career-paths/${path.stream}`)}
              className="rounded-2xl p-4 relative overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
              style={{ background: path.grad, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
            >
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.5)' }} />
              <div className="relative z-10">
                <span className="text-2xl mb-2 block">{path.emoji}</span>
                <p className="text-white font-black text-sm mb-2 leading-tight">{path.degree}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {path.roles.map((r, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(255,255,255,0.25)', color: 'white' }}>
                      {r}
                    </span>
                  ))}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); router.push(`/explore-career-paths/${path.stream}`); }}
                  className="text-xs font-bold flex items-center gap-1 text-white/90 hover:text-white"
                >
                  Explore Paths <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Shared glass card style ─── */
const glassWhite: React.CSSProperties = {
  background: 'rgba(255,255,255,0.92)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.6)',
};

/* ─── Stream Card ─────────────────────────────────────── */
function StreamCard({ stream, onViewCareers }: { stream: typeof STREAMS[0]; onViewCareers: () => void }) {
  const Icon = stream.icon;
  return (
    <div
      className="rounded-3xl overflow-hidden flex flex-col hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
      style={{ background: stream.gradient, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
    >
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.25)' }}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">{stream.label}</span>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.25)', color: 'white' }}>
          {stream.students} students
        </span>
      </div>
      <div className="mx-5 mb-3" style={{ height: '1px', background: 'rgba(255,255,255,0.2)' }} />
      <div className="flex-1 px-5 pb-2 space-y-3">
        {stream.courses.map((c, i) => (
          <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0 opacity-80" />
            <div>
              <p className="text-white font-semibold text-sm leading-tight">{c.name}</p>
              <p className="text-white/70 text-xs mt-0.5">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-5">
        <button
          onClick={onViewCareers}
          className="w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          style={{ background: 'rgba(255,255,255,0.25)', color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}
        >
          View Careers <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ─── Result Card ─────────────────────────────────────── */
function ResultCard({ course, rank }: { course: typeof RESULT_COURSES[0]; rank: number }) {
  return (
    <div
      className="rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 relative overflow-hidden"
      style={{ ...glassWhite, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
    >
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10" style={{ background: course.color }} />
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {rank === 0 && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg,#ff6b9d,#ff8c42)' }}>
                <Star className="w-3 h-3" /> Top Pick
              </span>
            )}
            <h3 className="text-base font-bold text-slate-800">{course.name}</h3>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: course.color }}>
              {course.match}% Match
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-3">{course.description}</p>
          <div className="h-2 rounded-full bg-slate-100 mb-3 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${course.match}%`, background: `linear-gradient(90deg, ${course.color}, ${course.color}aa)` }} />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {course.careers.map((c, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: course.color + '15', color: course.color }}>
                {c}
              </span>
            ))}
          </div>
        </div>
        <button
          className="flex-shrink-0 px-4 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95"
          style={{ background: course.color, boxShadow: `0 4px 14px ${course.color}55` }}
        >
          Explore
        </button>
      </div>
    </div>
  );
}

/* ─── Quiz View ─────────────────────────────────────────── */
function QuizView({ onClose, onComplete }: { onClose: () => void; onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (opt: string) => {
    const next = { ...answers, [current]: opt };
    setAnswers(next);
    if (current < QUESTIONS.length - 1) {
      setCurrent(q => q + 1);
    } else {
      onComplete();
    }
  };

  const progress = ((current + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-[500px] rounded-3xl overflow-hidden relative" style={{ background: GRAD.quiz, boxShadow: '0 30px 80px rgba(102,126,234,0.4)' }}>
      <div className="absolute top-[-60px] right-[-60px] w-48 h-48 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.4)' }} />
      <div className="absolute bottom-[-40px] left-[-40px] w-32 h-32 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.6)' }} />
      <div className="relative z-10 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/70 text-sm font-medium">Question {current + 1} of {QUESTIONS.length}</p>
            <h2 className="text-white font-bold text-xl mt-1">{QUESTIONS[current].question}</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white" style={{ background: 'rgba(255,255,255,0.15)' }}>
            ✕
          </button>
        </div>
        <div className="h-1.5 rounded-full mb-8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="space-y-3">
          {QUESTIONS[current].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200 group hover:scale-[1.01]"
              style={{ background: answers[current] === opt ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              {answers[current] === opt
                ? <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                : <Circle className="w-5 h-5 text-white/50 group-hover:text-white flex-shrink-0" />
              }
              <span className="text-white font-medium">{opt}</span>
            </button>
          ))}
        </div>
        {current > 0 && (
          <button onClick={() => setCurrent(q => q - 1)} className="mt-6 px-5 py-2.5 rounded-xl text-white/80 text-sm font-medium hover:text-white" style={{ background: 'rgba(255,255,255,0.1)' }}>
            ← Previous
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function CourseSuggestionsPage() {
  const [showResults, setShowResults] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  if (showQuiz) {
    return (
      <div className="space-y-5">
        <QuizView
          onClose={() => setShowQuiz(false)}
          onComplete={() => { setShowResults(true); setShowQuiz(false); }}
        />
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="space-y-5">
        <div className="rounded-3xl p-7 relative overflow-hidden" style={{ background: GRAD.page, boxShadow: '0 20px 60px rgba(255,107,157,0.35)' }}>
          <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.4)' }} />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-white" />
                <span className="text-white/80 text-sm font-semibold uppercase tracking-widest">Your Results</span>
              </div>
              <h1 className="text-3xl font-black text-white leading-tight mb-1">Personalized<br />Recommendations</h1>
              <p className="text-white/75 text-sm">Matched to your quiz results</p>
            </div>
            <button
              onClick={() => setShowResults(false)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-white text-sm font-bold flex-shrink-0 transition-all hover:scale-105 active:scale-95"
              style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}
            >
              <RefreshCw className="w-4 h-4" /> Re-evaluate
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {RESULT_COURSES.map((c, i) => <ResultCard key={i} course={c} rank={i} />)}
        </div>
        <button
          className="w-full py-4 rounded-2xl font-black text-white text-base flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95"
          style={{ background: GRAD.page, boxShadow: '0 8px 30px rgba(255,107,157,0.4)' }}
        >
          Find Colleges Offering These Courses <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Hero header */}
      <div className="rounded-3xl p-7 relative overflow-hidden" style={{ background: GRAD.page, boxShadow: '0 20px 60px rgba(255,107,157,0.3)' }}>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.5)' }} />
        <div className="absolute bottom-0 left-[30%] w-28 h-28 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.6)' }} />
        <div className="absolute top-8 right-[20%] w-12 h-12 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.8)' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-white/80" />
            <span className="text-white/80 text-xs font-bold uppercase tracking-widest">AI-Powered</span>
          </div>
          <h1 className="text-3xl font-black text-white leading-tight mb-2">Career Suggestions</h1>
          <p className="text-white/80 text-sm leading-relaxed max-w-lg">
            Based on your aptitude quiz results, we suggest streams and degrees that align with your interests and strengths.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={() => setShowQuiz(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
              style={{ background: 'rgba(255,255,255,0.95)', color: '#ff6b9d', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
            >
              <RefreshCw className="w-4 h-4" /> Re-evaluate
            </button>
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-white text-sm font-semibold">3.8k students matched today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs + filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 p-1 rounded-2xl" style={glassWhite}>
          {TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
              style={activeTab === i
                ? { background: GRAD.page, color: 'white', boxShadow: '0 4px 14px rgba(255,107,157,0.4)' }
                : { color: '#94a3b8' }}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === 0 && (
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold text-slate-600 transition-all hover:shadow-md"
            style={glassWhite}
          >
            Interests: Science, Technology <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === 0 && (
        /* Suggested Streams */
        <div className="space-y-5">
          <div className="rounded-3xl p-6" style={{ ...glassWhite, boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <div>
                <h2 className="text-lg font-bold text-slate-800">Personalized Recommendations</h2>
                <p className="text-sm text-slate-500">Based on your quiz responses and interests</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {SUGGESTED_STREAMS.map(s => <SuggestedStreamCard key={s.id} stream={s} />)}
            </div>
          </div>
        </div>
      )}

      {activeTab === 1 && <ComparisonView />}

      {activeTab === 2 && <AllStreamsView />}
    </div>
  );
}