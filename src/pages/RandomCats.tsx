import { useState, useEffect, useCallback } from 'react';
import { getRandomCat, catByIdUrl, type CatWithUrl } from '../services/cataas';
import { Button } from '../components/ui/button';

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

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
    <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-900/30 bg-gray-100 dark:bg-gray-900">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full">
        {/* Skeleton */}
        {loading && (
          <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-800" />
        )}

        {/* Cat image */}
        {cat && !loading && (
          <img
            key={cat.id}
            src={catByIdUrl(cat.id)}
            alt={cat.tags.join(', ') || 'A random cat'}
            className="w-full h-full object-cover"
          />
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400 p-6 text-center">
            <span className="text-4xl">🐱</span>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Bottom gradient overlay */}
        {cat && !loading && (
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        )}

        {/* Tags on top of image */}
        {cat && !loading && cat.tags.length > 0 && (
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
            {cat.tags.map(tag => (
              <span
                key={tag}
                className="text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/20 px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Skeleton tags */}
        {loading && (
          <div className="absolute bottom-4 left-4 flex gap-1.5">
            {[60, 48, 72].map(w => (
              <div key={w} className="h-5 rounded-full bg-white/20 animate-pulse" style={{ width: w }} />
            ))}
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between px-5 py-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          Cat of the moment
        </p>
        <Button
          leftIcon={<RefreshIcon />}
          onClick={fetchRandom}
          loading={loading}
          size="sm"
        >
          New cat
        </Button>
      </div>
    </div>
  );
}

export default function RandomCats() {
  return (
    <div className="flex flex-col items-center px-6 py-10 gap-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Random Cats</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Discover a random cat from the internet.</p>
      </div>

      <RandomCatHero />
    </div>
  );
}
