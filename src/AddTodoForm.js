import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";

function AddTodoForm(props) {
  const { onAddTodo } = props;
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    console.log(todoTitle);
    const objectForm = { title: todoTitle, id: Date.now() };
    onAddTodo(objectForm);
    setTodoTitle("");
  };
  return (
    <>
      <form onSubmit={handleAddTodo}>
        <InputWithLabel
          id="todoTitle"
          value={todoTitle}
          onInputChange={handleTitleChange}
        >
          Title
        </InputWithLabel>

        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default AddTodoForm;
