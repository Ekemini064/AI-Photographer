
export interface HeadshotStyle {
  id: string;
  name: string;
  category: 'Corporate' | 'Modern' | 'Creative' | 'Environment' | 'Studio';
  prompt: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export type AppState = 'upload' | 'generate' | 'edit';
