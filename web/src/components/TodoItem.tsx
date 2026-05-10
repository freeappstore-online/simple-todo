import { useState, useRef, useEffect } from "react";
import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    } else {
      setEditText(todo.text);
    }
    setEditing(false);
  };

  return (
    <div
      className="group flex items-center gap-3 px-4 py-3 transition-colors"
      style={{
        background: "var(--panel)",
        borderRadius: "1.25rem",
        border: "1.5px solid var(--line)",
      }}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className="shrink-0 w-6 h-6 flex items-center justify-center transition-colors cursor-pointer"
        style={{
          borderRadius: "0.5rem",
          border: todo.completed ? "none" : "2px solid var(--line-strong)",
          background: todo.completed ? "var(--accent)" : "transparent",
        }}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        {todo.completed && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7L6 10L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Text */}
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") {
              setEditText(todo.text);
              setEditing(false);
            }
          }}
          className="flex-1 bg-transparent outline-none text-sm font-medium"
          style={{ color: "var(--ink)" }}
        />
      ) : (
        <span
          className="flex-1 text-sm font-medium cursor-pointer select-none"
          onDoubleClick={() => {
            setEditing(true);
            setEditText(todo.text);
          }}
          style={{
            color: todo.completed ? "var(--muted)" : "var(--ink)",
            textDecoration: todo.completed ? "line-through" : "none",
            transition: "color 0.2s, text-decoration 0.2s",
          }}
        >
          {todo.text}
        </span>
      )}

      {/* Delete */}
      {!editing && (
        <button
          onClick={() => onDelete(todo.id)}
          className="shrink-0 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          style={{
            borderRadius: "0.5rem",
            background: "transparent",
            color: "var(--muted)",
            border: "none",
          }}
          aria-label="Delete todo"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
