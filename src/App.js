import TodoList from "./components/TodoList";
import React, { useEffect, useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import style from "./components/TodoListItem.module.css";
import ListAltIcon from "@mui/icons-material/ListAlt";

function App() {
  //REMOVE TODO//
  const removeTodo = async (id) => {
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error wee woo: ${response.status}`;
        throw new Error(message);
      }

      const newList = todoList.filter((item) => id !== item.id);
      setTodoList(newList);
    } catch (error) {
      console.error(error.message);
    }
  };

  //ADD TODO//
  const addTodo = async (newTodo) => {
    try {
      const airtableData = {
        fields: {
          title: newTodo.title,
        },
      };

      const response = await fetch(
        `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
          },
          body: JSON.stringify(airtableData),
        }
      );

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();
      setTodoList([...todoList, newTodo]);
      return dataResponse;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  //EDIT TODO//
  const newEditedTitle = async (id, newTitle) => {
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;

    const airtableData = {
      fields: {
        title: newTitle,
      },
    };

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify(airtableData),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error wee woo: ${response.status}`;
        throw new Error(message);
      }

      const updatedList = todoList.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      );
      setTodoList(updatedList);
    } catch (error) {
      console.error(error.message);
    }
  };

  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("savedTodoList")) || []
  );

  const [isLoading, setIsLoading] = useState(true);

  //FETCH DATA//
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
                    <p className={style.loading}>Loading...</p>
                  ) : (
                    <TodoList
                      todoList={todoList}
                      onRemoveTodo={removeTodo}
                      onNewEditedTitle={newEditedTitle}
                    />
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
