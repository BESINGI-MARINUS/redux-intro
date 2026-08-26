// STEPS TO USE REDUX
// 1. Create you reducer function(s), params =(state=initState,action)
// 2. Create the action dispatcher(s) functions, so you don't have to remember which action to dispatch, rather you just call the function, which returns the appropriate action object
// 3. If you created more than one reducer, register all into the redux's combineReducers function, and save in a variable (rootReducer in this case)
// 4. Create a store variable, and call the redux's createStore(deprecated) function and pass in the conbine/single reducer function(s).
// 5. You can now dispatch actions using store.dispatch()

// CONNECTING YOUR REACT APP WITH REDOX
// 1. Install the react-redux package
// 2. import the Provider component from the react-redux package you just installed in the index.js file
// 3. Wrap the <App/> component around the <Provider store={store}></Provider>

import { combineReducers, createStore } from "redux";

const initialAccount = {
  balance: 0,
  loan: "",
  loanPurpose: "",
};

const initialCustomer = {
  fullname: "",
  nationalID: "",
  createdAt: "",
};

const accountReducer = function (state = initialAccount, action) {
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
};

const customerReducer = function (state = initialCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullname: action.payload.fullname,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullname: action.payload };
    default:
      return state;
  }
};

const combinedReducers = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(combinedReducers);

//Account Action Setters
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, loanPurpose) {
  return { type: "account/requestLoan", payload: { amount, loanPurpose } };
}
function repayLoan() {
  return { type: "account/repayLoan" };
}

// User Action Setters
function createUser(fullname, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullname, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullname) {
  return { type: "customer/updateName", payload: fullname };
}

// Account operations
store.dispatch(deposit(1000));
console.log(store.getState());
store.dispatch(withdraw(200));
console.log(store.getState());
store.dispatch(requestLoan(1000, "Buy a cheap Lanbo"));
console.log(store.getState());
store.dispatch(repayLoan());
console.log(store.getState());

// User Operations
store.dispatch(createUser("Besingi Marinus", "24681012"));
console.log(store.getState());
store.dispatch(updateName("Besingi Marinus Nyando"));
console.log(store.getState());
