
import React, { useState, useEffect } from 'react';
import { LayoutGrid, Map as MapIcon, Music, Settings, Battery, Wifi, Signal } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Do not render sidebar if we are in the connection screen
  if (currentView === ViewState.CONNECTION) {
    return null;
  }

  return (
    <div className="w-24 h-full bg-zinc-950 border-r border-zinc-800 flex flex-col items-center justify-between py-6 z-50 shadow-2xl">
      {/* Top Shortcuts */}
      <div className="flex flex-col gap-6 w-full items-center">
        <button 
          onClick={() => onChangeView(ViewState.MAPS)}
          className={`p-4 rounded-2xl transition-all active:scale-90 ${currentView === ViewState.MAPS ? 'bg-zinc-800 text-blue-500 shadow-inner' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <MapIcon size={28} />
        </button>
        <button 
          onClick={() => onChangeView(ViewState.MUSIC)}
          className={`p-4 rounded-2xl transition-all active:scale-90 ${currentView === ViewState.MUSIC ? 'bg-zinc-800 text-red-500 shadow-inner' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <Music size={28} />
        </button>
        <button 
           onClick={() => onChangeView(ViewState.SETTINGS)}
           className={`p-4 rounded-2xl transition-all active:scale-90 ${currentView === ViewState.SETTINGS ? 'bg-zinc-800 text-gray-300 shadow-inner' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <Settings size={28} />
        </button>
      </div>

      {/* Bottom Status & Home */}
      <div className="flex flex-col gap-5 items-center w-full">
        <div className="flex flex-col items-center gap-1.5 text-zinc-600">
           <div className="flex gap-1">
             <Signal size={12} className="text-green-500" />
             <Wifi size={12} />
           </div>
           <Battery size={12} />
        </div>
        
        <div className="text-sm font-bold text-zinc-400 font-mono tracking-widest">
          {formatTime(time)}
        </div>

        <button 
          onClick={() => onChangeView(currentView === ViewState.DASHBOARD ? ViewState.APPS : ViewState.DASHBOARD)}
          className={`p-4 rounded-2xl transition-all active:scale-90 border border-zinc-800 ${currentView === ViewState.DASHBOARD || currentView === ViewState.APPS ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-900 text-zinc-400'}`}
        >
          <LayoutGrid size={28} />
        </button>
      </div>
    </div>
  );
};
