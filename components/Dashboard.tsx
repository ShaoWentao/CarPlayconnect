import React from 'react';
import { MOCK_MUSIC_DATA } from '../constants';
import { Navigation, Play, SkipForward, Pause, MapPin } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div className="flex-1 p-4 grid grid-cols-12 gap-4 h-full overflow-hidden">
      
      {/* Primary Map Card (Left/Center) */}
      <div className="col-span-8 bg-zinc-800 rounded-3xl overflow-hidden relative group">
        {/* Fake Map Background */}
        <div className="absolute inset-0 bg-zinc-700 opacity-50 flex items-center justify-center">
            <div className="text-zinc-500 flex flex-col items-center">
                <MapPin size={48} className="mb-2" />
                <span>Map Placeholder</span>
                <span className="text-xs text-zinc-600">(Google Maps API requires key)</span>
            </div>
        </div>
        
        {/* Simulated Route Overlay */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
            <div className="bg-zinc-900/90 backdrop-blur-md p-4 rounded-2xl border border-zinc-700 shadow-lg max-w-[200px]">
                <div className="text-xs text-zinc-400 font-bold uppercase mb-1">Next Turn</div>
                <div className="flex items-center gap-3">
                    <Navigation size={32} className="text-white transform rotate-45" />
                    <div>
                        <div className="text-xl font-bold text-white leading-none">200m</div>
                        <div className="text-sm text-zinc-300 leading-tight mt-1">Turn right onto Main St</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Speed Limit / Current Speed (Bottom Left) */}
        <div className="absolute bottom-4 left-4 bg-white text-black p-3 rounded-xl shadow-lg border-2 border-zinc-300 w-16 h-16 flex items-center justify-center font-bold text-2xl">
            65
        </div>
      </div>

      {/* Right Column Widgets */}
      <div className="col-span-4 flex flex-col gap-4">
        
        {/* Next Destination / Navigation Card */}
        <div className="flex-1 bg-zinc-800 rounded-3xl p-5 flex flex-col justify-between border border-zinc-700/50">
             <div>
                 <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Destination</h3>
                 <p className="text-white text-xl font-semibold mt-1 truncate">Home</p>
                 <p className="text-green-500 text-sm font-medium mt-1">12 min • 4.2 miles</p>
             </div>
             <div className="h-1 w-full bg-zinc-700 rounded-full mt-4 overflow-hidden">
                 <div className="h-full bg-green-500 w-3/4 rounded-full"></div>
             </div>
        </div>

        {/* Media Player Card */}
        <div className="flex-1 bg-zinc-800 rounded-3xl p-5 flex flex-col justify-between border border-zinc-700/50 relative overflow-hidden">
            {/* Album Art Blur BG */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 blur-xl" 
                style={{ backgroundImage: `url(${MOCK_MUSIC_DATA.cover})` }}
            ></div>
            
            <div className="relative z-10 flex gap-4 items-center">
                <img 
                    src={MOCK_MUSIC_DATA.cover} 
                    alt="Cover" 
                    className="w-16 h-16 rounded-xl shadow-lg border border-zinc-600"
                />
                <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold truncate text-lg">{MOCK_MUSIC_DATA.title}</h3>
                    <p className="text-zinc-400 truncate text-sm">{MOCK_MUSIC_DATA.artist}</p>
                </div>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-2 px-2">
                <button className="text-zinc-400 hover:text-white active:scale-90 transition-transform">
                   <SkipForward size={24} className="rotate-180" />
                </button>
                <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black active:scale-90 transition-transform shadow-lg hover:bg-zinc-200"
                >
                    {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
                </button>
                <button className="text-zinc-400 hover:text-white active:scale-90 transition-transform">
                   <SkipForward size={24} />
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};
