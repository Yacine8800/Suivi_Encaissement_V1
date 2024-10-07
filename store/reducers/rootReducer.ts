import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./users-test/user.slice";
import themeConfigSlice from "../themeConfigSlice";

export const persistConfig = {
	key: "smart_control_v2",
	storage,
	whitelist: ["user", "mail"],
	blacklist: [],
};

const topReducer = combineReducers({
	user: userReducer,
	themeConfig: themeConfigSlice,
});

const rootReducer = (state: any, action: any) => {
	// //console.log("État du store avant réinitialisation:", state);

	if (action.type === "RESET_STORE") {
		// //console.log("État du store après réinitialisation:", state);
		state = undefined;
	}
	return topReducer(state, action);
};

// Après la déconnexion, inspectez l'état du magasin

export default persistReducer(persistConfig, rootReducer);
