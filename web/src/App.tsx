import { useState } from "react";
import { Shell } from "./components/Shell";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { FilterBar } from "./components/FilterBar";
import { useTodos } from "./hooks/useTodos";
import type { FilterType } from "./types";

const navItems = [
  { id: "all", label: "All Tasks", icon: "📋" },
  { id: "active", label: "Active", icon: "⏳" },
  { id: "completed", label: "Completed", icon: "✅" },
];

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted, activeCount, completedCount } = useTodos();
  const [filter, setFilter] = useState<FilterType>("all");

  return (
    <Shell navItems={navItems} activeNav={filter} onNavChange={(id) => setFilter(id as FilterType)}>
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-3xl font-bold mb-1"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          {filter === "all" && "All Tasks"}
          {filter === "active" && "Active Tasks"}
          {filter === "completed" && "Completed Tasks"}
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
          {todos.length === 0
            ? "Start by adding your first task"
            : `${activeCount} remaining · ${completedCount} completed`}
        </p>

        <TodoInput onAdd={addTodo} />
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />
        <TodoList
          todos={todos}
          filter={filter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
    </Shell>
  );
}
