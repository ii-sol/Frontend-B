import { SET_LOAN_DETAILS } from "../../action";

const initialState = {
  period: null,
  parentId: null,
  amount: null,
  title: null,
  message: null,
};

const loanReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOAN_DETAILS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default loanReducer;
