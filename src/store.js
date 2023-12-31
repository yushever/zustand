import { nanoid } from "nanoid";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export const useTodos = create(
  devtools(
    persist(
      (set, get) => ({
        todos: [
          { id: 1, title: "Read Harry Potter", completed: true },
          { id: 2, title: "Practice yoga", completed: false },
          { id: 3, title: "Drink wine", completed: false },
        ],
        loading: false,
        error: null,
        //   addTodo: (title) =>
        //     set((state) => ({
        //       todos: [...state.todos, { id: nanoid(), title, completed: false }],
        //     })),
        addTodo: (title) => {
          const newTodo = { id: nanoid(), title, completed: false };
          set({ todos: [...get().todos, newTodo] });
        },
        toggleTodo: (todoId) =>
          set({
            todos: get().todos.map((todo) =>
              todoId === todo.id
                ? { ...todo, completed: !todo.completed }
                : todo
            ),
          }),
        fetchTodos: async () => {
          set({ loading: true });
          try {
            const res = await fetch(
              "https://jsonplaceholder.typicode.com/todos?_limit=10"
            );
            if (!res.ok) throw new Error("Failed to fetch! Try again");
            set({ todos: await res.json(), error: null });
          } catch (error) {
            set({ error: error.message });
          } finally {
            set({ loading: false });
          }
        },
      }),
      { storage: createJSONStorage(() => localStorage) }
    )
  )
);

export const useFilter = create((set) => ({
  filter: "all",
  setFilter: (value) => set({ filter: value }),
}));
