import actionTypes from "../actionTypes/actionTypes";

const initialState = {
  todos: [],
  msg: "",
  showType: "ALL"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.todoReducer.GET_INITIAL_VALUE:
      return { ...state, todos: action.todos, msg: "" };
    case actionTypes.todoReducer.ADD_TODO_ASYNC:
      return { ...state, todos: [...state.todos, action.todo], msg: "" };
    case actionTypes.todoReducer.REMOVE_TODO_ASYNC:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id != action._id),
        msg: ""
      };
    case actionTypes.todoReducer.GET_ERROR_MSG:
      return { ...state, msg: action.msg };
    case actionTypes.todoReducer.CHANGE_TODO_ASYNC:
      return {
        ...state,
        msg: "",
        todos: state.todos.map(todo => {
          if (todo._id != action._id) {
            return todo;
          } else {
            return { ...todo, [action.k]: action.v };
          }
        })
      };
    case actionTypes.todoReducer.CHANGE_SHOW_TYPE:
      return { ...state, showType: action.showType };

    default:
      return state;
  }
};
