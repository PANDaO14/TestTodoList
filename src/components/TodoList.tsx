import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TodoCard from "./TodoCard";
import { Todo, addTodo } from "../store/todoSlice/todoSlice";
import { RootState } from "../store/store";

const TodoList = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const todos = useSelector((state: RootState) => state.todo.todos);
  const count = useSelector((state: RootState) => state.todo.count);
  const dispatch = useDispatch();

  type Filter = "All" | "Completed" | "Active";
  const [filter, setFilter] = useState<Filter>("All");

  const FILTER_MAP: Record<Filter, (todo: Todo) => boolean> = {
    All: () => true,
    Completed: (todo) => todo.completed,
    Active: (todo) => !todo.completed,
  };

  const handleAddTodo = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (inputRef.current) {
      const text = inputRef.current.value;

      dispatch(addTodo(text));
    }
  };

  return (
    <div className="container h-screen mx-auto px-6 font-normal">
      <h1 className="text-7xl text-center mt-10 pb-8 font-bold text-blue max-[520px]:text-3xl">
        Список дел
      </h1>
      <form
        className="box rounded-3xl shadow px-4 py-4 flex justify-between items-center space-x-2 mb-14 max-[520px]:py-1"
        onSubmit={handleAddTodo}
      >
        <input
          className="text-2xl text-blue border-blue outline-none max-[520px]:text-lg"
          placeholder="Создать задачу"
          type="text"
          ref={inputRef}
        />
        <button type="submit">
          <svg
            width="60"
            height="50"
            viewBox="0 0 60 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-[520px]:w-10"
          >
            <rect
              x="0.5"
              y="0.5"
              width="59"
              height="49"
              rx="9.5"
              stroke="#30324B"
            />
            <rect x="29" y="10" width="2" height="30" fill="#30324B" />
            <rect
              x="45"
              y="24"
              width="2"
              height="30"
              transform="rotate(90 45 24)"
              fill="#30324B"
            />
          </svg>
        </button>
      </form>
      <div className="space-x-2 mb-8">
        <button
          className={`transition transform border-2 border-blue text-blue px-3 py-1 rounded-xl 
               hover:bg-hover_blue hover:text-white active:bg-blue focus:border-gray focus:bg-blue focus:text-white max-[520px]:text-sm
               `}
          onClick={() => setFilter("All")}
        >
          Все
        </button>
        <button
          className="transition transform border-2 border-green text-green px-3 py-1 rounded-xl
                 hover:bg-hover_green hover:text-green active:bg-green focus:border-gray focus:bg-green focus:text-white max-[520px]:text-sm"
          onClick={() => setFilter("Completed")}
        >
          Выполнено
        </button>
        <button
          className="transition transform border-2 border-red text-red px-3 py-1 rounded-xl
                 hover:bg-hover_red hover:text-red active:bg-red focus:border-gray focus:bg-red focus:text-white max-[520px]:text-sm"
          onClick={() => setFilter("Active")}
        >
          Не выполнено
        </button>
      </div>
      <div className="grid grid-flow-row space-y-4 pb-8">
        {count > 0
          ? todos
              .filter(FILTER_MAP[filter])
              .map((todo) => <TodoCard key={todo.id} {...todo} />)
          : ""}
      </div>
    </div>
  );
};

export default TodoList;
