import { configureStore } from "@reduxjs/toolkit";

import loadersReducer from "./redux/loadersSlice";
import usersReducer from "./redux/usersSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			users: usersReducer,
			loaders: loadersReducer,
		},
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
