export default function Loading() {
  return (
    <div className="w-full h-full min-h-[60vh] flex flex-col gap-6 animate-pulse p-4">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-indigo-100/60 rounded-xl" />
        <div className="space-y-2">
          <div className="h-6 w-48 bg-indigo-100/60 rounded-md" />
          <div className="h-4 w-32 bg-slate-200/60 rounded-md" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="h-40 bg-white/40 rounded-3xl border border-white/60" />
        <div className="h-40 bg-white/40 rounded-3xl border border-white/60" />
        <div className="h-40 bg-white/40 rounded-3xl border border-white/60" />
      </div>

      <div className="flex-1 min-h-[300px] bg-white/40 rounded-3xl border border-white/60 mt-4 p-8">
         <div className="h-8 w-64 bg-indigo-100/60 rounded-md mb-8" />
         <div className="space-y-4">
           <div className="h-4 w-full bg-slate-100 rounded-md" />
           <div className="h-4 w-[90%] bg-slate-100 rounded-md" />
           <div className="h-4 w-[80%] bg-slate-100 rounded-md" />
           <div className="h-4 w-[85%] bg-slate-100 rounded-md" />
         </div>
      </div>
    </div>
  );
}
