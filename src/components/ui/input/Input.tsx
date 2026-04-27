import * as React from 'react';
import { cn } from '../../../lib/utils';
import { inputVariants, type InputVariants } from './input.styles';

// ── Props ──────────────────────────────────────────────────────────────────────

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    InputVariants {
  /** Label rendered above the input. */
  label?: string;
  /** Helper / hint text rendered below the input. */
  hint?: string;
  /** Error message — also switches the input to error state. */
  errorMessage?: string;
  /** Icon or element rendered on the left inside the input. */
  leftElement?: React.ReactNode;
  /** Icon or element rendered on the right inside the input. */
  rightElement?: React.ReactNode;
}

// ── Component ──────────────────────────────────────────────────────────────────

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      state,
      size = 'md',
      label,
      hint,
      errorMessage,
      leftElement,
      rightElement,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const generatedId = React.useId();
    const resolvedId = id ?? generatedId;
    const resolvedState = errorMessage ? 'error' : state;

    const paddingLeft = leftElement
      ? size === 'sm' ? 'pl-8' : size === 'lg' ? 'pl-11' : 'pl-9'
      : '';
    const paddingRight = rightElement
      ? size === 'sm' ? 'pr-8' : size === 'lg' ? 'pr-11' : 'pr-9'
      : '';

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={resolvedId}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftElement && (
            <span className="pointer-events-none absolute left-0 flex items-center justify-center h-full pl-3 text-gray-400 dark:text-gray-500 [&>svg]:size-4">
              {leftElement}
            </span>
          )}

          <input
            ref={ref}
            id={resolvedId}
            disabled={disabled}
            className={cn(
              inputVariants({ state: resolvedState, size }),
              paddingLeft,
              paddingRight,
              className,
            )}
            aria-invalid={resolvedState === 'error' || undefined}
            aria-describedby={
              errorMessage
                ? `${resolvedId}-error`
                : hint
                  ? `${resolvedId}-hint`
                  : undefined
            }
            {...props}
          />

          {rightElement && (
            <span className="pointer-events-none absolute right-0 flex items-center justify-center h-full pr-3 text-gray-400 dark:text-gray-500 [&>svg]:size-4">
              {rightElement}
            </span>
          )}
        </div>

        {errorMessage && (
          <p id={`${resolvedId}-error`} className="text-xs text-rose-600 dark:text-rose-400">
            {errorMessage}
          </p>
        )}

        {!errorMessage && hint && (
          <p id={`${resolvedId}-hint`} className="text-xs text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

