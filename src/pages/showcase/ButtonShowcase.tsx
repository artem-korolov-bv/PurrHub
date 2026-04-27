import { useState } from 'react';
import { Button } from '../../components/ui/button';

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function WarnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </svg>
  );
}

export default function ButtonShowcase() {
  const [loading, setLoading] = useState(false);

  function simulateLoad() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Button</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">All variants, sizes and states</p>
      </div>

      {/* Variants */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Variants</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button variant="success" size="sm">Small</Button>
          <Button variant="success" size="md">Medium</Button>
          <Button variant="success" size="lg">Large</Button>
        </div>
      </section>

      {/* Icons */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">With icons</h2>
        <div className="flex flex-wrap gap-3">
          <Button leftIcon={<PlusIcon />}>New item</Button>
          <Button variant="secondary" rightIcon={<ArrowRightIcon />}>Continue</Button>
          <Button variant="success" leftIcon={<CheckIcon />}>Confirm</Button>
          <Button variant="warning" leftIcon={<WarnIcon />}>Caution</Button>
          <Button variant="danger" leftIcon={<TrashIcon />}>Delete</Button>
          <Button variant="ghost" leftIcon={<PlusIcon />} size="sm">Add tag</Button>
        </div>
      </section>

      {/* Loading */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Loading</h2>
        <div className="flex flex-wrap gap-3">
          <Button loading>Primary</Button>
          <Button variant="secondary" loading>Secondary</Button>
          <Button variant="success" loading>Saving…</Button>
          <Button variant="warning" loading>Processing…</Button>
          <Button variant="danger" loading>Deleting…</Button>
          <Button loading={loading} onClick={simulateLoad}>
            {loading ? 'Saving…' : 'Click to load (2s)'}
          </Button>
        </div>
      </section>

      {/* Disabled */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Disabled</h2>
        <div className="flex flex-wrap gap-3">
          <Button disabled>Primary</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="ghost" disabled>Ghost</Button>
          <Button variant="success" disabled>Success</Button>
          <Button variant="warning" disabled>Warning</Button>
          <Button variant="danger" disabled>Danger</Button>
        </div>
      </section>

      {/* Full width */}
      <section className="space-y-3 max-w-sm">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Full width</h2>
        <Button fullWidth leftIcon={<CheckIcon />}>Confirm purchase</Button>
        <Button fullWidth variant="secondary">Cancel</Button>
      </section>
    </div>
  );
}

