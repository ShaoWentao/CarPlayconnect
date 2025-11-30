
export enum ViewState {
  CONNECTION = 'CONNECTION',
  DASHBOARD = 'DASHBOARD',
  APPS = 'APPS',
  SETTINGS = 'SETTINGS',
  MUSIC = 'MUSIC',
  MAPS = 'MAPS'
}

export interface AppIcon {
  id: string;
  name: string;
  icon: any; // Lucide icon component
  color: string;
  view: ViewState;
}

export interface AssistantMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface SystemSetting {
  id: string;
  label: string;
  description?: string;
  value: boolean | string;
  type: 'toggle' | 'select' | 'info';
  options?: string[];
}
