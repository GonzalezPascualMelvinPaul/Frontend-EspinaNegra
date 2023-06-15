import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();
console.log(VITE_API_URL);
const espinaNegraApi = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`,
    "Content-Type": "application/json",
  },
});
export default espinaNegraApi;
