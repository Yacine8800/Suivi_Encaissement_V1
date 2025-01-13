import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import { API_AUTH_SUIVI } from "@/config/constants";

// Thunk pour récupérer les données
export const fetchDataReleve = createAsyncThunk(
  "data/fetchDataReleve",
  async (
    {
      id,
      directionRegional,
      codeExpl,
      startDate,
      endDate,
    }: {
      id: string;
      directionRegional?: string[];
      codeExpl?: string[];
      startDate?: string;
      endDate?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const cleanArray = (arr: string[] | undefined) =>
        arr?.map((item) => item.trim()) || [];

      const formatArray = (arr: string[] | undefined) =>
        JSON.stringify(cleanArray(arr));

      const formatDate = (date: string | undefined) => {
        if (!date) return undefined;
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, "0");
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
      };

      const params: Record<string, any> = {};
      if (directionRegional?.length)
        params["directionRegional"] = formatArray(directionRegional);
      if (codeExpl?.length) params["codeExpl"] = formatArray(codeExpl);
      if (startDate) params["startDate"] = formatDate(startDate);
      if (endDate) params["endDate"] = formatDate(endDate);

      Object.keys(params).forEach((key) => {
        if (params[key] === undefined) {
          delete params[key];
        }
      });

      const baseURL = `${API_AUTH_SUIVI}/encaissements/${id}`;
      console.log("URL:", baseURL, "Params:", params);

      const response = await axiosInstance.get(baseURL, { params });
      return response.data;
    } catch (error: any) {
      console.error("Erreur API:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || "Erreur lors du chargement des données"
      );
    }
  }
);

// Slice Redux Toolkit
const dataReleveSlice = createSlice({
  name: "dataReleve",
  initialState: {
    data: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataReleve.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataReleve.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDataReleve.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dataReleveSlice.reducer;
