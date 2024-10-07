// redux/userSlice.js
import store, { IRootState, TRootState } from "@/store";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";
import { initialStateMapCie } from "./user.initial";
import { fetchUsersList } from "./user.async";

const userSlice = createSlice({
	name: "userList",
	initialState: initialStateMapCie,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsersList.pending, (state) => {
				state.statutUser = "loading";
				//console.log("Loading Agence Cie",ALoading++);
				// showLoadingToast("Chargement des agences..."); // Afficher le message de chargement
			})
			.addCase(fetchUsersList.fulfilled, (state, action) => {
				state.statutUser = "succeeded";
				state.userData = action.payload;
				// hideLoadingToast(); // Masquer le message de chargement
				//console.log("response2.data",state.statusSuspectsList);
			})
			.addCase(fetchUsersList.rejected, (state, action) => {
				state.statutUser = "failed";
				state.errorUser = action.error.message || null;
				// hideLoadingToast(); // Masquer le message de chargement
				//console.log("Loading rejected Agence Cie", state.statusSuspectsList);
				// Afficher un message d'erreur
				// toast.error("Erreur lors du chargement des agences.", {
				// 	position: "top-right",
				// 	autoClose: 3000,
				// 	hideProgressBar: false,
				// 	closeOnClick: true,
				// 	pauseOnHover: true,
				// 	draggable: true,
				// 	progress: undefined,
				// });
			});
	},
});

// export const { setUser } = userSlice.actions;
export default userSlice.reducer;

// Ici je crée mes sélecteurs pour chaque données que je veux
// Pour nous empechers de réecrire TRootState a chaque fois que l'on à besoin des données
// On l'initialise une fois ici
export const usersDataSelector = (state: TRootState) => state.user.userData;

export const UserData = createSelector(
	[usersDataSelector],
	(userList) => userList
);
