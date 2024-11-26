import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import { API_AUTH_SUIVI } from "@/config/constants";

// Thunk pour récupérer les secteurs
export const fetchSecteurs = createAsyncThunk(
  "secteurs/fetchSecteurs",
  async (drIds: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_AUTH_SUIVI}/secteur?drIds=${JSON.stringify(drIds)}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Erreur lors du chargement des secteurs"
      );
    }
  }
);

// Création du slice
const SecteursSlice = createSlice({
  name: "secteurs",
  initialState: {
    data: [] as any[], // Remplacez `any[]` par le type spécifique des secteurs si disponible
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSecteurs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSecteurs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSecteurs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default SecteursSlice.reducer;
