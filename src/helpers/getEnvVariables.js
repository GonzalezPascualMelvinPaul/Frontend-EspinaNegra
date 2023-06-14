export const getEnvVariables = () => {
  return {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_API_URL_IMAGE: import.meta.env.VITE_API_URL_IMAGE,
  };
};
