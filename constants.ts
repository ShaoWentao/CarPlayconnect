import { Music, Map, Phone, Settings, Grid, Calendar, MessageSquare, Radio, Mic } from 'lucide-react';
import { AppIcon, ViewState } from './types';

export const APP_GRID: AppIcon[] = [
  { id: 'maps', name: 'Maps', icon: Map, color: 'bg-green-500', view: ViewState.MAPS },
  { id: 'music', name: 'Music', icon: Music, color: 'bg-red-500', view: ViewState.MUSIC },
  { id: 'phone', name: 'Phone', icon: Phone, color: 'bg-green-600', view: ViewState.APPS }, // Placeholder
  { id: 'messages', name: 'Messages', icon: MessageSquare, color: 'bg-blue-500', view: ViewState.APPS },
  { id: 'nowplaying', name: 'Now Playing', icon: Radio, color: 'bg-pink-500', view: ViewState.MUSIC },
  { id: 'calendar', name: 'Calendar', icon: Calendar, color: 'bg-red-600', view: ViewState.APPS },
  { id: 'settings', name: 'Settings', icon: Settings, color: 'bg-gray-500', view: ViewState.SETTINGS },
  { id: 'assistant', name: 'Co-Pilot', icon: Mic, color: 'bg-gradient-to-br from-indigo-500 to-purple-500', view: ViewState.DASHBOARD },
];

export const MOCK_MUSIC_DATA = {
  title: "Nightcall",
  artist: "Kavinsky",
  album: "OutRun",
  cover: "https://picsum.photos/400/400?grayscale"
};
