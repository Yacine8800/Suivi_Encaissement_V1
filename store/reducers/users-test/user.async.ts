import { API_FCMS } from "@/config/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsersList = createAsyncThunk(
	"userList/fetchUsersList",
	async () => {
		const response = await axios.get(`${API_FCMS}/local-users`);
		// //console.log("response.data",response.data);
		return response.data;
	}
);
