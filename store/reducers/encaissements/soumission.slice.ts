import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import { API_AUTH_SUIVI } from "@/config/constants";

// Thunk pour soumettre les données d'encaissement
export const submitEncaissementValidation = createAsyncThunk(
  "encaissements/submitValidation",
  async (
    {
      encaissementId,
      observationCaisse,
      observationReleve,
      observationReclamation,
      ecartReleve,
      montantReleve,
      statutValidation,
    }: {
      encaissementId?: number;
      observationCaisse?: string;
      observationReleve?: string;
      observationReclamation?: string;
      ecartReleve?: number;
      montantReleve?: number;
      statutValidation?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        encaissementId,
        observationCaisse,
        observationReleve,
        observationReclamation,
        ecartReleve,
        montantReleve,
        statutValidation,
      };

      const response = await axiosInstance.post(
        `${API_AUTH_SUIVI}/encaissements/validation`,
        payload
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Erreur lors de la validation de l'encaissement"
      );
    }
  }
);

// Slice Redux Toolkit
const encaissementValidationSlice = createSlice({
  name: "encaissementsValidation",
  initialState: {
    loading: false,
    error: null as string | null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitEncaissementValidation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitEncaissementValidation.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitEncaissementValidation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default encaissementValidationSlice.reducer;
