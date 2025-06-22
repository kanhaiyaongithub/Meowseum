// utils/catApi.js
import axios from "axios";

const catApi = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "x-api-key":
      "live_quCe0q8CKCushziKrfUhyxowwcjZIHnByZgwZuXVyPgIS3GAgSp8fj3grrQs4i0L",
  },
});

export default catApi;
