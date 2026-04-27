import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
  // ── Base ──────────────────────────────────────────────────────────────────
  [
    'w-full font-medium rounded-lg',
    'border',
    'bg-white dark:bg-gray-900',
    'text-gray-900 dark:text-gray-100',
    'placeholder:text-gray-400 dark:placeholder:text-gray-600',
    'transition-all duration-200 ease-out',
    // Focus ring — matches button's indigo ring
    'outline-none focus:ring-2 focus:ring-offset-2',
    'focus:ring-indigo-500 dark:focus:ring-indigo-400',
    'dark:focus:ring-offset-gray-950',
    // Disabled
    'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),
  {
    variants: {
      // ── State / intent ──────────────────────────────────────────────────
      state: {
        default: [
          'border-gray-200 shadow-sm',
          'hover:border-gray-300',
          'focus:border-indigo-500 dark:focus:border-indigo-400',
          'dark:border-gray-700 dark:hover:border-gray-500',
        ].join(' '),

        error: [
          'border-rose-400 shadow-sm shadow-rose-200/50',
          'hover:border-rose-500',
          'focus:ring-red-500 dark:focus:ring-red-400',
          'focus:border-rose-500 dark:focus:border-rose-400',
          'dark:border-rose-500 dark:shadow-rose-900/30',
        ].join(' '),

        success: [
          'border-emerald-400 shadow-sm shadow-emerald-200/40',
          'hover:border-emerald-500',
          'focus:ring-emerald-500 dark:focus:ring-emerald-400',
          'focus:border-emerald-500 dark:focus:border-emerald-400',
          'dark:border-emerald-600 dark:shadow-emerald-900/30',
        ].join(' '),

        warning: [
          'border-amber-400 shadow-sm shadow-amber-200/40',
          'hover:border-amber-500',
          'focus:ring-amber-500 dark:focus:ring-amber-400',
          'focus:border-amber-500 dark:focus:border-amber-400',
          'dark:border-amber-500 dark:shadow-amber-900/30',
        ].join(' '),
      },

      // ── Size ────────────────────────────────────────────────────────────
      size: {
        sm: 'h-8 px-3 text-xs rounded-md',
        md: 'h-9 px-3.5 text-sm',
        lg: 'h-11 px-4 text-base',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'md',
    },
  },
);

export type InputVariants = VariantProps<typeof inputVariants>;

