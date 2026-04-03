'use client';

import { useState } from 'react';
import { Camera, User, Mail, BookOpen, Target, Sparkles, Building2, ChevronLeft, Calendar, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditProfile() {
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* ── Header Section ── */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/dashboard"
          className="w-10 h-10 bg-white/60 backdrop-blur-md border border-white/60 rounded-xl flex items-center justify-center text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Edit Profile</h1>
          <p className="text-sm text-slate-500">Update your personal details and career preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ── Left Column: Avatar & Quick Info ── */}
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white p-6 shadow-sm relative overflow-hidden group">
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div 
                className="w-32 h-32 bg-slate-100 flex items-center justify-center relative rounded-full overflow-hidden ring-4 ring-white shadow-lg mb-6 cursor-pointer transform hover:scale-105 transition-all duration-300"
                onMouseEnter={() => setIsHoveringAvatar(true)}
                onMouseLeave={() => setIsHoveringAvatar(false)}
              >
                <User className="w-14 h-14 text-slate-400" />
                
                {/* Overlay for Camera Icon */}
                <div className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${isHoveringAvatar ? 'opacity-100' : 'opacity-0'}`}>
                  <Camera className="w-8 h-8 text-white mb-1" />
                </div>
              </div>

              <h2 className="text-lg font-bold text-slate-800">Stella Walton</h2>
              <p className="text-sm text-indigo-600 font-semibold mb-4 bg-indigo-50 px-3 py-1 rounded-full mt-2">Class 12 Student</p>

              <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="truncate">stella.walton@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Joined Oct 2021</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mini tip card */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-md shadow-indigo-200 text-white relative overflow-hidden">
            <Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10" />
            <h3 className="font-bold text-lg mb-2">Want better matches?</h3>
            <p className="text-sm text-indigo-100 leading-relaxed mb-4">Complete your profile to 100% to get more accurate career and college recommendations.</p>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
               <div className="bg-white h-full w-[70%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
            </div>
            <p className="text-xs text-indigo-100 mt-2 font-medium text-right">70% Complete</p>
          </div>
        </div>

        {/* ── Right Column: Form Sections ── */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Personal Information */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">Personal Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5 relative group">
                <label className="text-xs font-semibold text-slate-500 ml-1">First Name</label>
                <input 
                  type="text" 
                  defaultValue="Stella"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-slate-700"
                />
              </div>
              
              <div className="space-y-1.5 relative group">
                <label className="text-xs font-semibold text-slate-500 ml-1">Last Name</label>
                <input 
                  type="text" 
                  defaultValue="Walton"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-slate-700"
                />
              </div>

              <div className="space-y-1.5 relative group md:col-span-2">
                <label className="text-xs font-semibold text-slate-500 ml-1">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="stella.walton@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none text-slate-500 font-medium cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Section 2: Academic & Career Interests */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">Academic &amp; Interests</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5 relative group">
                <label className="text-xs font-semibold text-slate-500 ml-1">Current Grade/Class</label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all font-medium text-slate-700 appearance-none">
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12" selected>Class 12</option>
                    <option value="college">College Student</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-1.5 relative group">
                <label className="text-xs font-semibold text-slate-500 ml-1">Target Degree</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all font-medium text-slate-700 appearance-none">
                    <option value="btech" selected>B.Tech / B.E.</option>
                    <option value="mbbs">MBBS</option>
                    <option value="bba">BBA</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 relative group md:col-span-2">
                <label className="text-xs font-semibold text-slate-500 ml-1">Area of Interests (Top 3)</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Computer Science', 'Artificial Intelligence', 'Data Science'].map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-100 flex items-center gap-2 cursor-pointer hover:bg-indigo-100 transition-colors">
                      {skill}
                      <span className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-indigo-200 ml-1">×</span>
                    </span>
                  ))}
                  <button className="px-3 py-1.5 border border-dashed border-slate-300 text-slate-500 text-xs font-semibold rounded-lg hover:border-slate-400 hover:text-slate-600 transition-colors">
                    + Add Interest
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Save Action */}
          <div className="flex justify-end pt-4">
            <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg shadow-indigo-200 transform hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-100">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
