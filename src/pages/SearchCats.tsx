import { useState, useEffect, useCallback, useRef } from 'react';
import { listCats, listTags, catByIdUrl, type Cat } from '../services/cataas';
import { Button } from '../components/ui/button';
import { Autocomplete, type AutocompleteOption } from '../components/ui/autocomplete';

const PAGE_SIZE = 12;

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
  );
}

export default function SearchCats() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [tagOptions, setTagOptions] = useState<AutocompleteOption[]>([]);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listTags()
      .then(tags => setTagOptions(tags.map(t => ({ value: t, label: t }))))
      .catch(() => {}); // non-critical — autocomplete still works without suggestions
  }, []);

  const fetchCats = useCallback(async (tag: string, skipCount: number, append: boolean) => {
    append ? setLoadingMore(true) : setLoading(true);
    setError(null);
    try {
      const results = await listCats({
        tags: tag ? [tag] : undefined,
        limit: PAGE_SIZE,
        skip: skipCount,
      });
      setCats(prev => append ? [...prev, ...results] : results);
      setHasMore(results.length === PAGE_SIZE);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load cats.');
    } finally {
      append ? setLoadingMore(false) : setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCats('', 0, false);
  }, [fetchCats]);

  const handleSearch = useCallback((tag: string) => {
    setActiveTag(tag);
    setSkip(0);
    fetchCats(tag, 0, false);
  }, [fetchCats]);

  const handleClear = () => {
    setTagInput('');
    setActiveTag('');
    setSkip(0);
    fetchCats('', 0, false);
  };

  const handleLoadMore = useCallback(() => {
    const nextSkip = skip + PAGE_SIZE;
    setSkip(nextSkip);
    fetchCats(activeTag, nextSkip, true);
  }, [skip, activeTag, fetchCats]);

  // Auto-load on scroll — watch the sentinel element
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading && !loadingMore) {
          handleLoadMore();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore, handleLoadMore]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Search Cats</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Find cats by tag — try "cute", "funny" or "sleepy".</p>
      </div>

      {/* Search bar */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 max-w-sm items-end">
          <Autocomplete
            placeholder="e.g. cute, funny, sleepy…"
            options={tagOptions}
            value={tagInput}
            onChange={setTagInput}
            onSelect={o => {
              setTagInput(o.label);
              handleSearch(o.value);
            }}
            maxOptions={Infinity}
          />
          <Button
            leftIcon={<SearchIcon />}
            onClick={() => handleSearch(tagInput.trim())}
            loading={loading}
          >
            Search
          </Button>
        </div>
        {activeTag && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Results for{' '}
            <span className="font-medium text-indigo-600 dark:text-indigo-400">"{activeTag}"</span>
            <button
              onClick={handleClear}
              className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Clear tag filter"
            >
              ✕
            </button>
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-rose-600 dark:text-rose-400 text-sm">{error}</p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="aspect-square rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      ) : cats.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No cats found{activeTag ? ` for tag "${activeTag}"` : ''}.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cats.map(cat => (
            <div
              key={cat.id}
              className="group relative aspect-square rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={catByIdUrl(cat.id, { type: 'square' })}
                alt={cat.tags.join(', ') || 'A cat'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              {cat.tags.length > 0 && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  <div className="flex flex-wrap gap-1">
                    {cat.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-xs bg-black/40 text-white px-1.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="flex justify-center py-4">
        {loadingMore && (
          <svg className="animate-spin size-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
      </div>
    </div>
  );
}
