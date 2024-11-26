// utils/axiosInstance.ts

import store from "@/store";
import { logout } from "@/store/reducers/auth/user.slice";
import axios from "axios";

import { deleteCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: "http://20.93.150.129:2402/api/v1", // Remplacez par votre URL de base
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Récupérer le token depuis le Redux store
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data, // Retourne uniquement les données pour simplifier l'utilisation
  (error) => {
    if (error.response?.status === 401) {
      // Gestion des erreurs 401 (Unauthorized)
      console.error(
        "Session expirée ou non autorisée. Déconnexion en cours..."
      );
      store.dispatch(logout());
      deleteCookie("accessToken");
      window.location.href = "/login"; // Redirige vers la page de connexion
    }
    return Promise.reject(error); // Propager l'erreur pour un traitement ultérieur
  }
);

export default axiosInstance;
