
import React, { useState, useCallback, useRef, useMemo } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  RefreshCw, 
  Wand2, 
  Download, 
  ChevronRight, 
  LayoutGrid, 
  Palette, 
  ArrowLeft, 
  Image as ImageIcon,
  Briefcase,
  Monitor,
  Zap,
  Trees,
  Focus,
  CheckCircle2
} from 'lucide-react';
import { HeadshotStyle, AppState, GeneratedImage } from './types';
import { HEADSHOT_STYLES } from './constants';
import { GeminiService } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('upload');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle>(HEADSHOT_STYLES[0]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const geminiRef = useRef(new GeminiService());

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(HEADSHOT_STYLES.map(s => s.category))];
    return cats;
  }, []);

  const filteredStyles = useMemo(() => {
    if (activeCategory === 'All') return HEADSHOT_STYLES;
    return HEADSHOT_STYLES.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result as string);
        setAppState('generate');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async (styleToUse?: HeadshotStyle) => {
    const style = styleToUse || selectedStyle;
    if (!originalImage) return;
    
    setIsProcessing(true);
    setError(null);
    try {
      const base64 = originalImage.split(',')[1];
      const result = await geminiRef.current.generateHeadshot(base64, style.prompt);
      setGeneratedImage(result);
      setAppState('edit');
      // Scroll to top to see the result
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Failed to generate headshot. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEdit = async () => {
    if (!generatedImage || !editPrompt) return;
    setIsProcessing(true);
    setError(null);
    try {
      const base64 = generatedImage.split(',')[1];
      const result = await geminiRef.current.editHeadshot(base64, editPrompt);
      setGeneratedImage(result);
      setEditPrompt('');
    } catch (err: any) {
      setError(err.message || 'Failed to apply edit. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `headshot-${Date.now()}.png`;
    link.click();
  };

  const reset = () => {
    setAppState('upload');
    setOriginalImage(null);
    setGeneratedImage(null);
    setEditPrompt('');
    setError(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Corporate': return <Briefcase className="w-4 h-4" />;
      case 'Modern': return <Monitor className="w-4 h-4" />;
      case 'Creative': return <Zap className="w-4 h-4" />;
      case 'Environment': return <Trees className="w-4 h-4" />;
      case 'Studio': return <Focus className="w-4 h-4" />;
      default: return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="p-6 border-b border-white/10 flex justify-between items-center glass-panel sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={reset}>
          <div className="bg-indigo-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">HeadshotAI <span className="text-indigo-400">Pro</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Gallery
          </button>
          <button className="px-6 py-2.5 text-sm font-semibold bg-white text-black rounded-full hover:bg-slate-200 transition-all shadow-lg hover:shadow-white/10">
            Go Unlimited
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* Upload State */}
        {appState === 'upload' && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-10 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3 h-3" /> Professional AI Photography
              </div>
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
                Your LinkedIn profile <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">needs an upgrade.</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Transform any casual selfie into a premium, world-class headshot in seconds. No studio, no photographer, just pure AI magic.
              </p>
            </div>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-[2/1] border-2 border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-indigo-500/50 hover:bg-slate-900/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-6 bg-slate-900 rounded-[1.5rem] group-hover:bg-indigo-600 group-hover:scale-110 transition-all duration-300 relative z-10 shadow-xl">
                <Upload className="w-10 h-10 text-slate-400 group-hover:text-white" />
              </div>
              <div className="text-center relative z-10">
                <p className="text-2xl font-bold">Drop your selfie or click to browse</p>
                <p className="text-slate-500 mt-1">High resolution PNG or JPG recommended</p>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileUpload}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4 w-full">
              {[
                { label: '50+ Environments', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                { label: 'Studio Lighting', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
                { label: 'High Fidelity', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
                { label: 'Instant Edits', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' }
              ].map((badge) => (
                <div key={badge.label} className={`px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider ${badge.color}`}>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Generate State */}
        {appState === 'generate' && originalImage && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-500">
            <div className="lg:col-span-4 space-y-6 sticky top-24">
              <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl border border-white/5 aspect-[3/4]">
                <img 
                  src={originalImage} 
                  alt="Original" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button 
                  onClick={() => setAppState('upload')}
                  className="absolute top-4 left-4 p-3 bg-black/50 backdrop-blur-xl rounded-xl hover:bg-black/80 transition-all border border-white/10"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10">
                  <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Source Photo</p>
                  <p className="text-sm font-medium">Original Selfie</p>
                </div>
              </div>

              <button
                onClick={() => handleGenerate()}
                disabled={isProcessing}
                className="w-full py-5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-[1.5rem] font-bold text-lg flex items-center justify-center gap-3 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-600/25 active:scale-95"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-6 h-6" />
                    Generate Masterpiece
                  </>
                )}
              </button>
              
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm">
                  {error}
                </div>
              )}
            </div>

            <div className="lg:col-span-8 flex flex-col h-full gap-6">
              <div className="glass-panel p-8 rounded-[2rem] flex flex-col gap-6 flex-1 shadow-2xl overflow-hidden min-h-[600px] relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <Palette className="w-6 h-6 text-indigo-400" />
                      Choose Your Environment
                    </h3>
                    <p className="text-slate-400">Select a style below to generate your headshot instantly.</p>
                  </div>
                </div>

                {/* Categories Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all border ${
                        activeCategory === cat 
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {getCategoryIcon(cat)}
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Styles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                  {filteredStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => {
                        setSelectedStyle(style);
                        handleGenerate(style);
                      }}
                      className={`group relative p-4 rounded-2xl border text-sm transition-all text-left flex flex-col gap-3 min-h-[100px] ${
                        selectedStyle.id === style.id 
                          ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.1)]' 
                          : 'border-slate-800 hover:border-slate-600 bg-slate-900/40 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className={`p-2 rounded-lg ${
                          selectedStyle.id === style.id ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'
                        } transition-colors`}>
                          {getCategoryIcon(style.category)}
                        </span>
                        {selectedStyle.id === style.id && (
                          <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className={`font-bold transition-colors ${selectedStyle.id === style.id ? 'text-white' : 'text-slate-300'}`}>
                          {style.name}
                        </p>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {style.category}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
                
                {isProcessing && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-8 space-y-6 animate-in fade-in duration-300">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
                      </div>
                    </div>
                    <div className="space-y-2 max-w-sm">
                      <h4 className="text-2xl font-bold">Developing your portrait...</h4>
                      <p className="text-slate-400">Our AI photographer is adjusting lighting and fine-tuning details for the <strong>{selectedStyle.name}</strong> setup.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Edit State */}
        {appState === 'edit' && generatedImage && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in zoom-in-95 duration-500">
            <div className="lg:col-span-7 space-y-6">
               <div className="relative group rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border border-white/5 ring-1 ring-white/10 bg-slate-900">
                <img 
                  src={generatedImage} 
                  alt="Generated" 
                  className="w-full aspect-[3/4] object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl">
                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-0.5">Style</p>
                    <p className="text-sm font-semibold text-white">{selectedStyle.name}</p>
                  </div>
                  <button 
                    onClick={downloadImage}
                    className="p-5 bg-white text-black rounded-full hover:scale-110 active:scale-95 transition-all shadow-2xl"
                  >
                    <Download className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <button 
                  onClick={() => setAppState('generate')}
                  className="py-4 px-6 bg-slate-900 border border-slate-800 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 hover:border-slate-700 transition-all active:scale-95"
                >
                  <RefreshCw className="w-5 h-5 text-indigo-400" />
                  Try Different Style
                </button>
                <button 
                  onClick={downloadImage}
                  className="py-4 px-6 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-200 transition-all active:scale-95 shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Save High-Res
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 sticky top-24">
              <div className="glass-panel p-8 rounded-[2rem] space-y-8 shadow-2xl">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
                    AI Editor
                  </div>
                  <h3 className="text-3xl font-extrabold tracking-tight">
                    Magic Refiner
                  </h3>
                  <p className="text-slate-400 leading-relaxed">Not quite perfect? Tell the AI what to change. It understands natural language requests perfectly.</p>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <textarea
                      value={editPrompt}
                      onChange={(e) => setEditPrompt(e.target.value)}
                      placeholder="e.g., 'Change my suit to navy blue', 'Make the background darker', 'Add a subtle smile'..."
                      className="w-full h-40 bg-slate-950/50 border border-slate-800 rounded-3xl p-6 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none shadow-inner"
                    />
                    <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-600 uppercase">
                      Gemini Vision 2.5
                    </div>
                  </div>
                  
                  <button
                    onClick={handleEdit}
                    disabled={isProcessing || !editPrompt}
                    className="w-full py-5 bg-indigo-600 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-6 h-6 animate-spin" />
                        Retouching...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-6 h-6" />
                        Apply Refinement
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Smart Suggestions</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { text: "Change outfit to professional suit", icon: <Briefcase className="w-3 h-3" /> },
                      { text: "Add warm cinematic lighting", icon: <Zap className="w-3 h-3" /> },
                      { text: "Enhance facial details", icon: <Focus className="w-3 h-3" /> },
                      { text: "Change to black and white", icon: <Palette className="w-3 h-3" /> },
                    ].map((suggestion) => (
                      <button 
                        key={suggestion.text}
                        onClick={() => setEditPrompt(suggestion.text)}
                        className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800 transition-all flex items-center gap-2"
                      >
                        {suggestion.icon}
                        {suggestion.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-[1.5rem] text-sm flex items-start gap-4 animate-in shake duration-500">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">!</div>
                  <p className="font-medium">{error}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="p-12 border-t border-white/5 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-slate-400 grayscale opacity-50">
          <Sparkles className="w-4 h-4" />
          <p className="text-sm font-bold uppercase tracking-widest">Powered by Google Gemini</p>
        </div>
        <p className="text-slate-500 text-xs">© 2024 HeadshotAI Pro. All rights reserved. Your photos are private and never stored on our servers.</p>
      </footer>

      <style>{`
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0); }
          100% { width: 0%; transform: translateX(100%); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
