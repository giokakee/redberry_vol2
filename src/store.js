import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers } from "redux";
import test from "./reducers/test";

const reducers = combineReducers({
	test,
});

const store = configureStore(
	{
		reducer: reducers,
	},
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
