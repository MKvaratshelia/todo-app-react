import React from "react";
import TodoListItem from "../todoListItem/TodoListItem";
import "./TodoList.css";

const TodoList = ({
  todos,
  onDeleted,
  onToggleImportant,
  onToggleDone,
  important,
  done,
}) => {
  const elements = todos.map((item) => {
    const { id } = item;
    return (
      <li className="list-group-item" key={id}>
        <TodoListItem
          important={important}
          done={done}
          onDeleted={() => onDeleted(id)}
          {...item}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });
  return <ul className="TodoList list-group">{elements}</ul>;
};

export default TodoList;
