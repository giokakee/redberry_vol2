import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers } from "redux";
import firstPageIsValid from "./reducers/validation";
import secondPageIsValid from "./reducers/secondpagevalidation";
const reducers = combineReducers({
	firstPageIsValid,
	secondPageIsValid,
});

const store = configureStore(
	{
		reducer: reducers,
	},
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
