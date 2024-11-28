export const handleApiError = (error: any): string => {
  if (error.response?.status >= 500) {
    return "Une erreur s'est produite.";
  }

  return (
    error.response?.data?.message || // Message de l'API
    error.message || // Message d'Axios
    "Une erreur inattendue s'est produite." // Message par défaut
  );
};
