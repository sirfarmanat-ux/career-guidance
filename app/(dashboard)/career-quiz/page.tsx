'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BrainCircuit, ChevronRight, CheckCircle2, Sparkles, ArrowRight, Activity, BookHeart, Compass } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "When faced with a complex problem, what is your first instinct?",
    options: [
      { text: "Analyze the data and find a logical sequence", icon: <Activity className="w-5 h-5" /> },
      { text: "Gather people to brainstorm creative solutions", icon: <Sparkles className="w-5 h-5" /> },
      { text: "Research how others have solved this in the past", icon: <BookHeart className="w-5 h-5" /> },
      { text: "Trust my gut and try a hands-on approach", icon: <Compass className="w-5 h-5" /> }
    ]
  },
  {
    id: 2,
    question: "Which type of environment do you thrive in the most?",
    options: [
      { text: "A structured, quiet setting with clear rules", icon: <CheckCircle2 className="w-5 h-5" /> },
      { text: "A dynamic, fast-paced team environment", icon: <Sparkles className="w-5 h-5" /> },
      { text: "An independent space where I can focus deeply", icon: <BrainCircuit className="w-5 h-5" /> },
      { text: "Outdoor or changing locations constantly", icon: <Compass className="w-5 h-5" /> }
    ]
  },
  {
    id: 3,
    question: "What kind of subjects naturally interest you?",
    options: [
      { text: "Mathematics, Physics, or Computer Science", icon: <Activity className="w-5 h-5" /> },
      { text: "Literature, History, or Arts", icon: <BookHeart className="w-5 h-5" /> },
      { text: "Business, Economics, or Management", icon: <Sparkles className="w-5 h-5" /> },
      { text: "Biology, Chemistry, or Medicine", icon: <CheckCircle2 className="w-5 h-5" /> }
    ]
  }
];

export default function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (idx: number) => {
    const newAnswers = [...answers, idx];
    if (currentQuestion < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAnswers(newAnswers);
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="w-full max-w-3xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white p-8 md:p-12 shadow-sm text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-indigo-200">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Your Custom Path is Ready!</h1>
          <p className="text-slate-600 md:text-lg mb-8 max-w-lg mx-auto">
            Based on your psychometric profile, you show a strong aptitude towards analytical and structured problem-solving.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
            <div className="bg-blue-50/80 rounded-2xl p-5 border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2">Recommended Streams</h3>
              <ul className="space-y-2 text-sm text-blue-800 font-medium.">
                <li>• Science (PCM)</li>
                <li>• Computer Applications</li>
              </ul>
            </div>
            <div className="bg-purple-50/80 rounded-2xl p-5 border border-purple-100">
              <h3 className="font-bold text-purple-900 mb-2">Potential Careers</h3>
              <ul className="space-y-2 text-sm text-purple-800 font-medium">
                <li>• Software Engineering</li>
                <li>• Data Science</li>
              </ul>
            </div>
          </div>

          <Link
            href="/college-directory"
            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl px-10 py-4 font-bold transition-all shadow-md shadow-indigo-200 hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2 mx-auto"
          >
            Explore Colleges <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];
  const progressPercent = Math.round(((currentQuestion) / questions.length) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto pb-12 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-white/60 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm">
          <BrainCircuit className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Aptitude &amp; Interest Assessment</h1>
          <p className="text-sm text-slate-500">Discover paths mapped to your true potential</p>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white p-6 md:p-10 shadow-sm relative overflow-hidden">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-indigo-600">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-snug">
          {q.question}
        </h2>

        <div className="space-y-4">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className="w-full flex items-center gap-4 p-5 rounded-2xl bg-white hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 transition-all group text-left shadow-sm hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex flex-shrink-0 items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                {opt.icon}
              </div>
              <span className="flex-1 font-semibold text-slate-700 group-hover:text-indigo-900 transition-colors">
                {opt.text}
              </span>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
