import TodoList from "./TodoList";
import React, { useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";

const useSemiPersistentState = () => {
  const savedTodoList = JSON.parse(localStorage.getItem("savedTodoList")) || [];

  const [todoList, setTodoList] = useState(savedTodoList);

  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);
  return [todoList, setTodoList];
};

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

  const removeTodo = (id) => {
    const newList = todoList.filter((item) => id !== item.id);
    setTodoList(newList);
  };

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}
export default App;
