import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

function AddTodoForm(props) {
  const { onAddTodo } = props;
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    const newTodo = { title: todoTitle, id: Date.now() };
    onAddTodo(newTodo);
    setTodoTitle("");
  };
  return (
    <>
      <form onSubmit={handleAddTodo} className={style.inputContainer}>
        <div className={style.inputTitle}>
          <InputWithLabel
            id="todoTitle"
            value={todoTitle}
            onInputChange={handleTitleChange}
          >
            Title:
          </InputWithLabel>

          <button type="submit" className={style.addButton}>
            ADD
          </button>
        </div>
      </form>
    </>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};

export default AddTodoForm;
