import TodoList from "./TodoList";
import React, { useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";

function App() {
  const removeTodo = (id) => {
    const newList = todoList.filter((item) => id !== item.id);
    setTodoList(newList);
  };

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("savedTodoList")) || []
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => resolve({ data: todoList }), 2000);
    }).then((result) => {
      setTodoList(result.data);
      setIsLoading(false);
    });
  }, [todoList]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}
export default App;
