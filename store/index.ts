import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeConfigSlice from "@/store/themeConfigSlice";
import { createLogger } from "redux-logger";
import { isDev } from "@/utils/isDev";
import { thunk } from "redux-thunk";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";
import rootReducer from "./reducers/rootReducer";

// const rootReducer = combineReducers({
// 	themeConfig: themeConfigSlice,
// });

// export default configureStore({
// 	reducer: rootReducer,
// });
const loggerMiddleware = createLogger({
	predicate: () => isDev(),
	collapsed: true,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(loggerMiddleware, thunk), // retourne directement la concaténation
});

export default store;
export type IRootState = ReturnType<typeof rootReducer>;
export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const persistor = persistStore(store);
