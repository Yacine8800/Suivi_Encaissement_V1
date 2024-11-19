import { API_AUTH_SUIVI } from "@/config/constants";
import axiosInstance from "@/utils/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchObjetDr = createAsyncThunk(
  "objetDR/fetchObjetDr",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_AUTH_SUIVI}/object`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data ||
          "Erreur lors du chargement des directions régionales"
      );
    }
  }
);

const objetDRSlice = createSlice({
  name: "objetDR",
  initialState: {
    data: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchObjetDr.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchObjetDr.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchObjetDr.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default objetDRSlice.reducer;
