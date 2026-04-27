import { useState, useEffect, useCallback } from 'react';
import { listCats, getRandomCat, catByIdUrl, type Cat, type CatWithUrl } from '../services/cataas';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const PAGE_SIZE = 12;

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
  );
}

// ── Random Cat Hero ───────────────────────────────────────────────────────────

function RandomCatHero() {
  const [cat, setCat] = useState<CatWithUrl | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandom = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getRandomCat();
      setCat(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch a random cat.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRandom(); }, [fetchRandom]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start">
      {/* Image */}
      <div className="relative w-full sm:w-72 aspect-square rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-lg shrink-0">
        {loading && (
          <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-800" />
        )}
        {cat && !loading && (
          <img
            key={cat.id}
            src={catByIdUrl(cat.id)}
            alt={cat.tags.join(', ') || 'A random cat'}
            className="w-full h-full object-cover"
          />
        )}
        {error && !loading && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400 p-4 text-center">
            {error}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4 justify-between py-1">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            Cat of the moment
          </p>
          {cat && !loading ? (
            <>
              <p className="font-mono text-sm text-gray-500 dark:text-gray-400 break-all">{cat.id}</p>
              {cat.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {cat.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="flex gap-1.5 mt-1">
                {[60, 48, 72].map(w => (
                  <div key={w} className="h-5 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" style={{ width: w }} />
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          leftIcon={<RefreshIcon />}
          onClick={fetchRandom}
          loading={loading}
          variant="secondary"
          size="sm"
        >
          New random cat
        </Button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function RandomCats() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

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

  const handleSearch = () => {
    const tag = tagInput.trim();
    setActiveTag(tag);
    setSkip(0);
    fetchCats(tag, 0, false);
  };

  const handleLoadMore = () => {
    const nextSkip = skip + PAGE_SIZE;
    setSkip(nextSkip);
    fetchCats(activeTag, nextSkip, true);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Random Cats</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Discover random cats from the internet.</p>
      </div>

      {/* Random cat hero */}
      <RandomCatHero />

      <hr className="border-gray-200 dark:border-gray-800" />

      {/* Tag search */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          Search by tag
        </h2>
        <div className="flex gap-2 max-w-sm">
          <Input
            placeholder="e.g. cute, funny, sleepy…"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <Button leftIcon={<SearchIcon />} onClick={handleSearch} loading={loading}>
            Search
          </Button>
        </div>
        {activeTag && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing results for <span className="font-medium text-indigo-600 dark:text-indigo-400">"{activeTag}"</span>
            <button
              onClick={() => { setTagInput(''); setActiveTag(''); setSkip(0); fetchCats('', 0, false); }}
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

      {/* Load more */}
      {!loading && hasMore && cats.length > 0 && (
        <div className="flex justify-center">
          <Button variant="secondary" onClick={handleLoadMore} loading={loadingMore}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}


