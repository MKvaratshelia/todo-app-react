import React, { Component } from "react";

import TodoList from "./todoList/TodoList";
import SearchPanel from "./searchPanel/SearchPanel";
import AppHeader from "./appHeader/AppHeader";
import ItemAddForm from "./itemAddForm/ItemAddForm";
import ItemStatusFilter from "./itemStatusFilter/ItemStatusFilter";

export default class App extends Component {
  maxId = 100;
  state = {
    todoData: [
      this.createTodoItem("drink cofee"),
      this.createTodoItem("Make awesome app"),
      this.createTodoItem("Have a lunch"),
    ],
    done: false,
    important: false,
    term: "",
    filter: "all",
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  getIndex(data, id) {
    return data.findIndex((el) => el.id === id);
  }

  toggleProperty(arr, id, propName) {
    const idx = this.getIndex(arr, id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      // const newData = todoData.filter((item) => item.id !== id);
      const idx = this.getIndex(todoData, id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important"),
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      };
    });
  };

  addItem = (label) => {
    const newItem = this.createTodoItem(label);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  onSearch = (term) => {
    this.setState({
      term,
    });
  };

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }
  onFilterChange = (filter) => {
    this.setState({
      filter,
    });
  };

  render() {
    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((item) => item.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="container">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="mt-3">
          <SearchPanel onSearch={this.onSearch} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
          <TodoList
            todos={visibleItems}
            onDeleted={(id) => this.deleteItem(id)}
            onToggleImportant={this.onToggleImportant}
            onToggleDone={this.onToggleDone}
            important={this.state.important}
            done={this.state.done}
          />
          <ItemAddForm onItemAdded={this.addItem} />
        </div>
      </div>
    );
  }
}
