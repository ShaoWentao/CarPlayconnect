
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AppGrid } from './components/AppGrid';
import { AssistantModal } from './components/AssistantModal';
import { ConnectionScreen } from './components/ConnectionScreen';
import { SettingsView } from './components/SettingsView';
import { ViewState } from './types';
import { MapPin, Music } from 'lucide-react';

const App: React.FC = () => {
  // Start with CONNECTION view to simulate waiting for phone
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.CONNECTION);
  const [isAssistantOpen, setAssistantOpen] = useState(false);

  // Simple View Renderer
  const renderContent = () => {
    switch (currentView) {
      case ViewState.CONNECTION:
        return <ConnectionScreen onConnected={() => setCurrentView(ViewState.DASHBOARD)} />;
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.APPS:
        return <AppGrid onAppSelect={setCurrentView} onOpenAssistant={() => setAssistantOpen(true)} />;
      case ViewState.MUSIC:
        return (
          <div className="flex-1 flex items-center justify-center bg-zinc-900 m-4 rounded-3xl border border-zinc-800">
            <div className="text-center text-zinc-500">
                <Music size={64} className="mx-auto mb-4 opacity-50" />
                <h2 className="text-2xl font-bold text-zinc-300">Music Player</h2>
                <p>Full screen music interface would go here.</p>
                <button onClick={() => setCurrentView(ViewState.DASHBOARD)} className="mt-8 px-6 py-3 bg-zinc-800 rounded-full text-white">Back</button>
            </div>
          </div>
        );
      case ViewState.MAPS:
        return (
          <div className="flex-1 flex items-center justify-center bg-zinc-900 m-4 rounded-3xl border border-zinc-800">
             <div className="text-center text-zinc-500">
                <MapPin size={64} className="mx-auto mb-4 opacity-50" />
                <h2 className="text-2xl font-bold text-zinc-300">Navigation</h2>
                <p>Full screen map interface would go here.</p>
                <button onClick={() => setCurrentView(ViewState.DASHBOARD)} className="mt-8 px-6 py-3 bg-zinc-800 rounded-full text-white">Back</button>
            </div>
          </div>
        );
      case ViewState.SETTINGS:
        return (
           <SettingsView 
              onBack={() => setCurrentView(ViewState.DASHBOARD)} 
              onDisconnect={() => setCurrentView(ViewState.CONNECTION)}
           />
        );
      default:
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-zinc-500">App Placeholder</p>
                <button onClick={() => setCurrentView(ViewState.DASHBOARD)} className="ml-4 px-4 py-2 bg-zinc-800 rounded-lg">Home</button>
            </div>
        );
    }
  };

  return (
    <div className="w-screen h-screen bg-black text-white flex overflow-hidden font-sans select-none">
      {/* Sidebar Dock (Hidden during connection) */}
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
      />

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col bg-black">
        {/* Top Gradient for aesthetic, only show if not in connection mode */}
        {currentView !== ViewState.CONNECTION && currentView !== ViewState.SETTINGS && (
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-900/20 to-transparent pointer-events-none" />
        )}
        
        {renderContent()}

        {/* Global Assistant Trigger (Floating Button if not in grid and not connecting) */}
        {!isAssistantOpen && currentView !== ViewState.APPS && currentView !== ViewState.CONNECTION && currentView !== ViewState.SETTINGS && (
             <button 
                onClick={() => setAssistantOpen(true)}
                className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white active:scale-90 transition-transform z-40 border-2 border-white/20"
             >
                 <div className="w-6 h-6 bg-white rounded-full opacity-20 animate-ping absolute"></div>
                 <div className="w-2 h-2 bg-white rounded-full"></div>
             </button>
        )}
      </main>

      {/* Voice Assistant Overlay */}
      <AssistantModal 
        isOpen={isAssistantOpen} 
        onClose={() => setAssistantOpen(false)} 
      />
    </div>
  );
};

export default App;
