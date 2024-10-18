import { createSlice } from "@reduxjs/toolkit/react";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  isEditing: boolean;
};

interface TodoState {
  todos: Todo[];
  count: number;
}

const loadTodosFromLocalStorage = (): Todo[] => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const initialState: TodoState = {
  todos: loadTodosFromLocalStorage(),
  count: loadTodosFromLocalStorage().length,
};

const saveTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo: Todo = {
        id: Math.random() * 1000,
        text: action.payload,
        completed: false,
        isEditing: false,
      };
      state.todos.push(todo);
      saveTodosToLocalStorage(state.todos);
      state.count += 1;
    },
    editTodo: (state, { payload }) => {
      const index = state.todos.findIndex((todo) => todo.id === payload.id);
      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          text: payload.text,
          isEditing: false,
        };
        saveTodosToLocalStorage(state.todos);
      }
    },
    isEditingTodo: (state, { payload }) => {
      const index = state.todos.findIndex((todo) => todo.id === payload.id);
      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          isEditing: true,
        };
        saveTodosToLocalStorage(state.todos);
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveTodosToLocalStorage(state.todos);
      state.count -= 1;
    },
    completeTodo: (state, { payload }) => {
      const index = state.todos.findIndex((todo) => todo.id === payload.id);
      if (index !== -1 && !payload.isEditing) {
        state.todos[index] = {
          ...state.todos[index],
          completed: !payload.completed,
        };
        saveTodosToLocalStorage(state.todos);
      }
    },
  },
});

export const { addTodo, editTodo, deleteTodo, completeTodo, isEditingTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
