import React, { Component } from "react";
import "./ItemAddForm.css";

export default class ItemAddForm extends Component {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: "",
    });
  };
  render() {
    return (
      <form className="ItemAddForm d-flex" onSubmit={this.onSubmit}>
        <input
          value={this.state.label}
          type="text"
          className="form-control"
          onChange={this.onLabelChange}
          placeholder="What needs to be done"
        />
        <button className="btn btn-outline-secondary">Add</button>
      </form>
    );
  }
}
