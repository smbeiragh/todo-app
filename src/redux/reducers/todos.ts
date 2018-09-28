import { ACTION_TEST, ACTION_SORT } from './../actions';

const todos = (state = { orderBy: '' }, action: any) => {
  switch (action.type) {
    case ACTION_TEST:
      return {
        ...state,
        test: action.text
      };
    case ACTION_SORT:
      return {
        ...state,
        orderBy: action.orderBy
      };
    default:
      return state;
  }
};
​
export default todos
