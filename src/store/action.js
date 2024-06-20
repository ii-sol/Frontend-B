// actions.js
export const SET_LOAN_DETAILS = "SET_LOAN_DETAILS";

export const setLoanDetails = (details) => ({
  type: SET_LOAN_DETAILS,
  payload: details,
});
