import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import actions from "../../actions/actions";
import AddTodo from "../AddTodo/AddTodo";
import TodoItem from "../TodoItem/TodoItem";
import TodoFilter from "../TodoFilter/TodoFilter";

class Todo extends Component {
  componentWillMount() {
    const { todos } = this.props;
    if (todos.length == 0) {
      this.props.onGetInitialValueFromServerAsync();
    }
  }

  removeTodo = _id => {
    this.props.onRemoveTodoAsync(_id);
  };

  changeTodo = (_id, k, v) => {
    this.props.onUpdateTodoAsync(_id, k, v);
  };

  render() {
    const { todos, msg } = this.props;
    const errorMsg = "the title entered already existed";

    return (
      <div>
        <AddTodo />
        {msg ? <span style={{ color: "#f00" }}>{errorMsg}</span> : null}
        <hr />
        <div>
          {todos.map((todo, index) => {
            return (
              <TodoItem
                changeTodo={this.changeTodo}
                removeTodo={this.removeTodo}
                key={index}
                todo={todo}
              />
            );
          })}
        </div>
        <hr />
        <TodoFilter />
      </div>
    );
  }
}

Todo.propTypes = {
  onGetInitialValueFromServerAsync: PropTypes.func.isRequired,
  onRemoveTodoAsync: PropTypes.func.isRequired,
  onUpdateTodoAsync: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
  msg: PropTypes.string.isRequired
};

const mapStateToProps = ({ todoReducer }) => {
  return {
    todos: (function() {
      if (todoReducer.showType == "ALL") {
        return todoReducer.todos;
      } else if (todoReducer.showType == "DONE") {
        return todoReducer.todos.filter(todo => todo.done);
      } else {
        return todoReducer.todos.filter(todo => !todo.done);
      }
    })(),
    msg: todoReducer.msg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetInitialValueFromServerAsync: () => {
      dispatch(actions.todoReducer.getInitialValueFromServerAsync());
    },
    onRemoveTodoAsync: _id => {
      dispatch(actions.todoReducer.removeTodoAsync(_id));
    },
    onUpdateTodoAsync: (_id, k, v) => {
      dispatch(actions.todoReducer.updateTodoAsync(_id, k, v));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
