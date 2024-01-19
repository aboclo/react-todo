import TodoList from "./TodoList";
import React, { useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import style from "./TodoListItem.module.css";
import ListAltIcon from "@mui/icons-material/ListAlt";

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

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      const todos = data.records.map((todo) => {
        const newTodo = {
          id: todo.id,
          title: todo.fields.title,
        };
        return newTodo;
      });

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  return (
    <div className={style.appContainer}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <header className={style.header}>
                  <ListAltIcon className={style.svgIcon} />
                  <span className={style.headerText}>Todo List App</span>
                </header>
                <h1 className={style.titleChange}>Todo List</h1>
                <div className={style.taskListContainer}>
                  <AddTodoForm onAddTodo={addTodo} />
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                  )}
                </div>
              </>
            }
          />
          <Route path="/new" element={<h1>New TodoList</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
