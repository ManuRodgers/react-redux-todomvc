import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      newTitle: props.todo.title
    };
  }

  render() {
    const { isEdit, newTitle } = this.state;
    const { todo, removeTodo, changeTodo } = this.props;
    return (
      <div>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={e => {
            changeTodo(todo._id, "done", e.target.checked);
          }}
        />
        {isEdit ? (
          <input            
            type="text"
            value={newTitle}
            onChange={e => {
              this.setState({ newTitle: e.target.value });
            }}
            onBlur={() => {
              changeTodo(todo._id, "title", newTitle);
              this.setState({ isEdit: false });
            }}
          />
        ) : (
          <span
            onDoubleClick={() => {
              this.setState({ isEdit: true });
            }}
          >
            {todo.title}
          </span>
        )}

        <button
          onClick={() => {
            removeTodo(todo._id);
          }}
        >
          remove
        </button>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  removeTodo: PropTypes.func.isRequired,
  changeTodo: PropTypes.func.isRequired
};

export default TodoItem;
