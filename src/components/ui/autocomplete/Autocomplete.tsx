import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Input, type InputProps } from '../input';
import { dropdownVariants, optionVariants } from './autocomplete.styles';

// ── Types ──────────────────────────────────────────────────────────────────────

export interface AutocompleteOption {
  value: string;
  label: string;
  /** Optional icon rendered before the label. */
  icon?: React.ReactNode;
}

type OptionsResolver =
  | AutocompleteOption[]
  | ((query: string) => AutocompleteOption[] | Promise<AutocompleteOption[]>);

export interface AutocompleteProps
  extends Omit<InputProps, 'value' | 'onChange' | 'onSelect'> {
  /** Static array or async function returning options based on the current query. */
  options: OptionsResolver;
  /** Controlled value. */
  value?: string;
  /** Called when the user types — receives the raw input string. */
  onChange?: (value: string) => void;
  /** Called when the user selects an option. */
  onSelect?: (option: AutocompleteOption) => void;
  /** Maximum number of options shown in the dropdown. Defaults to 8. */
  maxOptions?: number;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="size-4 shrink-0 animate-spin text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

async function resolveOptions(
  resolver: OptionsResolver,
  query: string,
): Promise<AutocompleteOption[]> {
  if (Array.isArray(resolver)) {
    const q = query.toLowerCase();
    return q
      ? resolver.filter(o => o.label.toLowerCase().includes(q))
      : resolver;
  }
  return resolver(query);
}

// ── Component ──────────────────────────────────────────────────────────────────

export const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      options,
      value = '',
      onChange,
      onSelect,
      maxOptions = 8,
      size = 'md',
      disabled,
      ...inputProps
    },
    ref,
  ) => {
    const [query, setQuery] = React.useState(value);
    const [resolvedOptions, setResolvedOptions] = React.useState<AutocompleteOption[]>([]);
    const [open, setOpen] = React.useState(false);
    const [highlighted, setHighlighted] = React.useState(-1);
    const [loading, setLoading] = React.useState(false);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<HTMLUListElement>(null);

    // ── Sync controlled value ────────────────────────────────────────────────
    React.useEffect(() => {
      setQuery(value);
    }, [value]);

    // ── Resolve options when query changes ────────────────────────────────────
    React.useEffect(() => {
      let cancelled = false;
      setLoading(true);

      resolveOptions(options, query).then(results => {
        if (!cancelled) {
          setResolvedOptions(results.slice(0, maxOptions));
          setHighlighted(-1);
          setLoading(false);
        }
      });

      return () => { cancelled = true; };
    }, [options, query, maxOptions]);

    // ── Close on outside click ────────────────────────────────────────────────
    React.useEffect(() => {
      function handlePointerDown(e: PointerEvent) {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      }
      document.addEventListener('pointerdown', handlePointerDown);
      return () => document.removeEventListener('pointerdown', handlePointerDown);
    }, []);

    // ── Scroll highlighted item into view ─────────────────────────────────────
    React.useEffect(() => {
      if (highlighted < 0 || !listRef.current) return;
      const item = listRef.current.children[highlighted] as HTMLElement | undefined;
      item?.scrollIntoView({ block: 'nearest' });
    }, [highlighted]);

    // ── Handlers ─────────────────────────────────────────────────────────────

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      const val = e.target.value;
      setQuery(val);
      onChange?.(val);
      setOpen(true);
    }

    function handleFocus() {
      setOpen(true);
    }

    function handleSelect(option: AutocompleteOption) {
      setQuery(option.label);
      onChange?.(option.label);
      onSelect?.(option);
      setOpen(false);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (!open) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          setOpen(true);
          return;
        }
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlighted(h => Math.min(h + 1, resolvedOptions.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlighted(h => Math.max(h - 1, 0));
          break;
        case 'Enter':
          if (highlighted >= 0 && resolvedOptions[highlighted]) {
            e.preventDefault();
            handleSelect(resolvedOptions[highlighted]);
          }
          break;
        case 'Escape':
          setOpen(false);
          setHighlighted(-1);
          break;
        case 'Tab':
          setOpen(false);
          break;
      }
    }

    const listId = React.useId();
    const isOpen = open && !disabled && resolvedOptions.length > 0;

    return (
      <div ref={containerRef} className="relative w-full">
        <Input
          ref={ref}
          size={size}
          disabled={disabled}
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-activedescendant={highlighted >= 0 ? `${listId}-option-${highlighted}` : undefined}
          rightElement={loading ? <SpinnerIcon /> : <ChevronDownIcon />}
          {...inputProps}
        />

        {isOpen && (
          <div className={cn(dropdownVariants())}>
            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              className="max-h-96 overflow-y-auto py-1"
            >
              {resolvedOptions.map((option, i) => (
                <li
                  key={option.value}
                  id={`${listId}-option-${i}`}
                  role="option"
                  aria-selected={i === highlighted}
                  // Use onPointerDown to fire before blur closes the dropdown
                  onPointerDown={e => { e.preventDefault(); handleSelect(option); }}
                  onMouseEnter={() => setHighlighted(i)}
                  className={cn(optionVariants({ size, highlighted: i === highlighted }))}
                >
                  {option.icon && (
                    <span className="shrink-0 text-gray-400 dark:text-gray-500 [&>svg]:size-4">
                      {option.icon}
                    </span>
                  )}
                  <HighlightedLabel label={option.label} query={query} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
);

Autocomplete.displayName = 'Autocomplete';

// ── HighlightedLabel ───────────────────────────────────────────────────────────

function HighlightedLabel({ label, query }: { label: string; query: string }) {
  if (!query) return <span>{label}</span>;

  const idx = label.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{label}</span>;

  return (
    <span>
      {label.slice(0, idx)}
      <mark className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-sm not-italic font-semibold">
        {label.slice(idx, idx + query.length)}
      </mark>
      {label.slice(idx + query.length)}
    </span>
  );
}
