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
      banque,
      caisse,
      codeExpl,
      produit,
      profile,
    }: {
      id: string;
      directionRegional?: string[];
      banque?: string[];
      caisse?: string[];
      codeExpl?: string;
      produit?: string[];
      profile?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      // Construction des paramètres facultatifs
      const params = new URLSearchParams();
      if (directionRegional)
        params.append("directionRegional", JSON.stringify(directionRegional));
      if (banque) params.append("banque", JSON.stringify(banque));
      if (caisse) params.append("caisse", JSON.stringify(caisse));
      if (codeExpl) params.append("codeExpl", codeExpl);
      if (produit) params.append("produit", JSON.stringify(produit));
      if (profile !== undefined) params.append("profile", profile.toString());

      // Requête API avec l'ID utilisateur dans l'URL
      const response = await axiosInstance.get(
        `${API_AUTH_SUIVI}/encaissements/${id}?${params.toString()}`
      );
      return response.data;
    } catch (error: any) {
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
