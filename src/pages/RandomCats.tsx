import { useState, useEffect, useCallback } from 'react';
import { listCats, catByIdUrl, type Cat } from '../services/cataas';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const PAGE_SIZE = 12;

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
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Random Cats</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Discover random cats from the internet.</p>
      </div>

      {/* Tag filter */}
      <div className="flex gap-2 max-w-sm">
        <Input
          placeholder="Filter by tag…"
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} loading={loading}>
          Search
        </Button>
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


