import * as React from 'react';
import { connect } from 'react-redux';
import { sortAction } from './../redux/actions';
import { ToDoApp } from './ToDoApp';

const mapStateToProps = (state: any) => {
  return {
    orderBy: state.todos.orderBy
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSort: (orderBy: string) => {
      dispatch(sortAction({ orderBy }));
    }
  };
};

export const ToDoAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoApp);