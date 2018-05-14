import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import actions from "../../actions/actions";

class TodoFilter extends Component {
  render() {
    const { onChangeShowType, showType } = this.props;
    console.log(showType);

    return (
      <div>
        <button
          className={classnames({
            cur: showType == "ALL"
          })}
          onClick={() => {
            onChangeShowType("ALL");
          }}
        >
          ALL
        </button>
        <button
          className={classnames({
            cur: showType == "DONE"
          })}
          onClick={() => {
            onChangeShowType("DONE");
          }}
        >
          DONE
        </button>
        <button
          className={classnames({
            cur: showType == "UNDONE"
          })}
          onClick={() => {
            onChangeShowType("UNDONE");
          }}
        >
          UNDONE
        </button>
      </div>
    );
  }
}

TodoFilter.propTypes = {
  onChangeShowType: PropTypes.func.isRequired
};

const mapStateToProps = ({ todoReducer }) => ({
  showType: todoReducer.showType
});

const mapDispatchToProps = dispatch => {
  return {
    onChangeShowType: showType => {
      dispatch(actions.todoReducer.changeShowType(showType));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoFilter);
