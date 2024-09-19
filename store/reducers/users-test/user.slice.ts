// redux/userSlice.js
import store, { IRootState, TRootState } from "@/store";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";
import { initialStateMapCie } from "./user.initial";

const userSlice = createSlice({
	name: "userList",
	initialState: initialStateMapCie,
	reducers: {},
});

// export const { setUser } = userSlice.actions;
export default userSlice.reducer;

// Ici je crée mes sélecteurs pour chaque données que je veux
// Pour nous empechers de réecrire TRootState a chaque fois que l'on à besoin des données
// On l'initialise une fois ici
export const usersDataSelector = (state: TRootState) => state.user;

export const selectAgenceList = createSelector(
	[usersDataSelector],
	(userList) => userList
);
