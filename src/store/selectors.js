import { createSelector } from "reselect";

const selectLoanState = (state) => (state) => loan;

export const selectLoanDetails = createSelector(
  [selectLoanState],
  (loanState) => {
    if (!loanState) return null;
    const { period, parentId, amount, title, message } = loanState;
    return { period, parentId, amount, title, message };
  }
);
