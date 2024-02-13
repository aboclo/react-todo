import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import style from "./TodoContainer.module.css";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";

const TodoContainer = ({ tableName }) => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  const toggleOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
  };

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        },
      };
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=${sortOrder}`;

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          const message = `Error: ${response.status}`;
          throw new Error(message);
        }

        const data = await response.json();

        const sortedTodoList = [...data.records].sort((objectA, objectB) => {
          const A = objectA.fields.title.toLowerCase();
          const B = objectB.fields.title.toLowerCase();
          if (sortOrder === "asc") {
            return A.localeCompare(B);
          } else {
            return B.localeCompare(A);
          }
        });

        setTodoList(
          sortedTodoList.map((todo) => ({
            id: todo.id,
            title: todo.fields.title,
          }))
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [tableName, sortOrder]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

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

      const sortedList =
        sortOrder === "asc"
          ? [...todoList, { id: dataResponse.id, title: newTodo.title }].sort(
              (a, b) => a.title.localeCompare(b.title)
            )
          : [{ id: dataResponse.id, title: newTodo.title }, ...todoList].sort(
              (a, b) => b.title.localeCompare(a.title)
            );

      setTodoList(sortedList);

      /*setTodoList([...todoList, { id: dataResponse.id, title: newTodo.title }]);*/

      return dataResponse;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

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

      const newList = todoList.filter((item) => item.id !== id);
      setTodoList(newList);
    } catch (error) {
      console.error(error.message);
    }
  };

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

  return (
    <>
      <div className={style.appContainer}>
        <header
          onClick={() => (window.location.href = "/")}
          className={style.header}
        >
          <ListAltIcon className={style.svgIcon} />
          <span className={style.headerText}>Todo List App</span>
        </header>
        <h1 className={style.titleChange}>Todo List</h1>
        <div className={style.taskListContainer}>
          <AddTodoForm onAddTodo={addTodo} onToggleOrder={toggleOrder} />
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
        <span>
          <button
            className={style.homeButton}
            onClick={() => (window.location.href = "/")}
          >
            <HomeIcon />
          </button>
        </span>
      </div>
    </>
  );
};

TodoContainer.propTypes = {
  tableName: PropTypes.string,
};

export default TodoContainer;
