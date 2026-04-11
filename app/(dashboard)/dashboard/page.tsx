'use client';

import { useUserContext } from '@/hooks/user-context';
import { GraduationCap, Briefcase, Building2, ChevronRight, Palette, FlaskConical, TrendingUp, ArrowRight, MapPin, Calendar, BookOpen } from 'lucide-react';
import Link from 'next/link';

const SPEC_MAP: Record<string, any> = {
  btech_cse: { specialization_id: 'btech_cse', specialization_name: 'Computer Science (CSE)', course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', psychometric_traits: ['logical', 'analytical', 'problem_solver', 'tech_curious', 'detail_oriented'], career_paths: ['Software Engineer', 'Backend Developer', 'System Architect', 'Cybersecurity Analyst'], demand: 'Exponential', salary: '₹8L - ₹24L+', brief: 'You possess a hyper-logical cognitive framework. You excel at breaking down massive, complex problems into scalable digital logic.' },
  btech_it: { specialization_id: 'btech_it', specialization_name: 'Information Tech (IT)', course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', psychometric_traits: ['tech_curious', 'systems_thinker', 'organized', 'practical', 'collaborative'], career_paths: ['IT Consultant', 'Network Engineer', 'Cloud Architect', 'DevOps Analyst'], demand: 'Very High', salary: '₹6L - ₹18L+', brief: 'You are an exceptional systems thinker. You thrive on integrating sprawling technological infrastructure into reliable, human-accessible tools.' },
  btech_aiml: { specialization_id: 'btech_aiml', specialization_name: 'AI/ML Engineering', course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', psychometric_traits: ['curious', 'mathematical', 'research_oriented', 'innovative', 'data_driven'], career_paths: ['ML Engineer', 'Data Scientist', 'AI Researcher', 'Vision Engineer'], demand: 'Critical Deficit', salary: '₹12L - ₹30L+', brief: 'You are mathematically driven and deeply curious. This path allows you to train neural networks and process unstructured data at scale.' },
  btech_ds: { specialization_id: 'btech_ds', specialization_name: 'Data Science', course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', psychometric_traits: ['analytical', 'mathematical', 'data_driven', 'curious', 'statistical_thinking'], career_paths: ['Data Analyst', 'Data Engineer', 'BI Analyst', 'Quant Analyst'], demand: 'Exponential', salary: '₹9L - ₹22L+', brief: 'You view the world through statistical truths. Your profile is heavily skewed towards uncovering hidden market patterns from raw noise.' },
  btech_mech: { specialization_id: 'btech_mech', specialization_name: 'Mechanical Engineering', course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', psychometric_traits: ['hands_on', 'mechanical_aptitude', 'design_thinking', 'practical', 'problem_solver'], career_paths: ['Mech Engineer', 'Design Engineer', 'Aerospace Specialist', 'Robotics'], demand: 'Steady High', salary: '₹6L - ₹16L+', brief: 'You are deeply practical and mechanically aware. You intuitively grasp physics, thermodynamics, and physical kinetic systems.' },
  btech_civil: { specialization_id: 'btech_civil', specialization_name: 'Civil Engineering', course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', psychometric_traits: ['structured_thinker', 'spatial_reasoning', 'patient', 'detail_oriented', 'outdoor_oriented'], career_paths: ['Civil Engineer', 'Structural Lead', 'Urban Planner', 'City Infrastructure'], demand: 'Stable', salary: '₹5L - ₹14L+', brief: 'You possess massive spatial reasoning capacity and extreme patience, making you perfectly suited to architecting permanent global infrastructure.' },
  btech_ece: { specialization_id: 'btech_ece', specialization_name: 'Electronics (ECE)', course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', psychometric_traits: ['technical', 'electronics_curious', 'systematic', 'analytical', 'hardware_oriented'], career_paths: ['Embedded Engineer', 'VLSI Designer', 'Telecom Architect', 'IoT Dev'], demand: 'High', salary: '₹7L - ₹20L+', brief: 'Your brain thrives exactly at the intersection of logical programming and hard physical circuitry, ideal for micro-processor engineering.' },
  btech_electrical: { specialization_id: 'btech_electrical', specialization_name: 'Electrical Engineering', course_id: 'btech', course_name: 'B.Tech / B.E.', stream: 'science', psychometric_traits: ['systematic', 'technical', 'math_oriented', 'problem_solver', 'precision_focused'], career_paths: ['Power Systems', 'Renewable Energy', 'Control Systems', 'PSU Officer'], demand: 'High', salary: '₹6L - ₹18L+', brief: 'You respect high-stakes precision. Your profile matches perfectly with the individuals building the smart-grids and massive energy networks of the future.' },
  bca_softdev: { specialization_id: 'bca_softdev', specialization_name: 'Software Dev (BCA)', course_id: 'bca', course_name: 'BCA', stream: 'science', psychometric_traits: ['logical', 'coding_enthusiast', 'problem_solver', 'creative', 'detail_oriented'], career_paths: ['Software Dev', 'Full Stack Dev', 'Backend Engineer', 'DevOps Engineer'], demand: 'Very High', salary: '₹5L - ₹15L+', brief: 'A fast-track logical thinker. You want to immediately dive into coding infrastructures, skipping heavy physics for pure digital engineering.' },
  bca_webdev: { specialization_id: 'bca_webdev', specialization_name: 'Web Dev (BCA)', course_id: 'bca', course_name: 'BCA', stream: 'science', psychometric_traits: ['creative', 'visual_thinker', 'tech_savvy', 'user_empathy', 'fast_learner'], career_paths: ['Frontend Dev', 'UI Engineer', 'Interactive Designer', 'Web Producer'], demand: 'High', salary: '₹4L - ₹12L+', brief: 'You possess deep user-empathy combined with technical capability. You dictate how people emotionally interact with digital interfaces.' },
  bca_aiml: { specialization_id: 'bca_aiml', specialization_name: 'AI & Data (BCA)', course_id: 'bca', course_name: 'BCA', stream: 'science', psychometric_traits: ['data_driven', 'mathematical', 'curious', 'innovative', 'research_oriented'], career_paths: ['Junior ML Dev', 'Data Analyst', 'Prompt Engineer', 'AI Associate'], demand: 'Rapidly Rising', salary: '₹6L - ₹14L+', brief: 'You are deeply fascinated by automation and algorithmic evolution, preferring applied mathematics to leverage existing AI models.' },
  bba_marketing: { specialization_id: 'bba_marketing', specialization_name: 'Marketing (BBA)', course_id: 'bba', course_name: 'BBA', stream: 'commerce', psychometric_traits: ['extroverted', 'persuasive', 'creative', 'social', 'trend_aware'], career_paths: ['Marketing Manager', 'Brand Director', 'Growth Hacker', 'Sales Lead'], demand: 'Very High', salary: '₹6L - ₹18L+', brief: 'You are wildly persuasive and socially attuned. You intuitively understand market psychology, making you highly dangerous in viral acquisition.' },
  bba_finance: { specialization_id: 'bba_finance', specialization_name: 'Finance (BBA)', course_id: 'bba', course_name: 'BBA', stream: 'commerce', psychometric_traits: ['analytical', 'numerical', 'risk_aware', 'disciplined', 'strategic_thinker'], career_paths: ['Finance Analyst', 'Investment Banker', 'Equity Research', 'Hedge Fund Assoc'], demand: 'High', salary: '₹7L - ₹20L+', brief: 'You are disciplined, ruthless with numbers, and highly risk-aware. You are built to command Excel models and allocate immense corporate capital.' },
  llb_corporate: { specialization_id: 'llb_corporate', specialization_name: 'Corporate Law', course_id: 'llb', course_name: 'LLB / BA LLB', stream: 'independent', psychometric_traits: ['analytical', 'persuasive', 'detail_oriented', 'business_minded', 'strategic'], career_paths: ['Corporate Lawyer', 'In-house Counsel', 'M&A Negotiator', 'Compliance'], demand: 'Steady', salary: '₹8L - ₹25L+', brief: 'You thrive in structurally complex, high-pressure environments, wielding language and precedent to enforce multi-million dollar business contracts.' },
  bcom_accounting_finance: { specialization_id: 'bcom_accounting_finance', specialization_name: 'Accounting & Finance', course_id: 'bcom', course_name: 'B.Com', stream: 'commerce', psychometric_traits: ['numerical', 'precise', 'rule_follower', 'disciplined', 'detail_oriented'], career_paths: ['Chartered Accountant', 'Auditor', 'Forensic Audit', 'Tax Consultant'], demand: 'Consistent', salary: '₹7L - ₹18L+', brief: 'You are the quantitative backbone of industry. Your brain demands absolute precision, allowing you to maintain audited truths of global business.' },
  bsc_cs: { specialization_id: 'bsc_cs', specialization_name: 'Computer Science (BSc)', course_id: 'bsc', course_name: 'B.Sc', stream: 'science', psychometric_traits: ['logical', 'tech_curious', 'mathematical', 'problem_solver', 'systematic'], career_paths: ['Software Dev', 'Systems Programmer', 'IT Consultant', 'MCA Candidate'], demand: 'High', salary: '₹4L - ₹12L+', brief: 'You are fundamentally systematic and heavily mathematical, opting for deep theoretical mastery of computing alongside practical coding.' },
  bdes_uiux: { specialization_id: 'bdes_uiux', specialization_name: 'UI/UX Interactive Design', course_id: 'bdes', course_name: 'B.Des', stream: 'independent', psychometric_traits: ['empathetic', 'visual_thinker', 'creative', 'user_centric', 'tech_comfortable'], career_paths: ['UX Researcher', 'Product Designer', 'Interaction Lead', 'Design System Mgr'], demand: 'Very High', salary: '₹7L - ₹20L+', brief: 'You bridge human psychology with technology. You have an extremely high visual-spatial IQ and dictate the mental models of users globally.' },
  bjmc_journalism: { specialization_id: 'bjmc_journalism', specialization_name: 'Journalism / Media', course_id: 'bjmc', course_name: 'BJMC', stream: 'independent', psychometric_traits: ['curious', 'communicative', 'investigative', 'socially_aware', 'storyteller'], career_paths: ['Investigator', 'News Anchor', 'Editor-in-Chief', 'Digital Media Producer'], demand: 'Evolving', salary: '₹4L - ₹12L+', brief: 'You are endlessly curious and fiercely socially aware. You excel at extracting the signal from the noise and broadcasting absolute truth to the world.' },
  mbbs_general: { specialization_id: 'mbbs_general', specialization_name: 'Medicine (MBBS)', course_id: 'mbbs', course_name: 'MBBS', stream: 'science', psychometric_traits: ['empathetic', 'scientific', 'patient', 'decisive_under_pressure', 'service_oriented'], career_paths: ['General Physician', 'Specialist Surgeon', 'Neurologist', 'Medical Researcher'], demand: 'Critical Never-Ending', salary: '₹12L - ₹35L+', brief: 'You have immense academic resilience and a deeply service-oriented soul. You operate flawlessly under extreme biological pressure.' }
};

const courseStreams = [
  {
    name: 'Arts',
    tagline: 'Express & Explore',
    icon: Palette,
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    lightBg: 'from-violet-50 to-purple-50',
    accentColor: 'text-violet-600',
    borderColor: 'border-violet-200',
    dotColor: 'bg-violet-500',
    btnGradient: 'from-violet-500 to-purple-600',
    btnShadow: 'shadow-violet-200',
    suggestions: ['B.A. (Bachelor of Arts)', 'BFA (Fine Arts)', 'BHM (Hotel Mgmt)'],
    careers: ['Designer', 'Writer', 'Curator'],
    students: '2.4k',
  },
  {
    name: 'Science',
    tagline: 'Discover & Innovate',
    icon: FlaskConical,
    gradient: 'from-sky-500 via-blue-500 to-indigo-500',
    lightBg: 'from-sky-50 to-blue-50',
    accentColor: 'text-sky-600',
    borderColor: 'border-sky-200',
    dotColor: 'bg-sky-500',
    btnGradient: 'from-sky-500 to-blue-600',
    btnShadow: 'shadow-sky-200',
    suggestions: ['B.Sc. (Science)', 'B.Pharma', 'BCA & Nursing'],
    careers: ['Engineer', 'Doctor', 'Researcher'],
    students: '4.1k',
  },
  {
    name: 'Commerce',
    tagline: 'Lead & Grow',
    icon: TrendingUp,
    gradient: 'from-rose-500 via-pink-500 to-orange-400',
    lightBg: 'from-rose-50 to-pink-50',
    accentColor: 'text-rose-600',
    borderColor: 'border-rose-200',
    dotColor: 'bg-rose-500',
    btnGradient: 'from-rose-500 to-pink-600',
    btnShadow: 'shadow-rose-200',
    suggestions: ['B.Com (Commerce)', 'BBA & GA', 'CA / CS / BHM'],
    careers: ['Banker', 'CA', 'Entrepreneur'],
    students: '3.8k',
  },
];

const careerPaths = [
  {
    degree: 'B.Sc.',
    college: 'City Government Degree College',
    date: '20 Apr, 2021',
    jobs: [
      { title: 'Lab Technician', tag: 'Beginner', color: 'bg-emerald-100 text-emerald-700' },
      { title: 'Software Developer', tag: 'Advanced', color: 'bg-blue-100 text-blue-700' },
      { title: 'Medical Professional', tag: 'Expert', color: 'bg-purple-100 text-purple-700' },
    ],
  },
];

export default function DashboardPage() {
  const {user} = useUserContext();

  const getSuggestions = () => {
    if (user?.psychometricResults?.recommendations && user.psychometricResults.recommendations.length > 0) {
      return user.psychometricResults.recommendations.map(id => {
        const spec = SPEC_MAP[id];
        if (!spec) return null;
        return {
          name: spec.specialization_name,
          tagline: spec.brief.substring(0, 50) + '...',
          icon: GraduationCap, // default icon
          gradient: 'from-emerald-500 via-teal-500 to-cyan-500', // default gradient
          lightBg: 'from-emerald-50 to-teal-50',
          accentColor: 'text-emerald-600',
          borderColor: 'border-emerald-200',
          dotColor: 'bg-emerald-500',
          btnGradient: 'from-emerald-500 to-teal-600',
          btnShadow: 'shadow-emerald-200',
          suggestions: [spec.course_name],
          careers: spec.career_paths.slice(0, 3),
          students: spec.demand === 'Exponential' ? 'High Demand' : spec.demand,
        };
      }).filter(Boolean);
    }
    return courseStreams;
  };

  const suggestions = getSuggestions();
  return (
    <div className="space-y-8">

      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden min-h-[140px] sm:min-h-[170px] flex items-center"
        style={{ background: 'linear-gradient(135deg, #3B5FCC 0%, #5B7FDB 40%, #7B9AE8 70%, #A78BFA 100%)' }}>

        {/* Layered decorative orbs */}
        <div className="absolute -top-10 -left-10 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-4 left-32 w-24 h-24 bg-indigo-300/20 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-8 right-48 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -top-6 right-24 w-36 h-36 bg-blue-200/20 rounded-full blur-xl pointer-events-none" />

        {/* Dot grid pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Left content */}
        <div className="relative z-10 flex-1 px-5 py-4 sm:px-8 sm:py-7 space-y-2 sm:space-y-3">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3.5 py-1.5 border border-white/25">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-xs font-semibold text-white/90 tracking-wide">Career Advisor Active</span>
          </div>

          {/* Heading */}
          <div>
            <p className="text-white/60 text-sm font-medium mb-1">Good morning 👋</p>
            <h1 className="text-3xl font-extrabold text-white leading-tight tracking-tight">
              Welcome back,{' '}
              <span className="relative inline-block">
                <span className="relative z-10">{user?.firstName || 'Guest'}</span>
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-white/70 text-sm leading-relaxed max-w-sm">
            Your personalized guide for <span className="text-white font-semibold">Class 10th &amp; 12th</span> students.
            Discover the right stream, colleges &amp; career paths made just for you.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-5 pt-1">
            {[
              { label: 'Courses Matched', value: '12' },
              { label: 'Colleges Nearby', value: '34' },
              { label: 'Scholarships', value: '8' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-white/60 leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — decorative SVG:
             Mobile: absolute overlay pinned to right, clipped by the banner overflow-hidden
             sm+: static flex child taking its own space */}
        {/* Mobile absolute version */}
        <div className="absolute right-0 top-0 h-full w-36 pointer-events-none select-none opacity-80 sm:hidden" aria-hidden="true">
          <svg viewBox="0 0 280 190" className="w-full h-full">
            <circle cx="200" cy="95" r="80" fill="white" opacity="0.04" />
            <circle cx="200" cy="95" r="55" fill="white" opacity="0.05" />
            <rect x="178" y="90" width="4" height="58" rx="2" fill="white" opacity="0.55" />
            <path d="M178 90 Q148 88 142 95 L142 145 Q148 140 178 142 Z" fill="white" opacity="0.18" />
            <path d="M182 90 Q212 88 218 95 L218 145 Q212 140 182 142 Z" fill="white" opacity="0.22" />
            <ellipse cx="230" cy="46" rx="26" ry="7" fill="white" opacity="0.3" />
            <polygon points="230,22 204,46 256,46" fill="white" opacity="0.25" />
            <line x1="256" y1="46" x2="262" y2="58" stroke="white" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
            <circle cx="262" cy="61" r="3.5" fill="#FCD34D" opacity="0.85" />
            <circle cx="140" cy="30" r="5" fill="#FCD34D" opacity="0.8" />
            <circle cx="248" cy="100" r="4" fill="#C4B5FD" opacity="0.75" />
            <line x1="260" y1="78" x2="260" y2="86" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1="256" y1="82" x2="264" y2="82" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>

        {/* Desktop flex version */}
        <div className="relative z-10 w-40 sm:w-56 lg:w-72 h-48 flex-shrink-0 mr-4 pointer-events-none select-none hidden sm:block">
          <svg viewBox="0 0 280 190" className="w-full h-full">
            {/* Soft glow rings behind everything */}
            <circle cx="200" cy="95" r="80" fill="white" opacity="0.04" />
            <circle cx="200" cy="95" r="55" fill="white" opacity="0.05" />

            {/* ── OPEN BOOK (centre-right) ── */}
            {/* Spine */}
            <rect x="178" y="90" width="4" height="58" rx="2" fill="white" opacity="0.55" />
            {/* Left page */}
            <path d="M178 90 Q148 88 142 95 L142 145 Q148 140 178 142 Z" fill="white" opacity="0.18" />
            <path d="M178 90 Q148 88 142 95 L142 145 Q148 140 178 142 Z" stroke="white" strokeWidth="0.8" fill="none" opacity="0.3" />
            {/* Left page lines */}
            <line x1="150" y1="103" x2="174" y2="103" stroke="white" strokeWidth="1.2" opacity="0.35" strokeLinecap="round" />
            <line x1="150" y1="112" x2="172" y2="112" stroke="white" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
            <line x1="150" y1="121" x2="174" y2="121" stroke="white" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
            <line x1="150" y1="130" x2="168" y2="130" stroke="white" strokeWidth="1.2" opacity="0.25" strokeLinecap="round" />
            {/* Right page */}
            <path d="M182 90 Q212 88 218 95 L218 145 Q212 140 182 142 Z" fill="white" opacity="0.22" />
            <path d="M182 90 Q212 88 218 95 L218 145 Q212 140 182 142 Z" stroke="white" strokeWidth="0.8" fill="none" opacity="0.3" />
            {/* Right page lines */}
            <line x1="188" y1="103" x2="210" y2="103" stroke="white" strokeWidth="1.2" opacity="0.35" strokeLinecap="round" />
            <line x1="188" y1="112" x2="208" y2="112" stroke="white" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
            <line x1="188" y1="121" x2="210" y2="121" stroke="white" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
            <line x1="188" y1="130" x2="204" y2="130" stroke="white" strokeWidth="1.2" opacity="0.25" strokeLinecap="round" />
            {/* Book shadow */}
            <ellipse cx="180" cy="150" rx="38" ry="5" fill="white" opacity="0.08" />

            {/* ── GRADUATION CAP (floating top-right) ── */}
            <ellipse cx="230" cy="46" rx="26" ry="7" fill="white" opacity="0.3" />
            <polygon points="230,22 204,46 256,46" fill="white" opacity="0.25" />
            <rect x="228" y="22" width="4" height="4" rx="1" fill="white" opacity="0.5" />
            {/* Tassel */}
            <line x1="256" y1="46" x2="262" y2="58" stroke="white" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
            <circle cx="262" cy="61" r="3.5" fill="#FCD34D" opacity="0.85" />

            {/* ── FLOATING STAT CARD (top-left) ── */}
            <rect x="14" y="14" width="110" height="60" rx="12" fill="white" opacity="0.12" />
            <rect x="14" y="14" width="110" height="60" rx="12" stroke="white" strokeWidth="0.8" fill="none" opacity="0.22" />
            <circle cx="32" cy="34" r="9" fill="white" opacity="0.2" />
            {/* check mark inside circle */}
            <path d="M27 34 L31 38 L38 30" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
            <rect x="48" y="28" width="62" height="6" rx="3" fill="white" opacity="0.4" />
            <rect x="48" y="40" width="44" height="5" rx="2.5" fill="white" opacity="0.25" />
            <rect x="22" y="56" width="90" height="4" rx="2" fill="white" opacity="0.15" />

            {/* ── FLOATING MINI CHART CARD (bottom-left) ── */}
            <rect x="8" y="108" width="114" height="58" rx="12" fill="white" opacity="0.1" />
            <rect x="8" y="108" width="114" height="58" rx="12" stroke="white" strokeWidth="0.8" fill="none" opacity="0.18" />
            {/* Trend line */}
            <polyline points="20,152 38,140 56,148 74,130 92,120 110,112" stroke="#FCD34D" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
            {/* Dots on trend */}
            <circle cx="20" cy="152" r="3" fill="#FCD34D" opacity="0.85" />
            <circle cx="56" cy="148" r="3" fill="#FCD34D" opacity="0.85" />
            <circle cx="92" cy="120" r="3" fill="#FCD34D" opacity="0.85" />
            <circle cx="110" cy="112" r="3.5" fill="white" opacity="0.9" />

            {/* ── SPARKLES & ACCENT DOTS ── */}
            <circle cx="140" cy="30" r="5" fill="#FCD34D" opacity="0.8" />
            <circle cx="248" cy="100" r="4" fill="#C4B5FD" opacity="0.75" />
            <circle cx="132" cy="170" r="3.5" fill="#A78BFA" opacity="0.7" />
            <circle cx="244" cy="155" r="3" fill="white" opacity="0.5" />
            <circle cx="158" cy="75" r="2.5" fill="white" opacity="0.45" />

            {/* Sparkle cross 1 */}
            <line x1="124" y1="86" x2="124" y2="96" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            <line x1="119" y1="91" x2="129" y2="91" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            {/* Sparkle cross 2 */}
            <line x1="260" y1="78" x2="260" y2="86" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1="256" y1="82" x2="264" y2="82" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Personalized Course Suggestions */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Personalized Course Suggestions</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {user?.psychometricResults?.recommendations ? 'Based on your quiz results' : 'Based on your interests'}
            </p>
          </div>
          <Link href="/course-suggestions" className="flex items-center gap-1.5 text-sm text-[#5B7FDB] font-medium hover:text-[#4A6ECA] transition-colors">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {suggestions.map((stream) => {
            const Icon = stream.icon;
            return (
              <div
                key={stream.name}
                className={`group relative rounded-3xl bg-gradient-to-b ${stream.lightBg} border ${stream.borderColor} overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                {/* Gradient header */}
                <div className={`relative bg-gradient-to-r ${stream.gradient} p-5 overflow-hidden`}>
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
                  <div className="absolute -bottom-6 -left-4 w-24 h-24 bg-white/10 rounded-full" />

                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center mb-3 backdrop-blur-sm">
                        <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                      </div>
                      <h3 className="text-xl font-bold text-white">{stream.name}</h3>
                      <p className="text-white/70 text-xs mt-0.5">{stream.tagline}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs text-white font-medium whitespace-nowrap">
                      {stream.students} students
                    </div>
                  </div>

                  <div className="relative z-10 flex gap-1.5 mt-3 flex-wrap">
                    {stream.careers.map((c) => (
                      <span key={c} className="bg-white/20 backdrop-blur-sm text-white text-xs rounded-full px-2.5 py-0.5">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <p className={`text-xs font-semibold ${stream.accentColor} uppercase tracking-wider mb-3`}>
                    Top Courses
                  </p>
                  <ul className="space-y-2.5 mb-4">
                    {stream.suggestions.map((s) => (
                      <li key={s} className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full ${stream.dotColor} flex-shrink-0`} />
                        <span className="text-sm text-slate-600 font-medium">{s}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full bg-gradient-to-r ${stream.btnGradient} text-white rounded-2xl py-2.5 text-sm font-semibold transition-all shadow-lg ${stream.btnShadow} hover:shadow-xl flex items-center justify-center gap-2`}>
                    View Careers
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Psychometric Profile */}
      {user?.psychometricResults && (
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">Your Psychometric Profile</h2>
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(user.psychometricResults.traitScores || {}).map(([trait, score]) => (
                <div key={trait} className="text-center">
                  <div className="text-2xl font-bold text-slate-800">{score}</div>
                  <div className="text-xs text-slate-500 capitalize">{trait.replace('_', ' ')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Explore Career Paths */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Explore Career Paths</h2>
            <p className="text-xs text-slate-400 mt-0.5">Government colleges &amp; job opportunities</p>
          </div>
          <Link href="/explore-career-paths" className="flex items-center gap-2 text-sm text-slate-500 border border-slate-200 bg-white/60 rounded-xl px-4 py-2 hover:bg-white/80 transition-colors font-medium">
            <Building2 className="w-4 h-4" />
            Explore paths
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 p-6">
          {careerPaths.map((path) => (
            <div key={path.degree} className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-52 flex-shrink-0 lg:border-r border-b lg:border-b-0 border-slate-100 pb-4 lg:pb-0 lg:pr-6">
                <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full px-3 py-1 mb-3">
                  <BookOpen className="w-3 h-3" />
                  {path.degree}
                </div>
                <div className="space-y-3">
                  {[
                    { name: path.college, date: path.date },
                    { name: 'Greenfield Govt. College', date: '23 Apr, 2022' },
                  ].map((c) => (
                    <div key={c.name} className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-slate-700">{c.name}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <p className="text-xs text-slate-400">{c.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 space-y-3">
                {path.jobs.map((job, i) => (
                  <Link
                    key={i}
                    href={`/explore-${job.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center gap-4 bg-slate-50/80 hover:bg-white rounded-2xl p-3.5 border border-slate-100 hover:border-slate-200 transition-all group cursor-pointer block"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-700">{job.title}</p>
                      <p className="text-xs text-slate-400">Prepares for IIT JAM &amp; entrances</p>
                    </div>
                    <span className={`text-xs font-medium rounded-full px-2.5 py-1 ${job.color}`}>
                      {job.tag}
                    </span>
                    <div className="flex items-center gap-1 text-[#5B7FDB] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-medium">Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}