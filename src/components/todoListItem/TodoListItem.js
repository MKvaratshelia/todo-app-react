import React from "react";
import "./TodoListItem.css";

const TodoListItem = (props) => {
  const {
    label,
    onDeleted,
    onToggleImportant,
    onToggleDone,
    important,
    done,
  } = props;

  const classNames = ["TodoListItem"];

  if (done) {
    classNames.push("done");
  }

  if (important) {
    classNames.push("important");
  }
  return (
    <span className={classNames.join(" ")}>
      <span className="TodoListItemLabel" onClick={onToggleDone}>
        {label}
      </span>
      <span>
        <button
          type="button"
          className="btn btn-outline-success btn-sm"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation"></i>
        </button>
        <button
          type="button"
          className="btn ml-2 btn-outline-danger btn-sm"
          onClick={onDeleted}
        >
          <i className="fa fa-trash-o"></i>
        </button>
      </span>
    </span>
  );
};

export default TodoListItem;
