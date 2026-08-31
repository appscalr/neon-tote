import React, { useState } from 'react';
import { Search, Zap, CheckCircle2, Truck, Box, MapPin } from 'lucide-react';
import { TrackingLog } from '../types';

export const OrderTrackingSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeLog, setActiveLog] = useState<TrackingLog | null>(null);

  const mockTrack = (idToSearch?: string) => {
    const searchVal = idToSearch || query;
    if (!searchVal.trim()) return;

    setActiveLog({
      trackingId: searchVal.toUpperCase(),
      status: 'In Transit',
      estimatedDays: '2 Business Days',
      hubLocation: 'Cumberland Bldg Hub // Sector 8',
      events: [
        {
          time: '10:42 AM • Today',
          description: 'Package sorted & scanned at Bulawayo Central Tech Hub',
          location: 'Cnr 8th & E Ave, Bulawayo',
        },
        {
          time: '04:15 PM • Yesterday',
          description: 'Dispatched from PIEDPOD Vault with shock-proof seal',
          location: 'Suite 15 Cumberland Fulfillment',
        },
        {
          time: '02:00 PM • Yesterday',
          description: 'Quality Thrift Grade Verified & Sanitized',
          location: 'URBN Studio Lab',
        },
      ],
    });
  };

  return (
    <section id="tracking" className="px-4 lg:px-8 pb-28 lg:pb-12 pt-6">
      <div className="rounded-[24px] bg-[#161616] border border-zinc-800 p-5 lg:p-7 flex flex-col lg:flex-row gap-6">
        {/* Left Tracking Input Form */}
        <div className="flex-1">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] text-zinc-400 font-semibold">
            <Zap className="w-4 h-4 text-[#FF00B7]" /> TRACK_ORDER.exe
          </div>

          <div className="mt-3 flex gap-2 max-w-[480px]">
            <div className="flex-1 relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && mockTrack()}
                placeholder="URBN-XXXX-XXXX-XXXX"
                className="w-full h-11 rounded-full bg-[#0A0A0A] border border-zinc-800 px-4 pr-10 text-[12px] tracking-widest text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-[#FF00B7] transition"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            </div>

            <button
              onClick={() => mockTrack()}
              className="h-11 px-6 rounded-full bg-[#FF00B7] text-white text-[11px] font-bold tracking-widest shadow-[0_0_20px_#FF00B7] hover:brightness-110 transition cursor-pointer"
            >
              SEARCH
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-zinc-500">
            <span>Quick test:</span>
            <button
              onClick={() => {
                setQuery('URBN-4829-1092-7733');
                mockTrack('URBN-4829-1092-7733');
              }}
              className="text-[#00FFCC] underline hover:text-white"
            >
              URBN-4829-1092-7733
            </button>
            <span>• Free dispatch over $50 • 14d guarantee</span>
          </div>

          {activeLog && (
            <div className="mt-6 rounded-[20px] bg-[#0A0A0A] border border-[#00FFCC]/30 p-5 shadow-[0_0_20px_rgba(0,255,204,0.1)] animate-in">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <div>
                  <div className="text-[10px] tracking-widest text-zinc-500">PARCEL ID</div>
                  <div className="text-[13px] font-bold text-[#00FFCC]">{activeLog.trackingId}</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#D6FF00] text-black text-[10px] font-bold flex items-center gap-1.5 shadow-[0_0_8px_#D6FF00]">
                  <Truck className="w-3.5 h-3.5" /> {activeLog.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 my-4 text-[11px]">
                <div>
                  <span className="text-zinc-500 text-[10px]">ESTIMATED ARRIVAL</span>
                  <div className="font-bold text-zinc-200">{activeLog.estimatedDays}</div>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px]">FACILITY</span>
                  <div className="font-bold text-zinc-200">{activeLog.hubLocation}</div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {activeLog.events.map((event, idx) => (
                  <div key={idx} className="flex gap-3 text-[11px]">
                    <div className="w-5 flex flex-col items-center">
                      <div className={`w-2.5 h-2.5 rounded-full ${idx === 0 ? 'bg-[#00FFCC] shadow-[0_0_8px_#00FFCC]' : 'bg-zinc-700'}`} />
                      {idx !== activeLog.events.length - 1 && <div className="w-0.5 flex-1 bg-zinc-800 my-1" />}
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="font-bold text-zinc-200">{event.description}</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">{event.time} • {event.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Info Card */}
        <div className="lg:w-[320px] rounded-[16px] bg-[#0A0A0A] border border-zinc-800 p-4 flex flex-col justify-between">
          <div>
            <div className="text-[10px] tracking-widest text-zinc-500 mb-2 font-semibold">
              DROP_LOG // FOOTER
            </div>
            <div className="text-[12px] leading-6 text-zinc-300">
              <div>Suite 15 Cumberland Bldg</div>
              <div>Cnr 8th &amp; E, Bulawayo</div>
              <div className="mt-1 text-zinc-400">
                <span>shop@piedpod.online</span>
                <br />
                <span>@piedpod_store</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <span className="text-[9px] px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
              SECURE • HAPTIC
            </span>
            <span className="text-[9px] px-2.5 py-1 rounded-full bg-[#00FFCC]/10 border border-[#00FFCC]/20 text-[#00FFCC]">
              NEON VERIFIED
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
