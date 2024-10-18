import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";

import "./index.css";
import TodoList from "./components/TodoList";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <TodoList />
  </Provider>
);
