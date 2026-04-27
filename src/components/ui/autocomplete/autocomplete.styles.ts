import { cva, type VariantProps } from 'class-variance-authority';

export const dropdownVariants = cva(
  [
    'absolute z-50 mt-1 w-full',
    'rounded-lg border border-gray-200 dark:border-gray-700',
    'bg-white dark:bg-gray-900',
    'shadow-lg shadow-black/5 dark:shadow-black/30',
    'overflow-hidden',
    'animate-in fade-in-0 zoom-in-95 duration-100',
  ].join(' '),
);

export const optionVariants = cva(
  [
    'flex items-center gap-2 w-full px-3 text-sm cursor-pointer select-none',
    'text-gray-700 dark:text-gray-300',
    'transition-colors duration-100',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-8 text-xs',
        md: 'h-9 text-sm',
        lg: 'h-11 text-base',
      },
      highlighted: {
        true: 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300',
        false: 'hover:bg-gray-50 dark:hover:bg-gray-800',
      },
    },
    defaultVariants: {
      size: 'md',
      highlighted: false,
    },
  },
);

export type OptionVariants = VariantProps<typeof optionVariants>;
