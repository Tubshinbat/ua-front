import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:2004/api/v1/",
  baseURL: "https://naog.lvg.mn/api/",
});

instance.defaults.withCredentials = true;

export default instance;
