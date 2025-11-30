
import React, { useEffect, useState } from 'react';
import { Smartphone, Bluetooth, Usb, RefreshCw, Wifi, CheckCircle2, AlertCircle, Settings2 } from 'lucide-react';

interface ConnectionScreenProps {
  onConnected: () => void;
}

type InitStep = {
  id: string;
  label: string;
  status: 'pending' | 'loading' | 'success' | 'error';
};

export const ConnectionScreen: React.FC<ConnectionScreenProps> = ({ onConnected }) => {
  const [connectionMode, setConnectionMode] = useState<'wireless' | 'wired'>('wireless');
  const [steps, setSteps] = useState<InitStep[]>([
    { id: 'usb_host', label: 'Initializing USB Host Driver', status: 'pending' },
    { id: 'bt_stack', label: 'Starting Bluetooth Service', status: 'pending' },
    { id: 'overlay', label: 'Checking Overlay Permissions', status: 'pending' },
    { id: 'handshake', label: 'Waiting for device handshake...', status: 'pending' },
  ]);

  useEffect(() => {
    // Simulate system initialization sequence
    let currentStep = 0;
    
    const runSequence = async () => {
      // Step 1: USB
      updateStep(0, 'loading');
      await  new Promise(r => setTimeout(r, 800));
      updateStep(0, 'success');

      // Step 2: Bluetooth
      updateStep(1, 'loading');
      await  new Promise(r => setTimeout(r, 1000));
      updateStep(1, 'success');

      // Step 3: Overlay
      updateStep(2, 'loading');
      await  new Promise(r => setTimeout(r, 600));
      updateStep(2, 'success');

      // Step 4: Ready
      updateStep(3, 'loading');
    };

    runSequence();
  }, []);

  const updateStep = (index: number, status: 'pending' | 'loading' | 'success' | 'error') => {
    setSteps(prev => {
      const newSteps = [...prev];
      newSteps[index].status = status;
      return newSteps;
    });
  };

  const handleSimulateConnection = () => {
    updateStep(3, 'success');
    setTimeout(() => {
        onConnected();
    }, 500);
  };

  return (
    <div className="w-full h-full bg-black flex flex-col relative overflow-hidden">
      {/* Background Tech Pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #4f46e5 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center z-10 p-8">
        
        {/* Central HUD */}
        <div className="relative mb-12">
            <div className="w-48 h-48 rounded-full border-4 border-zinc-800 flex items-center justify-center relative bg-zinc-900/80 backdrop-blur-md">
                {connectionMode === 'wireless' ? (
                     <div className="relative">
                        <Bluetooth size={64} className="text-blue-500 animate-pulse" />
                        <Wifi size={24} className="absolute -top-2 -right-2 text-green-500" />
                     </div>
                ) : (
                    <Usb size={64} className="text-green-500" />
                )}
            </div>
            {/* Spinning ring */}
            <div className="absolute inset-0 rounded-full border-t-4 border-indigo-500 animate-spin duration-[3000ms]"></div>
        </div>

        {/* System Logs / Steps */}
        <div className="w-full max-w-md bg-zinc-900/90 rounded-xl border border-zinc-800 p-6 shadow-2xl backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
                <h3 className="text-zinc-400 text-sm font-mono uppercase tracking-wider">System Boot_Log</h3>
                <span className="text-xs text-green-500 font-mono">v274.12.31</span>
            </div>
            <div className="space-y-3">
                {steps.map((step) => (
                    <div key={step.id} className="flex items-center gap-3 text-sm font-mono">
                        <div className="w-4 flex justify-center">
                            {step.status === 'pending' && <div className="w-2 h-2 rounded-full bg-zinc-700" />}
                            {step.status === 'loading' && <div className="w-3 h-3 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />}
                            {step.status === 'success' && <CheckCircle2 size={16} className="text-green-500" />}
                        </div>
                        <span className={`${step.status === 'pending' ? 'text-zinc-600' : 'text-zinc-300'}`}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        {/* Device Name */}
        <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">CarPlay-Box-7B</h2>
            <p className="text-zinc-500 text-sm">Waiting for connection (com.tencent.mm spoofing active)</p>
        </div>

        {/* Fake Buttons to Switch Modes */}
        <div className="flex gap-4 mt-8">
             <button 
                onClick={() => setConnectionMode('wireless')}
                className={`px-6 py-2 rounded-lg border flex items-center gap-2 ${connectionMode === 'wireless' ? 'bg-indigo-900/30 border-indigo-500 text-white' : 'border-zinc-700 text-zinc-500'}`}
             >
                <Bluetooth size={16} /> Wireless
             </button>
             <button 
                onClick={() => setConnectionMode('wired')}
                className={`px-6 py-2 rounded-lg border flex items-center gap-2 ${connectionMode === 'wired' ? 'bg-indigo-900/30 border-indigo-500 text-white' : 'border-zinc-700 text-zinc-500'}`}
             >
                <Usb size={16} /> Wired
             </button>
        </div>

         {/* Force Connect Button */}
         <button 
          onClick={handleSimulateConnection}
          className="mt-8 text-xs text-zinc-600 hover:text-white transition-colors uppercase tracking-widest border-b border-transparent hover:border-white"
        >
          [ Dev_Mode: Bypass Handshake ]
        </button>

      </div>
    </div>
  );
};
