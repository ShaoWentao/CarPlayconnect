import React, { useState, useEffect, useRef } from 'react';
import { Mic, X, Send, MapPin, Navigation } from 'lucide-react';
import { generateAssistantResponse } from '../services/geminiService';
import { GeoLocation } from '../types';

interface AssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssistantModal: React.FC<AssistantModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('How can I help you drive today?');
  const [isProcessing, setIsProcessing] = useState(false);
  const [location, setLocation] = useState<GeoLocation | null>(null);
  
  // Use a ref to scroll chat to bottom if we extended this to a full history
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setResponse('How can I help you drive today?');
      setQuery('');
      // Get location immediately when opened for context
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
          (err) => console.log("Location access denied")
        );
      }
    }
  }, [isOpen]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim() || isProcessing) return;

    setIsProcessing(true);
    // Optimistic UI update could go here, but we wait for response for simplicity
    const result = await generateAssistantResponse(query, location);
    setResponse(result);
    setIsProcessing(false);
    setQuery(''); // Clear input after sending
  };

  // Simple "Simulated" Voice Input for the demo since actual Speech-to-Text requires browser permission dance
  // that can be flaky in older webviews. We assume user types or uses system keyboard voice dictation.
  
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center pb-8 animate-in fade-in duration-200">
      <div className="w-11/12 max-w-2xl bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-950/50">
            <div className="flex items-center gap-2 text-indigo-400">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                <span className="font-bold tracking-wide text-sm uppercase">OpenDrive AI</span>
            </div>
            <button onClick={onClose} className="p-2 rounded-full bg-zinc-800 text-white active:scale-90 transition-transform">
                <X size={20} />
            </button>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[150px] max-h-[300px] overflow-y-auto flex flex-col justify-center items-center text-center space-y-4">
            {isProcessing ? (
               <div className="flex gap-2 items-center justify-center py-8">
                  <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce delay-0"></div>
                  <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-150"></div>
                  <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce delay-300"></div>
               </div>
            ) : (
                <div className="text-xl md:text-2xl font-medium text-white leading-relaxed" ref={responseRef}>
                    "{response}"
                </div>
            )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 bg-zinc-950 border-t border-zinc-800 flex gap-3">
             <div className="relative flex-1">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask for directions, music, or places..." 
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                    autoFocus
                />
                <Mic className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={24} />
             </div>
             <button 
                type="submit"
                disabled={!query.trim() || isProcessing}
                className="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white disabled:opacity-50 active:scale-95 transition-all"
             >
                 <Send size={24} />
             </button>
        </form>
      </div>
    </div>
  );
};
