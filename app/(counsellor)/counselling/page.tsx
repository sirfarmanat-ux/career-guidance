'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback, useRef } from 'react';
import { PhoneOff, Mic, MicOff, Video, VideoOff, Shield, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AgoraWrapper = dynamic(() => import('@/components/VideoCall/AgoraWrapper'), { ssr: false });
const VideoContainer = dynamic(() => import('@/components/VideoCall/VideoContainer'), { ssr: false });

export default function CounsellingPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [hangingUp, setHangingUp] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start session timer on mount
  useEffect(() => {
    intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

  const handleHangUp = useCallback(() => {
    setHangingUp(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeout(() => router.push('/dashboard'), 1200);
  }, [router]);

  return (
    <>
      <style>{`

        * { box-sizing: border-box; }

        .counsel-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100svh;
          background: #0a0d14;
          display: flex;
          flex-direction: column;
          color: #e8eaf0;
          position: relative;
          overflow: hidden;
        }

        /* Subtle ambient background */
        .counsel-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 10%, rgba(59,130,246,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 80% 90%, rgba(99,102,241,0.07) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* Thin top accent line */
        .counsel-root::after {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #3b82f6 30%, #6366f1 70%, transparent);
          z-index: 100;
        }

        /* ── TOPBAR ── */
        .topbar {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          height: 64px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(10,13,20,0.85);
          backdrop-filter: blur(12px);
          flex-shrink: 0;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .badge-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .page-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: -0.02em;
          color: #f0f2f8;
          line-height: 1;
        }

        .page-subtitle {
          font-size: 0.7rem;
          font-weight: 400;
          color: #5a6070;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* Live indicator */
        .live-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 999px;
          padding: 4px 10px;
          font-size: 0.68rem;
          font-weight: 600;
          color: #f87171;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ef4444;
          animation: pulse-dot 1.4s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        /* Timer */
        .timer-display {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #c8ccd8;
          letter-spacing: 0.04em;
        }

        .timer-display svg {
          opacity: 0.5;
        }

        /* ── VIDEO AREA ── */
        .video-stage {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          align-items: stretch;
          padding: 1.25rem;
          gap: 1rem;
          min-height: 0;
        }

        .video-main {
          flex: 1;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #111520;
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 0 0 1px rgba(59,130,246,0.08), 0 24px 60px rgba(0,0,0,0.5);
          min-height: 0;
        }

        /* Agora video fills this */
        .video-main :global(> *) {
          width: 100% !important;
          height: 100% !important;
        }

        /* Corner label */
        .video-label {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 5;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 4px 10px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #a0a8b8;
          text-transform: uppercase;
        }

        /* ── BOTTOM CONTROLS ── */
        .controls-bar {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.875rem;
          padding: 1.1rem 1.5rem 1.4rem;
          flex-shrink: 0;
        }

        .ctrl-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s, transform 0.15s;
          color: #c8ccd8;
          flex-shrink: 0;
        }

        .ctrl-btn:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        .ctrl-btn.off {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.3);
          color: #f87171;
        }

        .ctrl-btn.off:hover {
          background: rgba(239,68,68,0.25);
        }

        /* Hang-up button — larger, red */
        .hangup-btn {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #fff;
          box-shadow: 0 0 0 0 rgba(239,68,68,0.5);
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.3s;
          animation: ring-pulse 2.5s ease-out infinite;
          flex-shrink: 0;
        }

        .hangup-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 24px rgba(239,68,68,0.5);
          animation: none;
        }

        .hangup-btn:active {
          transform: scale(0.95);
        }

        .hangup-btn.ending {
          opacity: 0;
          transform: scale(0.8);
          pointer-events: none;
        }

        @keyframes ring-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(239,68,68,0.6); }
          60%  { box-shadow: 0 0 0 14px rgba(239,68,68,0); }
          100% { box-shadow: 0 0 0 0   rgba(239,68,68,0); }
        }

        /* Hang-up label */
        .ctrl-label {
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #4a5060;
          margin-top: 4px;
          text-align: center;
        }

        .ctrl-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Ending overlay */
        .ending-overlay {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(10,13,20,0);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          transition: background 0.6s ease;
        }

        .ending-overlay.active {
          background: rgba(10,13,20,0.92);
          pointer-events: all;
        }

        .ending-text {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #f0f2f8;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.4s 0.3s, transform 0.4s 0.3s;
          letter-spacing: -0.01em;
        }

        .ending-overlay.active .ending-text {
          opacity: 1;
          transform: translateY(0);
        }

        /* Responsive */
        @media (max-width: 480px) {
          .topbar { padding: 0 1rem; height: 56px; }
          .video-stage { padding: 0.75rem; gap: 0.75rem; }
          .video-main { border-radius: 14px; }
          .page-title { font-size: 1rem; }
          .timer-display { font-size: 0.88rem; }
          .hangup-btn { width: 58px; height: 58px; }
          .ctrl-btn { width: 46px; height: 46px; }
        }
      `}</style>

      <div className="counsel-root">

        {/* ── TOP BAR ── */}
        <header className="topbar">
          <div className="topbar-left">
            <div className="badge-icon">
              <Shield size={16} color="#fff" />
            </div>
            <div>
              <div className="page-title">Counsellor's Page</div>
              <div className="page-subtitle">Private Session</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="timer-display">
              <Clock size={14} />
              {formatTime(seconds)}
            </div>
            <div className="live-pill">
              <span className="live-dot" />
              Live
            </div>
          </div>
        </header>

        {/* ── VIDEO STAGE ── */}
        <div className="video-stage">
          <div className="video-main">
            <span className="video-label">Session</span>
            <AgoraWrapper>
              <VideoContainer
                channelName="test-room"
                appId={process.env.NEXT_PUBLIC_AGORA_APP_ID!}
              />
            </AgoraWrapper>
          </div>
        </div>

        {/* ── CONTROLS BAR ── */}
        <div className="controls-bar">
          {/* Mic */}
          <div className="ctrl-wrap">
            <button
              className={`ctrl-btn ${!micOn ? 'off' : ''}`}
              onClick={() => setMicOn(v => !v)}
              aria-label={micOn ? 'Mute microphone' : 'Unmute microphone'}
            >
              {micOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
            <span className="ctrl-label">{micOn ? 'Mute' : 'Unmute'}</span>
          </div>

          {/* Hang Up */}
          <div className="ctrl-wrap">
            <button
              className={`hangup-btn ${hangingUp ? 'ending' : ''}`}
              onClick={handleHangUp}
              aria-label="End call"
            >
              <PhoneOff size={26} />
            </button>
            <span className="ctrl-label" style={{ color: '#f87171' }}>End</span>
          </div>

          {/* Camera */}
          <div className="ctrl-wrap">
            <button
              className={`ctrl-btn ${!camOn ? 'off' : ''}`}
              onClick={() => setCamOn(v => !v)}
              aria-label={camOn ? 'Turn off camera' : 'Turn on camera'}
            >
              {camOn ? <Video size={20} /> : <VideoOff size={20} />}
            </button>
            <span className="ctrl-label">{camOn ? 'Camera' : 'Off'}</span>
          </div>
        </div>

        {/* ── ENDING OVERLAY ── */}
        <div className={`ending-overlay ${hangingUp ? 'active' : ''}`}>
          <span className="ending-text">Session ended. Redirecting…</span>
        </div>

      </div>
    </>
  );
}