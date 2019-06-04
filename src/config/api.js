import axios from "axios";

export const instance = axios.create({
  baseURL: "https://fullstackfulltime.herokuapp.com",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json"
  }
});
