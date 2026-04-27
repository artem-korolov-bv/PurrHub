import { useState } from 'react';
import { Autocomplete, type AutocompleteOption } from '../../components/ui/autocomplete';

// ── Static dataset ────────────────────────────────────────────────────────────

const COUNTRIES: AutocompleteOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'br', label: 'Brazil' },
  { value: 'in', label: 'India' },
  { value: 'mx', label: 'Mexico' },
  { value: 'it', label: 'Italy' },
  { value: 'es', label: 'Spain' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'se', label: 'Sweden' },
  { value: 'no', label: 'Norway' },
  { value: 'pl', label: 'Poland' },
  { value: 'ua', label: 'Ukraine' },
];

const CAT_TAGS: AutocompleteOption[] = [
  'cute', 'funny', 'sleepy', 'angry', 'fluffy', 'black', 'orange',
  'white', 'grey', 'tabby', 'kitten', 'grumpy', 'happy', 'sad',
  'playful', 'lazy', 'fat', 'big', 'small',
].map(t => ({ value: t, label: t }));

// ── Async resolver — simulates a network call ─────────────────────────────────

async function fetchSuggestions(query: string): Promise<AutocompleteOption[]> {
  await new Promise(r => setTimeout(r, 350));
  const q = query.toLowerCase();
  return COUNTRIES.filter(c => c.label.toLowerCase().includes(q));
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ── Showcase ──────────────────────────────────────────────────────────────────

export default function AutocompleteShowcase() {
  const [country, setCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<AutocompleteOption | null>(null);

  const [asyncValue, setAsyncValue] = useState('');
  const [selectedAsync, setSelectedAsync] = useState<AutocompleteOption | null>(null);

  const [tag, setTag] = useState('');

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Autocomplete</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">
          Keyboard-navigable dropdown with highlight, async support and icon slots.
        </p>
      </div>

      {/* Static options */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Static options</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Options filtered client-side from a fixed array.</p>
        <div className="max-w-sm space-y-1">
          <Autocomplete
            label="Country"
            placeholder="Search countries…"
            options={COUNTRIES}
            value={country}
            onChange={setCountry}
            onSelect={o => { setSelectedCountry(o); setCountry(o.label); }}
            hint="Start typing to filter the list."
          />
          {selectedCountry && (
            <p className="text-xs text-indigo-600 dark:text-indigo-400">
              Selected: <strong>{selectedCountry.label}</strong> ({selectedCountry.value})
            </p>
          )}
        </div>
      </section>

      {/* Async options */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Async options</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Options resolved from an async function (350 ms simulated delay).</p>
        <div className="max-w-sm space-y-1">
          <Autocomplete
            label="Country (async)"
            placeholder="Type to search…"
            options={fetchSuggestions}
            value={asyncValue}
            onChange={setAsyncValue}
            onSelect={o => { setSelectedAsync(o); setAsyncValue(o.label); }}
            leftElement={<GlobeIcon />}
          />
          {selectedAsync && (
            <p className="text-xs text-indigo-600 dark:text-indigo-400">
              Selected: <strong>{selectedAsync.label}</strong>
            </p>
          )}
        </div>
      </section>

      {/* With icons */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">With option icons</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Each option can carry an icon node.</p>
        <div className="max-w-sm">
          <Autocomplete
            label="Cat tag"
            placeholder="Search tags…"
            options={CAT_TAGS.map(t => ({ ...t, icon: <TagIcon /> }))}
            value={tag}
            onChange={setTag}
            onSelect={o => setTag(o.label)}
            hint="Used to filter cats on the Search Cats page."
          />
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Sizes</h2>
        <div className="flex flex-col gap-4 max-w-sm">
          <Autocomplete size="sm" label="Small" placeholder="Small (sm)" options={COUNTRIES} />
          <Autocomplete size="md" label="Medium" placeholder="Medium (md)" options={COUNTRIES} />
          <Autocomplete size="lg" label="Large" placeholder="Large (lg)" options={COUNTRIES} />
        </div>
      </section>

      {/* Disabled */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Disabled</h2>
        <div className="max-w-sm">
          <Autocomplete
            label="Disabled"
            placeholder="Can't open this"
            options={COUNTRIES}
            value="United States"
            disabled
          />
        </div>
      </section>
    </div>
  );
}
