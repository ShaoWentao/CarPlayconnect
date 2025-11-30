import React from 'react';
import { APP_GRID } from '../constants';
import { ViewState } from '../types';

interface AppGridProps {
  onAppSelect: (view: ViewState) => void;
  onOpenAssistant: () => void;
}

export const AppGrid: React.FC<AppGridProps> = ({ onAppSelect, onOpenAssistant }) => {
  return (
    <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
      <div className="grid grid-cols-4 gap-8 justify-items-center">
        {APP_GRID.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => {
                if (app.id === 'assistant') {
                    onOpenAssistant();
                } else {
                    onAppSelect(app.view);
                }
              }}
              className="flex flex-col items-center gap-3 group w-full"
            >
              <div className={`w-20 h-20 ${app.color} rounded-2xl flex items-center justify-center shadow-lg group-active:scale-90 transition-transform duration-200 ring-2 ring-white/0 group-active:ring-white/20`}>
                <Icon size={40} className="text-white drop-shadow-md" />
              </div>
              <span className="text-zinc-300 font-medium text-sm tracking-wide group-hover:text-white">
                {app.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
