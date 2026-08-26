const initialAccount = {
  balance: 0,
  loan: "",
  loanPurpose: "",
};
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
export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
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
