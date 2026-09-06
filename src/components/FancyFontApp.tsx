import React, { useState, useEffect, useMemo, useTransition } from 'react';
import {
  Copy,
  Check,
  Star,
  Dices,
  X,
  Sliders,
  Sparkles,
  Search,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import { FONT_STYLES, type FontStyle } from '../lib/unicode-engine';
import { DECORATORS, type Decorator } from '../lib/decorators';

const SAMPLE_PHRASES = [
  'Fancy Fonts',
  'Aesthetic Vibes',
  'Cyberpunk 2026',
  'Level Up ✦',
  'Follow My Journey ✨',
  'Stay Humble 👑',
  'Digital Nomad',
  'Night Owl ☾',
  'Good Vibes Only',
  'Gamer Pro ⚔️',
  'Dream Big ✧',
  'Lost in Tokyo 🌸',
  'Pure Energy ⚡',
  'Cosmic Mind 🪐'
];

type CategoryKey = 'all' | 'favorites' | 'cursive' | 'gothic' | 'double-struck' | 'small-caps' | 'circled' | 'aesthetic' | 'gaming' | 'monospace';
type CanvasMode = 'auto' | 'light' | 'dark' | 'amoled' | 'contrast';
type ViewDensity = 'grid' | 'stream';

export default function FancyFontApp() {
  const [inputText, setInputText] = useState<string>('Fancy Fonts');
  const [fontSize, setFontSize] = useState<number>(24);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [canvasMode, setCanvasMode] = useState<CanvasMode>('auto');
  const [density, setDensity] = useState<ViewDensity>('grid');
  const [activeDecorator, setActiveDecorator] = useState<Decorator | null>(null);
  const [showDecoratorDrawer, setShowDecoratorDrawer] = useState<boolean>(false);
  const [zalgoChaos, setZalgoChaos] = useState<'low' | 'medium' | 'high'>('medium');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fancyfonts_favorites');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load favorites', e);
    }
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (id: string) => {
    const next = favorites.includes(id) ? favorites.filter(fav => fav !== id) : [...favorites, id];
    setFavorites(next);
    try {
      localStorage.setItem('fancyfonts_favorites', JSON.stringify(next));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
  };

  // Copy to clipboard helper
  const handleCopy = async (id: string, textToCopy: string, fontName: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(id);
      setToastMessage(`Copied "${fontName}" to clipboard!`);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Clipboard copy failed', err);
    }
  };

  // Random sample phrase
  const handleRandomSample = () => {
    const random = SAMPLE_PHRASES[Math.floor(Math.random() * SAMPLE_PHRASES.length)];
    startTransition(() => {
      setInputText(random);
    });
  };

  // Clear text
  const handleClear = () => {
    setInputText('');
  };

  // Filter and sort font styles
  const filteredStyles = useMemo(() => {
    const raw = FONT_STYLES.filter(style => {
      // Category filter
      if (selectedCategory === 'favorites') {
        if (!favorites.includes(style.id)) return false;
      } else if (selectedCategory !== 'all') {
        if (style.category !== selectedCategory) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return style.name.toLowerCase().includes(q) || style.category.toLowerCase().includes(q);
      }
      return true;
    });

    // Sort pinned favorites first if viewing 'all' or standard categories
    if (selectedCategory !== 'favorites') {
      return [...raw].sort((a, b) => {
        const aFav = favorites.includes(a.id) ? 1 : 0;
        const bFav = favorites.includes(b.id) ? 1 : 0;
        return bFav - aFav;
      });
    }

    return raw;
  }, [selectedCategory, searchQuery, favorites]);

  // Categories list
  const categories: { key: CategoryKey; label: string; count?: number }[] = [
    { key: 'all', label: 'All Styles', count: FONT_STYLES.length },
    { key: 'favorites', label: 'Favorites', count: favorites.length },
    { key: 'cursive', label: 'Cursive / Script' },
    { key: 'gothic', label: 'Gothic / Fraktur' },
    { key: 'double-struck', label: 'Double-Struck' },
    { key: 'small-caps', label: 'Small Caps' },
    { key: 'circled', label: 'Circled & Bubble' },
    { key: 'aesthetic', label: 'Aesthetic' },
    { key: 'gaming', label: 'Gaming & Glitch' },
    { key: 'monospace', label: 'Monospace' },
  ];

  // Canvas mode classes
  const canvasClass =
    canvasMode === 'light'
      ? 'canvas-light'
      : canvasMode === 'dark'
      ? 'canvas-dark'
      : canvasMode === 'amoled'
      ? 'canvas-amoled'
      : canvasMode === 'contrast'
      ? 'canvas-contrast'
      : '';

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ${canvasClass}`}>
      {/* HERO INPUT BAR */}
      <section className="relative rounded-2xl bg-gradient-to-b from-purple-500/10 via-indigo-500/5 to-transparent p-1 sm:p-2 backdrop-blur-xl border border-purple-500/20 shadow-xl mb-8">
        <div className="theme-panel rounded-xl p-4 sm:p-6 backdrop-blur-md shadow-sm border border-[var(--border)]">
          <div className="flex flex-col gap-3">
            {/* Input Label & Live Stats */}
            <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-[var(--muted-foreground)]">
              <span className="flex items-center gap-1.5 font-semibold text-purple-500">
                <Sparkles className="w-4 h-4" /> Live Unicode Keystroke Processor
              </span>
              <div className="flex items-center gap-3">
                <span>{inputText.length} chars</span>
                <span>•</span>
                <span>{inputText.trim() ? inputText.trim().split(/\s+/).length : 0} words</span>
              </div>
            </div>

            {/* Input Field with Action Buttons */}
            <div className="relative flex items-center">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste your text here to generate fancy fonts in real time..."
                rows={2}
                className="w-full text-lg sm:text-2xl font-medium theme-well rounded-xl px-4 py-3.5 pr-28 border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none transition-all placeholder:text-[var(--muted-foreground)]"
              />

              <div className="absolute right-3 top-3.5 flex items-center gap-1.5">
                {inputText && (
                  <button
                    onClick={handleClear}
                    title="Clear text"
                    aria-label="Clear input"
                    className="p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] theme-well rounded-lg hover:border-purple-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleRandomSample}
                  title="Random sample quote"
                  aria-label="Generate random sample text"
                  className="flex items-center gap-1 px-3 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md hover:shadow-purple-500/25 transition-all cursor-pointer"
                >
                  <Dices className="w-4 h-4" />
                  <span className="hidden sm:inline">Random</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE CONTROLS TOOLBAR (Resizing, Canvas Contrast, Decorator toggle, Search) */}
      <section className="sticky top-16 z-30 mb-8 rounded-2xl theme-panel border border-[var(--border)] backdrop-blur-xl shadow-lg p-4 transition-all">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* FONT RESIZE SLIDER */}
          <div className="w-full lg:w-auto flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-purple-500" />
              <span>Preview Size:</span>
            </div>

            <div className="flex items-center gap-2 theme-well rounded-xl p-1.5 px-3 border border-[var(--border)]">
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                title="Decrease font size"
                className="w-6 h-6 flex items-center justify-center text-sm font-bold text-[var(--foreground)] hover:text-purple-500 cursor-pointer"
              >
                -
              </button>

              <input
                type="range"
                min="14"
                max="44"
                step="1"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-24 sm:w-32 h-1.5 rounded-lg cursor-pointer"
                title={`Font Size: ${fontSize}px`}
              />

              <button
                onClick={() => setFontSize(Math.min(44, fontSize + 2))}
                title="Increase font size"
                className="w-6 h-6 flex items-center justify-center text-sm font-bold text-[var(--foreground)] hover:text-purple-500 cursor-pointer"
              >
                +
              </button>

              <span className="font-mono text-xs font-bold text-purple-500 min-w-[2.5rem] text-right">
                {fontSize}px
              </span>
            </div>

            {/* Quick Size Presets */}
            <div className="hidden sm:flex items-center gap-1 theme-well p-1 rounded-xl border border-[var(--border)]">
              {[
                { label: 'S', size: 16 },
                { label: 'M', size: 22 },
                { label: 'L', size: 28 },
                { label: 'XL', size: 36 },
              ].map(preset => (
                <button
                  key={preset.label}
                  onClick={() => setFontSize(preset.size)}
                  className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    fontSize === preset.size
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* SECONDARY CONTROLS (Decorator Drawer Button, Canvas Contrast, Density, Search) */}
          <div className="w-full lg:w-auto flex flex-wrap items-center justify-between lg:justify-end gap-2.5">
            
            {/* Decorator Drawer Toggle */}
            <button
              onClick={() => setShowDecoratorDrawer(!showDecoratorDrawer)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                activeDecorator || showDecoratorDrawer
                  ? 'bg-purple-500/15 border-purple-500/40 text-purple-500 shadow-sm'
                  : 'theme-well border border-[var(--border)] text-[var(--foreground)] hover:border-purple-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>Decorators {activeDecorator ? `(Active)` : ''}</span>
              {showDecoratorDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Canvas Contrast Picker */}
            <div className="flex items-center theme-well rounded-xl p-1 border border-[var(--border)]">
              <span className="px-2 text-xs text-[var(--muted-foreground)] font-medium hidden sm:inline">Canvas:</span>
              {[
                { id: 'auto', title: 'Follow Theme', label: 'Default' },
                { id: 'light', title: 'Light Canvas', label: 'Light' },
                { id: 'dark', title: 'Charcoal Dark', label: 'Dark' },
                { id: 'amoled', title: 'OLED Pure Black', label: 'OLED' },
                { id: 'contrast', title: 'Neon High Contrast', label: 'Neon' },
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setCanvasMode(mode.id as CanvasMode)}
                  title={mode.title}
                  className={`px-2 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    canvasMode === mode.id
                      ? 'bg-purple-600 text-white font-bold shadow-sm'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {/* View Density Mode */}
            <div className="flex items-center theme-well rounded-xl p-1 border border-[var(--border)]">
              <button
                onClick={() => setDensity('grid')}
                title="Grid View"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  density === 'grid'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDensity('stream')}
                title="Stream / List View"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  density === 'stream'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* In-Style Search */}
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[var(--muted-foreground)] pointer-events-none" />
              <input
                type="text"
                placeholder="Search styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-40 text-xs theme-well text-[var(--foreground)] rounded-xl pl-8 pr-3 py-2 border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder:text-[var(--muted-foreground)]"
              />
            </div>
          </div>
        </div>

        {/* COLLAPSIBLE DECORATOR STUDIO DRAWER */}
        {showDecoratorDrawer && (
          <div className="mt-4 pt-4 border-t border-[var(--border)] animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                Pick a Decorator / Frame Wrapper:
              </span>
              {activeDecorator && (
                <button
                  onClick={() => setActiveDecorator(null)}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Clear Decorator
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1">
              {DECORATORS.map(dec => {
                const isSelected = activeDecorator?.id === dec.id;
                return (
                  <button
                    key={dec.id}
                    onClick={() => setActiveDecorator(isSelected ? null : dec)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all text-xs cursor-pointer ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-[1.02]'
                        : 'theme-well border border-[var(--border)] hover:border-purple-400 text-[var(--foreground)]'
                    }`}
                  >
                    <span className="font-mono text-sm mb-1 truncate max-w-full">
                      {dec.preview}
                    </span>
                    <span className={`text-[10px] ${isSelected ? 'text-purple-100' : 'text-[var(--muted-foreground)]'} truncate max-w-full`}>
                      {dec.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* CATEGORY FILTER BAR */}
      <section className="mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-2 min-w-max">
          {categories.map(cat => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 scale-[1.02]'
                    : 'theme-panel border border-[var(--border)] text-[var(--foreground)] hover:border-purple-400'
                }`}
              >
                {cat.key === 'favorites' && <Star className={`w-3.5 h-3.5 ${isActive ? 'fill-current' : 'text-amber-400'}`} />}
                <span>{cat.label}</span>
                {cat.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-purple-800/60 text-purple-100'
                        : 'theme-well text-[var(--muted-foreground)]'
                    }`}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* OUTPUT CARD GRID / STREAM */}
      <section className="mb-12">
        {filteredStyles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--border)] p-12 text-center theme-panel">
            <p className="text-[var(--muted-foreground)] text-base font-medium">
              {selectedCategory === 'favorites'
                ? 'No favorites starred yet. Click the star icon on any font card to pin it here!'
                : `No font styles matched "${searchQuery}". Try a different keyword.`}
            </p>
            {selectedCategory === 'favorites' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-4 px-4 py-2 text-xs font-semibold bg-purple-600 text-white rounded-xl hover:bg-purple-700 cursor-pointer"
              >
                Explore All Styles
              </button>
            )}
          </div>
        ) : (
          <div
            className={
              density === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'flex flex-col gap-3'
            }
          >
            {filteredStyles.map(style => {
              const isFav = favorites.includes(style.id);
              const isCopied = copiedId === style.id;
              const textContent = inputText || 'Fancy Fonts';

              // Transform raw text
              let transformed = style.transform(textContent, { zalgoChaos });

              // Apply active decorator if chosen
              if (activeDecorator) {
                transformed = `${activeDecorator.prefix}${transformed}${activeDecorator.suffix}`;
              }

              return (
                <div
                  key={style.id}
                  className={`font-card group relative flex flex-col justify-between rounded-2xl theme-font-card border transition-all shadow-sm hover:shadow-md p-4 sm:p-5 ${
                    isFav
                      ? 'ring-2 ring-amber-400/80 shadow-sm'
                      : 'hover:border-purple-400'
                  }`}
                >
                  {/* Card Header: Style Name & Category Tag & Favorite */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="font-semibold text-xs text-[var(--canvas-text)] truncate">
                        {style.name}
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-md theme-well text-[var(--muted-foreground)] flex-shrink-0">
                        {style.category}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleFavorite(style.id)}
                      title={isFav ? 'Remove from favorites' : 'Pin to favorites'}
                      aria-label="Toggle favorite"
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isFav
                          ? 'text-amber-400 bg-amber-400/15'
                          : 'text-[var(--muted-foreground)] hover:text-amber-400 theme-well'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Rendered Unicode Text Output */}
                  <div className="my-2 min-h-[4rem] flex items-center overflow-x-auto py-2">
                    <p
                      className="font-normal leading-relaxed select-all break-words w-full"
                      style={{ fontSize: `${fontSize}px`, color: 'var(--canvas-text)' }}
                    >
                      {transformed}
                    </p>
                  </div>

                  {/* Card Footer: 1-Click Copy Button */}
                  <div className="mt-3 pt-3 border-t border-[var(--canvas-border)] flex items-center justify-between gap-2">
                    {style.id === 'glitch-zalgo' && (
                      <div className="flex items-center gap-1 text-[10px] text-[var(--muted-foreground)]">
                        <span>Chaos:</span>
                        {(['low', 'medium', 'high'] as const).map(lvl => (
                          <button
                            key={lvl}
                            onClick={() => setZalgoChaos(lvl)}
                            className={`px-1.5 py-0.5 rounded cursor-pointer ${
                              zalgoChaos === lvl ? 'bg-purple-600 text-white font-bold' : 'theme-well'
                            }`}
                          >
                            {lvl[0].toUpperCase()}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="ml-auto">
                      <button
                        onClick={() => handleCopy(style.id, transformed, style.name)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isCopied
                            ? 'bg-emerald-600 text-white shadow-emerald-500/25 scale-105'
                            : 'theme-well hover:bg-purple-600 hover:text-white text-[var(--canvas-text)] border border-[var(--canvas-border)]'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 animate-bounce" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Font</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* FLOATING CLIPBOARD TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-2.5 px-4 py-3 theme-panel text-[var(--foreground)] rounded-2xl shadow-2xl border border-[var(--border)] backdrop-blur-md text-xs font-semibold">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
