import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  balance: 0,
  loan: "",
  loanPurpose: "",
};
/*
export default function accountReducer(state = initialAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return;
      return {
        ...state,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
      };
    case "account/repayLoan":
      return {
        ...state,
        loanPurpose: "",
        loan: 0,
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}
//Account Action Setters
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    // Do async operation
    const res = await fetch(
      `https://api.frankfurter.dev/v2/rate/USD/${currency}`,
    );
    const data = await res.json();
    console.log(data);
    const convertedAmount = (amount * data.rate).toFixed(2);
    // Dispatch action
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, loanPurpose) {
  return { type: "account/requestLoan", payload: { amount, loanPurpose } };
}
export function repayLoan() {
  return { type: "account/repayLoan" };
}

*/

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, loanPurpose) {
        return { payload: { amount, loanPurpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loanPurpose = action.payload.loanPurpose;
        state.balance += action.payload.amount;
        state.loan = action.payload.amount;
      },
    },
    repayLoan(state) {
      state.loanPurpose = "";
      state.balance -= state.loan;
      state.loan = 0;
    },
  },
});

export default accountSlice.reducer;
export const { withdraw, requestLoan, repayLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch) {
    // Do async operation
    const res = await fetch(
      `https://api.frankfurter.dev/v2/rate/${currency}/USD`,
    );
    const data = await res.json();

    const convertedAmount = (amount * data.rate).toFixed(2);
    // Dispatch action
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}
