import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducers = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducers, // Combine all reducers into a single root reducer
  composeWithDevTools(applyMiddleware(thunk)), // Enable Redux DevTools and apply thunk middleware
);
export default store;
