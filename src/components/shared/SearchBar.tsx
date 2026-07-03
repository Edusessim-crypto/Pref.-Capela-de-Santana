"use client";

import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  defaultValue?: string;
}

export default function SearchBar({
  placeholder = "Buscar...",
  onSearch,
  defaultValue = "",
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="flex w-full max-w-xl items-stretch gap-2">
      <label htmlFor="search-bar-input" className="sr-only">
        {placeholder}
      </label>
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500"
          aria-hidden="true"
        />
        <input
          id="search-bar-input"
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border border-neutral-300 bg-neutral-0 pl-10 pr-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus-visible:border-primary-500"
        />
      </div>
      <button
        type="submit"
        aria-label="Buscar"
        className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-primary-600 text-white transition-colors hover:bg-primary-700"
      >
        <Search className="h-5 w-5" aria-hidden="true" />
      </button>
    </form>
  );
}
