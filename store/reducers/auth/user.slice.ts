// store/authSlice.ts
import { API_AUTH_SUIVI } from "@/config/constants";
import axios from "@/utils/axios";
import { setCookie, deleteCookie } from "cookies-next";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Typage de la réponse de l'API et de l'état d'authentification
interface AuthResponse {
  acces_token: string;
}

interface AuthState {
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  loading: false,
  error: null,
};

// Nouvelle interface pour credentials acceptant un champ "credential" et "password"
interface Credentials {
  credential: string;
  password: string;
}

// Thunk pour la connexion
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const loginPayload = {
        login: credentials.credential,
        password: credentials.password,
      };
      const response = await axios.post<AuthResponse>(
        `${API_AUTH_SUIVI}/auth/sign-in`,
        loginPayload
      );
      return response.data.acces_token;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Slice d'authentification
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.error = null;
      deleteCookie("accessToken"); // Supprime le cookie
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.accessToken = action.payload;
        state.loading = false;
        setCookie("accessToken", action.payload, {
          secure: true,
          sameSite: "strict",
        }); // Enregistre le token dans les cookies
        if (process.env.NODE_ENV === "development") {
          console.log("Token stored in Redux:", action.payload);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
