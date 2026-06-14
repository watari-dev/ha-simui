// SearchBox — the picker's command-palette search field. Controlled value with an
// internal debounce so a 6,000-entity fuzzy pass doesn't fire on every keystroke,
// while the input itself stays perfectly responsive (it echoes the raw text and
// flushes the debounced value upward). Keyboard-friendly: Escape clears (then, when
// already empty, bubbles so the dialog can close), Enter/⌘K are left to the parent.
//
// Self-contained: imports only React + lucide + its own CSS. Not wired anywhere yet.

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Search, X } from 'lucide-react';
import './SearchBox.css';

export interface SearchBoxProps {
  /** Controlled query value (the committed/debounced value the parent holds). */
  value: string;
  /** Fired with the debounced value after `debounceMs` of quiet. */
  onChange: (query: string) => void;
  /** Debounce window in ms (default 140 — snappy but coalesces fast typing). */
  debounceMs?: number;
  /** Placeholder copy (varies multi vs. single pick). */
  placeholder?: string;
  /** Autofocus on mount (default true — a picker opens ready to type). */
  autoFocus?: boolean;
  /** Forwarded keydown so the parent can drive list nav (Arrow/Enter) from here. */
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export function SearchBox({
  value,
  onChange,
  debounceMs = 140,
  placeholder = 'Search entities…',
  autoFocus = true,
  onKeyDown,
}: SearchBoxProps) {
  // Local echo so typing never lags behind the debounce.
  const [text, setText] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the echo in sync when the parent resets/clears the value externally.
  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  // Flush any pending timer on unmount.
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const push = useCallback(
    (next: string) => {
      setText(next);
      if (timer.current) clearTimeout(timer.current);
      // Empty query is meaningful (reset) — flush it immediately, no debounce.
      if (next === '') {
        onChange('');
        return;
      }
      timer.current = setTimeout(() => onChange(next), debounceMs);
    },
    [onChange, debounceMs],
  );

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setText('');
    onChange('');
    inputRef.current?.focus();
  }, [onChange]);

  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape' && text) {
        // First Escape clears; a second (empty) Escape bubbles to close the dialog.
        e.preventDefault();
        e.stopPropagation();
        clear();
        return;
      }
      onKeyDown?.(e);
    },
    [text, clear, onKeyDown],
  );

  return (
    <div className="pk-searchwrap">
      <Search size={15} className="pk-search-ico" aria-hidden />
      <input
        ref={inputRef}
        className="pk-search"
        type="text"
        role="searchbox"
        placeholder={placeholder}
        value={text}
        onChange={(e) => push(e.target.value)}
        onKeyDown={handleKey}
        aria-label="Search entities"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
      {text ? (
        <button
          className="pk-search-clear"
          onClick={clear}
          aria-label="Clear search"
          type="button"
          tabIndex={-1}
        >
          <X size={13} />
        </button>
      ) : null}
    </div>
  );
}
