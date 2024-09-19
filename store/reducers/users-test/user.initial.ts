import { TUsersList } from "@/types/usersData.types";

// on définit le typage de notre état initial du SLice
export interface IUsersData {
	// pour cela on type notre donnée, puis notre status et enfin les erreurs
	userData: TUsersList[];
	statutUser: "idle" | "loading" | "succeeded" | "failed";
	errorUser: string | null;
}
// on définit l' état initial de notre Slice en n'oublions pas de le typer avec le agenceFmState définit juste au dessus
// idle : inactif
export const initialStateMapCie: IUsersData = {
	//  on défini des valeurs par défaut des données, statuts et erreurs

	userData: [],
	statutUser: "idle",
	errorUser: null,
};
