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
    <div className="flex flex-col sm:flex-row gap-6 items-start">
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

export default function RandomCats() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Random Cats</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Discover a random cat from the internet.</p>
      </div>

      <RandomCatHero />
    </div>
  );
}
