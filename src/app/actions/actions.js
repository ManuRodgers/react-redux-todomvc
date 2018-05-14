import axios from "axios";
import actionTypes from "../actionTypes/actionTypes";

const actions = {
  todoReducer: {
    // sync action creator
    getErrorMsg: msg => ({ type: actionTypes.todoReducer.GET_ERROR_MSG, msg }),
    changeShowType: showType => ({
      type: actionTypes.todoReducer.CHANGE_SHOW_TYPE,
      showType
    }),

    // async action creator
    getInitialValueFromServerAsync: () => async dispatch => {
      const { status, data } = await axios.get("/todos");
      return status == 200 && data.code == 0
        ? dispatch({
            type: actionTypes.todoReducer.GET_INITIAL_VALUE,
            todos: data.todos
          })
        : console.log(`server error`);
    },
    addTodoAsync: title => async dispatch => {
      const { status, data } = await axios.post("/todos", { title });
      return status == 200 && data.code == 0
        ? dispatch({
            type: actionTypes.todoReducer.ADD_TODO_ASYNC,
            todo: data.todo
          })
        : dispatch(actions.todoReducer.getErrorMsg(data.msg));
    },
    removeTodoAsync: _id => async dispatch => {
      const { status, data } = await axios.delete(`/todos/${_id}`);
      return status == 200 && data.code == 0
        ? dispatch({
            type: actionTypes.todoReducer.REMOVE_TODO_ASYNC,
            _id: data._id
          })
        : dispatch(actions.todoReducer.getErrorMsg(data.msg));
    },
    updateTodoAsync: (_id, k, v) => async dispatch => {
      const { status, data } = await axios.patch(`/todos/${_id}`, { k, v });
      console.log(_id);
      console.log(k);
      console.log(v);
      return status == 200 && data.code == 0
        ? dispatch({
            type: actionTypes.todoReducer.CHANGE_TODO_ASYNC,
            _id: data._id,
            k,
            v
          })
        : dispatch(actions.todoReducer.getErrorMsg(data.msg));
    }
  }
};

export default actions;
