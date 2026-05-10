import type { FilterType } from "../types";

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const filters: { id: FilterType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Done" },
];

export function FilterBar({ filter, onFilterChange, activeCount, completedCount, onClearCompleted }: FilterBarProps) {
  return (
    <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
      <div className="flex gap-1" style={{ background: "var(--panel)", borderRadius: "0.75rem", padding: "3px" }}>
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => onFilterChange(f.id)}
            className="px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer"
            style={{
              borderRadius: "0.5rem",
              border: "none",
              background: filter === f.id ? "var(--accent)" : "transparent",
              color: filter === f.id ? "#fff" : "var(--muted)",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
          {activeCount} left
        </span>
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-xs font-medium hover:underline cursor-pointer"
            style={{ color: "var(--muted)", background: "none", border: "none" }}
          >
            Clear done
          </button>
        )}
      </div>
    </div>
  );
}
