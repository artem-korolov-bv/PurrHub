import { Input } from '../../components/ui/input';

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 7l10 7 10-7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function AtIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.4 7" />
    </svg>
  );
}

export default function InputShowcase() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Input</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">All variants, sizes and states</p>
      </div>

      {/* States */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">States</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          <Input label="Default" placeholder="Type something…" hint="This is a hint." />
          <Input label="Success" state="success" placeholder="Looks good!" hint="All good." />
          <Input label="Warning" state="warning" placeholder="Check this…" hint="Please review." />
          <Input label="Error" placeholder="Invalid value" errorMessage="This field is required." />
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Sizes</h2>
        <div className="flex flex-col gap-3 max-w-sm">
          <Input size="sm" placeholder="Small (sm)" label="Small" />
          <Input size="md" placeholder="Medium (md)" label="Medium" />
          <Input size="lg" placeholder="Large (lg)" label="Large" />
        </div>
      </section>

      {/* With icons */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">With icons</h2>
        <div className="flex flex-col gap-3 max-w-sm">
          <Input label="Search" placeholder="Search…" leftElement={<SearchIcon />} />
          <Input label="Email" placeholder="you@example.com" leftElement={<MailIcon />} type="email" />
          <Input label="Password" placeholder="••••••••" leftElement={<LockIcon />} rightElement={<EyeIcon />} type="password" />
          <Input label="Username" placeholder="username" leftElement={<AtIcon />} hint="Only letters, numbers and underscores." />
        </div>
      </section>

      {/* Disabled */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Disabled</h2>
        <div className="flex flex-col gap-3 max-w-sm">
          <Input label="Default disabled" placeholder="Can't touch this" disabled />
          <Input label="With value disabled" value="Read-only value" disabled readOnly />
        </div>
      </section>
    </div>
  );
}

