import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  // ── Base ──────────────────────────────────────────────────────────────────
  [
    'inline-flex items-center justify-center gap-2',
    'whitespace-nowrap font-medium rounded-lg',
    'border border-transparent',
    'transition-all duration-200 ease-out',
    'cursor-pointer select-none',
    'active:scale-[0.97]',
    // Focus ring
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'dark:focus-visible:ring-offset-gray-950',
    // Disabled
    'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
    // Icon children
    '[&>svg]:pointer-events-none [&>svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      // ── Variant ─────────────────────────────────────────────────────────
      variant: {
        primary: [
          // Violet → indigo → blue gradient
          'bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600',
          'text-white',
          'shadow-md shadow-indigo-500/30',
          'hover:brightness-110 hover:shadow-lg hover:shadow-indigo-500/40',
          'active:brightness-95',
          'focus-visible:ring-indigo-500',
          'dark:from-violet-500 dark:via-indigo-500 dark:to-blue-500',
          'dark:shadow-indigo-700/40 dark:hover:shadow-indigo-600/50',
          'dark:focus-visible:ring-indigo-400',
        ].join(' '),

        secondary: [
          // Glass-finish outlined button
          'bg-white text-gray-700',
          'border-gray-200 shadow-sm',
          'hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 hover:shadow',
          'active:bg-gray-100 active:border-gray-400',
          'focus-visible:ring-gray-400',
          'dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700',
          'dark:hover:bg-gray-800 dark:hover:border-gray-500 dark:hover:text-gray-100',
          'dark:focus-visible:ring-gray-500',
        ].join(' '),

        ghost: [
          'bg-transparent text-gray-600',
          'hover:bg-gray-100 hover:text-gray-900',
          'active:bg-gray-200',
          'focus-visible:ring-gray-400',
          'dark:text-gray-400',
          'dark:hover:bg-gray-800 dark:hover:text-gray-100',
          'dark:active:bg-gray-700',
          'dark:focus-visible:ring-gray-500',
        ].join(' '),

        danger: [
          // Rose → red gradient
          'bg-gradient-to-br from-rose-500 to-red-600',
          'text-white',
          'shadow-md shadow-red-500/30',
          'hover:brightness-110 hover:shadow-lg hover:shadow-red-500/45',
          'active:brightness-95',
          'focus-visible:ring-red-500',
          'dark:from-rose-400 dark:to-red-500',
          'dark:shadow-red-700/40 dark:hover:shadow-red-600/50',
          'dark:focus-visible:ring-red-400',
        ].join(' '),

        success: [
          // Emerald → teal gradient
          'bg-gradient-to-br from-emerald-500 to-teal-600',
          'text-white',
          'shadow-md shadow-emerald-500/30',
          'hover:brightness-110 hover:shadow-lg hover:shadow-emerald-500/45',
          'active:brightness-95',
          'focus-visible:ring-emerald-500',
          'dark:from-emerald-400 dark:to-teal-500',
          'dark:shadow-emerald-700/40 dark:hover:shadow-emerald-600/50',
          'dark:focus-visible:ring-emerald-400',
        ].join(' '),

        warning: [
          // Amber → orange gradient (dark text for contrast)
          'bg-gradient-to-br from-amber-400 to-orange-500',
          'text-amber-950 font-semibold',
          'shadow-md shadow-amber-400/30',
          'hover:brightness-105 hover:shadow-lg hover:shadow-amber-400/45',
          'active:brightness-95',
          'focus-visible:ring-amber-500',
          'dark:from-amber-300 dark:to-orange-400',
          'dark:shadow-amber-600/40 dark:hover:shadow-amber-500/50',
          'dark:focus-visible:ring-amber-400',
        ].join(' '),
      },

      // ── Size ────────────────────────────────────────────────────────────
      size: {
        sm: 'h-8 px-3 text-xs gap-1.5 rounded-md [&>svg]:size-3.5',
        md: 'h-9 px-4 text-sm [&>svg]:size-4',
        lg: 'h-11 px-6 text-base [&>svg]:size-5',
      },

      // ── Full width ───────────────────────────────────────────────────────
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

