import { API_AUTH_SUIVI } from "@/config/constants";
import axios from "@/utils/axios";
import { setCookie, deleteCookie } from "cookies-next";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { decodeTokens } from "@/utils/tokendecod";

// Typage de la réponse de l'API et de l'état d'authentification
interface AuthResponse {
  acces_token: string;
}

interface AuthState {
  accessToken: string | null;
  user: any | null; // Stocke les informations utilisateur décodées
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  loading: false,
  error: null,
};

// Nouvelle interface pour credentials acceptant un champ "credential" et "password"
interface Credentials {
  credential: string;
  password: string;
}

// Fonction pour décoder le token
const decodeToken = (token: string): any => {
  try {
    return decodeTokens(token); // Retourne les données décodées
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
};

// Fonction pour récupérer la localisation utilisateur
const getLocation = async (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Erreur de géolocalisation :", error);
        resolve({ latitude: 0, longitude: 0 }); // Valeurs par défaut si échec
      }
    );
  });
};

// Thunk pour la connexion
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const loginPayload = {
        login: credentials.credential,
        password: credentials.password,
      };

      // Récupérer la localisation
      const location = await getLocation();

      const response = await axios.post<AuthResponse>(
        `${API_AUTH_SUIVI}/auth/sign-in`,
        loginPayload,
        {
          headers: { location: `${location.latitude},${location.longitude}` },
        }
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
      state.user = null; // Réinitialise les données utilisateur
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

        // Décoder le token pour extraire les informations utilisateur
        const decodedUser = decodeToken(action.payload);
        state.user = decodedUser;

        // Stocker le token dans les cookies
        setCookie("accessToken", action.payload, {
          secure: true,
          sameSite: "strict",
        });

        if (process.env.NODE_ENV === "development") {
          console.log("Token stocké et utilisateur décodé :", {
            token: action.payload,
            user: decodedUser,
          });
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
