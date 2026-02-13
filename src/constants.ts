
// src/constants.ts
export const MODEL_NAME = 'gemini-2.5-flash-image';

import { HeadshotStyle } from './types';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  // Corporate
  { id: 'corp-grey', name: 'Corporate Grey Backdrop', category: 'Corporate', prompt: 'classic professional headshot with a solid neutral grey studio backdrop, corporate lighting' },
  { id: 'boardroom', name: 'Executive Boardroom', category: 'Corporate', prompt: 'high-end executive boardroom with a polished mahogany table and skyline view' },
  { id: 'luxury-office', name: 'Luxury Office Interior', category: 'Corporate', prompt: 'opulent private office with leather furniture, wood paneling, and warm lighting' },
  { id: 'reception', name: 'Reception Lobby', category: 'Corporate', prompt: 'modern professional corporate reception area with marble floors and soft architectural lighting' },
  { id: 'library-wall', name: 'Library Bookshelf Wall', category: 'Corporate', prompt: 'sophisticated intellectual look with floor-to-ceiling library bookshelves as background' },
  { id: 'exhibition', name: 'Exhibition Booth', category: 'Corporate', prompt: 'modern professional trade show exhibition booth environment' },
  { id: 'hotel-lobby', name: 'Elegant Hotel Lobby', category: 'Corporate', prompt: 'grand luxurious hotel lobby with crystal chandeliers and upscale atmosphere' },
  
  // Modern / Tech
  { id: 'tech-office', name: 'Modern Tech Office', category: 'Modern', prompt: 'sleek contemporary tech office with glass partitions, ergonomic furniture and natural lighting' },
  { id: 'glass-conf', name: 'Glass-Wall Conference Room', category: 'Modern', prompt: 'bright modern conference room with floor-to-ceiling glass walls and minimalist design' },
  { id: 'startup-hub', name: 'Startup Coworking Hub', category: 'Modern', prompt: 'vibrant casual coworking space with plants, modern art, and collaborative energy' },
  { id: 'highrise-view', name: 'High-Rise City View Office', category: 'Modern', prompt: 'luxury office overlooking a dense city skyline from a very high floor' },
  { id: 'data-center', name: 'Data Center Corridor', category: 'Modern', prompt: 'high-tech data center corridor with glowing blue server rack lights' },
  { id: 'server-rack', name: 'Server Rack Background', category: 'Modern', prompt: 'dense wall of professional server racks with blinking status LEDs' },
  { id: 'multi-screen', name: 'Developer Multi-Screen Workstation', category: 'Modern', prompt: 'advanced developer workstation with multiple monitors displaying code' },
  { id: 'home-office', name: 'Home Office', category: 'Modern', prompt: 'clean organized modern home office with a minimalist desk setup' },
  { id: 'coffee-shop', name: 'Coffee Shop Interior', category: 'Modern', prompt: 'modern aesthetic coffee shop with industrial lighting and warm atmosphere' },
  { id: 'brick-loft', name: 'Brick Wall Loft', category: 'Modern', prompt: 'industrial chic loft apartment with exposed red brick and large windows' },
  
  // Creative / Futuristic
  { id: 'news-set', name: 'News Interview Set', category: 'Creative', prompt: 'professional television news studio set with dynamic lighting and background screens' },
  { id: 'futuristic-control', name: 'Futuristic Control Room', category: 'Creative', prompt: 'sci-fi mission control center with glowing command consoles and screens' },
  { id: 'ai-lab', name: 'AI Lab Environment', category: 'Creative', prompt: 'futuristic artificial intelligence research laboratory with high-tech equipment' },
  { id: 'holographic-room', name: 'Holographic Interface Room', category: 'Creative', prompt: 'hi-tech lab with glowing 3D holographic displays and blue ambient light' },
  { id: 'cyberpunk-neon', name: 'Cyberpunk Neon Workspace', category: 'Creative', prompt: 'futuristic urban workspace with soft magenta and cyan neon accents' },
  { id: 'robotics-lab', name: 'Robotics Laboratory', category: 'Creative', prompt: 'advanced robotics engineering lab with mechanical arms and parts in background' },
  { id: 'mission-control', name: 'Mission Control Center', category: 'Creative', prompt: 'space agency mission control room with large map screens' },
  { id: 'vr-studio', name: 'Virtual Reality Studio', category: 'Creative', prompt: 'modern VR production studio with motion capture sensors and high-tech gear' },
  { id: 'podcast-studio', name: 'Podcast Studio', category: 'Creative', prompt: 'professional podcasting studio with high-end microphones and soundproofing' },
  { id: 'yt-creator', name: 'YouTube Creator Desk', category: 'Creative', prompt: 'aesthetic YouTuber desk setup with RGB lighting and professional camera gear' },
  { id: 'stage-spotlight', name: 'Stage with Spotlight', category: 'Creative', prompt: 'dramatic stage environment with a single powerful spotlight and dark background' },
  { id: 'led-wall', name: 'LED Wall Background', category: 'Creative', prompt: 'modern production studio with a massive glowing LED video wall background' },
  { id: 'mural-wall', name: 'Artistic Mural Wall', category: 'Creative', prompt: 'vibrant artistic background featuring a modern colorful wall mural' },

  // Environment / Outdoor
  { id: 'outdoor-light', name: 'Outdoor Natural Light', category: 'Environment', prompt: 'outdoor setting with soft morning sunlight and slightly blurred natural scenery' },
  { id: 'urban-street', name: 'Urban Street Scene', category: 'Environment', prompt: 'sophisticated urban city street with blurred architectural details and bokeh' },
  { id: 'rooftop-skyline', name: 'Rooftop Skyline', category: 'Environment', prompt: 'modern rooftop lounge with a panoramic city skyline at dusk' },
  { id: 'university', name: 'University Campus', category: 'Environment', prompt: 'prestigious university campus background with classic academic architecture' },
  { id: 'park-setting', name: 'Park Setting', category: 'Environment', prompt: 'lush green park background with sunlight filtering through tree leaves' },
  { id: 'sunset-water', name: 'Sunset Waterfront', category: 'Environment', prompt: 'beautiful waterfront background during the golden hour sunset' },
  { id: 'cafe-exterior', name: 'Café Exterior', category: 'Environment', prompt: 'charming European-style sidewalk café exterior background' },
  { id: 'industrial-dist', name: 'Industrial District', category: 'Environment', prompt: 'gritty but professional urban industrial area with steel and concrete' },
  { id: 'tropical-env', name: 'Tropical Environment', category: 'Environment', prompt: 'lush tropical paradise background with palm trees and soft light' },
  { id: 'mountain-overlook', name: 'Mountain Overlook', category: 'Environment', prompt: 'breathtaking mountain range vista background with high altitude clarity' },
  { id: 'night-lights', name: 'Night City Lights', category: 'Environment', prompt: 'vibrant city night life background with colorful blurred bokeh lights' },
  { id: 'indoor-plants', name: 'Indoor Plants Aesthetic', category: 'Environment', prompt: 'clean interior filled with lush green house plants and natural light' },

  // Studio
  { id: 'white-studio', name: 'Minimal White Studio', category: 'Studio', prompt: 'clean minimalist white photography studio with high-key lighting' },
  { id: 'dark-marble', name: 'Dark Marble Backdrop', category: 'Studio', prompt: 'premium dark marble wall texture with sophisticated spot lighting' },
  { id: 'clean-gradient', name: 'Clean Gradient Background', category: 'Studio', prompt: 'professional abstract gradient background in soft blue and grey tones' },
  { id: 'softbox-studio', name: 'Photography Studio with Softboxes', category: 'Studio', prompt: 'professional photography studio setting showing softbox lights in background' },
  { id: 'film-set', name: 'Film Set Environment', category: 'Studio', prompt: 'professional movie set background with cameras and lighting equipment visible' },
  { id: 'green-screen', name: 'Green Screen Studio', category: 'Studio', prompt: 'professional visual effects studio with a clean green screen background' },
  { id: 'mag-cover', name: 'Magazine Cover Setup', category: 'Studio', prompt: 'high-fashion magazine cover studio setup with high-contrast lighting' },
  { id: 'product-launch', name: 'Product Launch Stage', category: 'Studio', prompt: 'sleek tech product launch stage with dramatic event lighting' },
  { id: 'pastel-studio', name: 'Soft Pastel Studio', category: 'Studio', prompt: 'modern photography studio with soft pastel colored paper backdrops' },
  { id: 'lounge-env', name: 'Lounge Environment', category: 'Studio', prompt: 'sophisticated modern lounge with low-key moody atmospheric lighting' },
  { id: 'fireplace', name: 'Fireplace Setting', category: 'Studio', prompt: 'cozy luxury interior with a glowing fireplace in the background' }
];

