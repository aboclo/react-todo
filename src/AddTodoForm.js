import React from "react";

function AddTodoForm(props) {
  const handleAddTodo = (event) => {
    event.preventDefault();
    const todoTitle = event.target.title.value;
    console.log(todoTitle);
    const form = document.querySelector("form");
    form.reset();
    /*event.target.reset(); --not sure which method to use*/
    props.onAddTodo(todoTitle);
  };
  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title: </label>
        <input id="todoTitle" name="title"></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
