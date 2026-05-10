import { useState, useCallback } from "react";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (value.trim()) {
        onAdd(value);
        setValue("");
      }
    },
    [value, onAdd]
  );

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 text-sm font-medium outline-none transition-all"
        style={{
          background: "var(--panel)",
          color: "var(--ink)",
          border: "1.5px solid var(--line)",
          borderRadius: "0.75rem",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--line)")}
      />
      <button
        type="submit"
        className="px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80 cursor-pointer"
        style={{
          background: "var(--accent)",
          borderRadius: "0.75rem",
          border: "none",
        }}
      >
        Add
      </button>
    </form>
  );
}
