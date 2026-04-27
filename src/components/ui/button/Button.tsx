import * as React from 'react';
import { cn } from '../../../lib/utils';
import { buttonVariants, type ButtonVariants } from './button.styles';

// ── Spinner ────────────────────────────────────────────────────────────────────

const spinnerSizeClass: Record<NonNullable<ButtonVariants['size']>, string> = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
};

function Spinner({ size }: { size: NonNullable<ButtonVariants['size']> }) {
  return (
    <svg
      className={cn('animate-spin shrink-0', spinnerSizeClass[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ── Props ──────────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  /** Shows a spinner and disables the button. */
  loading?: boolean;
  /** Icon rendered before the label. Hidden while loading. */
  leftIcon?: React.ReactNode;
  /** Icon rendered after the label. Hidden while loading. */
  rightIcon?: React.ReactNode;
}

// ── Component ──────────────────────────────────────────────────────────────────

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size = 'md',
      fullWidth,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const resolvedSize = size ?? 'md';

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {/* Left slot — spinner takes over when loading */}
        {loading ? (
          <Spinner size={resolvedSize} />
        ) : (
          leftIcon
        )}

        {/* Label */}
        {children != null && (
          <span className={loading ? 'opacity-70' : undefined}>{children}</span>
        )}

        {/* Right slot — hidden while loading to keep layout stable */}
        {!loading && rightIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';
