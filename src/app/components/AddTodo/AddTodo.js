import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../actions/actions";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  render() {
    const { title } = this.state;
    const { onAddTodoAsync } = this.props;
    return (
      <div>
        <label htmlFor="newTodo">new todo:</label>
        <input
          autoFocus={true}
          onChange={e => {
            this.setState({ title: e.target.value });
          }}
          onKeyDown={e => {
            if (e.keyCode == 13) {
              onAddTodoAsync(title);
              this.setState({ title: "" });
            }
          }}
          value={title}
          type="text"
          id="newTodo"
        />
        <button
          onClick={() => {
            onAddTodoAsync(title);
            this.setState({ title: "" });
          }}
        >
          add
        </button>
      </div>
    );
  }
}

AddTodo.propTypes = {
  onAddTodoAsync: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onAddTodoAsync: title => {
      dispatch(actions.todoReducer.addTodoAsync(title));
    }
  };
};

export default connect(null, mapDispatchToProps)(AddTodo);
