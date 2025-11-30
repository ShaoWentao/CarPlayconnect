
import React, { useState } from 'react';
import { ArrowLeft, Monitor, Smartphone, Wifi, Bluetooth, Layers, Shield, Cpu, Volume2, Save } from 'lucide-react';
import { ViewState, SystemSetting } from '../types';

interface SettingsViewProps {
  onBack: () => void;
  onDisconnect: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onBack, onDisconnect }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'connection' | 'system'>('general');

  // Mock settings state
  const [settings, setSettings] = useState<SystemSetting[]>([
    { id: 'auto_launch', label: 'Auto Launch', description: 'Start service on boot', value: true, type: 'toggle' },
    { id: 'driver_mode', label: 'Driver Position', value: 'Left', type: 'select', options: ['Left', 'Right'] },
    { id: 'resolution', label: 'Resolution', value: '1024x600', type: 'select', options: ['800x480', '1024x600', '1280x720', '1920x1080'] },
    { id: 'fps', label: 'Frame Rate', value: '60 FPS', type: 'select', options: ['30 FPS', '60 FPS'] },
    { id: 'mic_gain', label: 'Microphone Gain', value: '+12dB', type: 'select', options: ['0dB', '+6dB', '+12dB'] },
    { id: 'night_mode', label: 'Night Mode', value: 'Auto', type: 'select', options: ['Auto', 'On', 'Off'] },
    { id: 'background_connect', label: 'Background Connection', description: 'Keep BT service alive', value: true, type: 'toggle' },
    { id: 'audio_focus', label: 'Audio Focus', description: 'Request audio focus on connect', value: true, type: 'toggle' },
    { id: 'floating_icon', label: 'Floating Icon', description: 'SYSTEM_ALERT_WINDOW permission', value: false, type: 'toggle' },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(prev => prev.map(s => s.id === id ? { ...s, value: !s.value } : s));
  };

  const cycleOption = (id: string) => {
    setSettings(prev => prev.map(s => {
      if (s.id === id && s.options) {
        const currentIndex = s.options.indexOf(s.value as string);
        const nextIndex = (currentIndex + 1) % s.options.length;
        return { ...s, value: s.options[nextIndex] };
      }
      return s;
    }));
  };

  const renderToggle = (setting: SystemSetting) => (
    <button 
        onClick={() => toggleSetting(setting.id)}
        className={`w-12 h-6 rounded-full transition-colors relative ${setting.value ? 'bg-green-500' : 'bg-zinc-700'}`}
    >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${setting.value ? 'left-7' : 'left-1'}`} />
    </button>
  );

  const renderSelect = (setting: SystemSetting) => (
    <button 
        onClick={() => cycleOption(setting.id)}
        className="px-3 py-1 bg-zinc-800 rounded-lg text-sm text-zinc-300 border border-zinc-700 flex items-center gap-2"
    >
        {setting.value}
        <span className="text-zinc-500">▼</span>
    </button>
  );

  return (
    <div className="flex-1 bg-black flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="h-20 border-b border-zinc-800 flex items-center px-6 bg-zinc-900/50">
            <button onClick={onBack} className="p-3 bg-zinc-800 rounded-xl mr-4 hover:bg-zinc-700">
                <ArrowLeft size={24} className="text-zinc-300" />
            </button>
            <h1 className="text-2xl font-bold text-white">System Settings</h1>
            <div className="ml-auto flex gap-2">
                <button 
                    onClick={onDisconnect}
                    className="px-4 py-2 bg-red-900/20 text-red-400 border border-red-900/50 rounded-lg hover:bg-red-900/40 font-medium text-sm"
                >
                    Stop Service
                </button>
            </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="w-64 bg-zinc-900 border-r border-zinc-800 pt-6">
                <div className="px-4 mb-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">Configuration</div>
                <nav className="space-y-1 px-2">
                    <button 
                        onClick={() => setActiveTab('general')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${activeTab === 'general' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-800'}`}
                    >
                        <Monitor size={20} /> General
                    </button>
                    <button 
                        onClick={() => setActiveTab('connection')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${activeTab === 'connection' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-800'}`}
                    >
                        <Wifi size={20} /> Connectivity
                    </button>
                    <button 
                        onClick={() => setActiveTab('system')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${activeTab === 'system' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-800'}`}
                    >
                        <Cpu size={20} /> Advanced
                    </button>
                </nav>
                
                <div className="px-4 mt-8 mb-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">Information</div>
                <div className="px-6 py-4 text-xs text-zinc-600 font-mono space-y-2">
                    <p>Pkg: com.tencent.mm</p>
                    <p>Ver: 2.7.4 (Build 31)</p>
                    <p>SDK: Android 7.0+</p>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 bg-black">
                <div className="max-w-3xl space-y-2">
                    
                    {/* Render relevant settings based on tab */}
                    {activeTab === 'general' && (
                        <>
                            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden mb-6">
                                <div className="p-4 border-b border-zinc-800 bg-zinc-800/50 font-medium text-zinc-300">Display</div>
                                {settings.filter(s => ['resolution', 'fps', 'night_mode', 'driver_mode'].includes(s.id)).map(s => (
                                    <div key={s.id} className="p-4 flex items-center justify-between border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30">
                                        <div>
                                            <div className="text-white">{s.label}</div>
                                            {s.description && <div className="text-sm text-zinc-500">{s.description}</div>}
                                        </div>
                                        {s.type === 'toggle' ? renderToggle(s) : renderSelect(s)}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === 'connection' && (
                        <>
                             <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden mb-6">
                                <div className="p-4 border-b border-zinc-800 bg-zinc-800/50 font-medium text-zinc-300">Wireless & USB</div>
                                {settings.filter(s => ['auto_launch', 'background_connect'].includes(s.id)).map(s => (
                                    <div key={s.id} className="p-4 flex items-center justify-between border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30">
                                        <div>
                                            <div className="text-white">{s.label}</div>
                                            {s.description && <div className="text-sm text-zinc-500">{s.description}</div>}
                                        </div>
                                        {s.type === 'toggle' ? renderToggle(s) : renderSelect(s)}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    
                    {activeTab === 'system' && (
                        <>
                             <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden mb-6">
                                <div className="p-4 border-b border-zinc-800 bg-zinc-800/50 font-medium text-zinc-300">Permissions & Audio</div>
                                {settings.filter(s => ['mic_gain', 'audio_focus', 'floating_icon'].includes(s.id)).map(s => (
                                    <div key={s.id} className="p-4 flex items-center justify-between border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30">
                                        <div>
                                            <div className="text-white">{s.label}</div>
                                            {s.description && <div className="text-sm text-zinc-500">{s.description}</div>}
                                        </div>
                                        {s.type === 'toggle' ? renderToggle(s) : renderSelect(s)}
                                    </div>
                                ))}
                            </div>
                             <div className="p-4 bg-yellow-900/10 border border-yellow-900/30 rounded-xl flex gap-3 text-yellow-500">
                                <Shield size={24} className="shrink-0" />
                                <div className="text-sm">
                                    <p className="font-bold mb-1">Root Access Not Detected</p>
                                    <p>Some advanced features like "Kill Stock Radio" require root access on Android 7.0 units.</p>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    </div>
  );
};
