import React from "react";
import "./SearchPanel.css";

export default class SearchPanel extends React.Component {
  state = {
    term: "",
  };

  searchChange = (e) => {
    const term = e.target.value;
    this.setState({
      term,
    });
    this.props.onSearch(term);
  };

  render() {
    return (
      <form className="SearchPanel">
        <input
          value={this.state.value}
          onChange={this.searchChange}
          style={{ width: "30%" }}
          placeholder="search"
        ></input>
      </form>
    );
  }
}
