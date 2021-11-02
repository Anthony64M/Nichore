import axios from "axios";
import { parseCookies } from "nookies";

const isDev = process.env.NODE_ENV === "development";

export function getAPIClient(ctx?: any) {
  const { "artsy.token": token } = parseCookies(ctx);

  const devURl =
    typeof window === "undefined" ? "http://localhost:3000/api" : "/api";
  const prodUrl =
    typeof window === "undefined" ? process.env.URL + "/api" : "/api";
  const api = axios.create({
    baseURL: isDev ? devURl : prodUrl,
  });

  // api.interceptors.request.use(config => {
  //   console.log(config)

  //   return config;
  // })

  if (token) {
    api.defaults.headers.authorization = token;
  }

  return api;
}
