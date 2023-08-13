import axios from "axios";

const instance = axios.create({
  baseURL: "https://twitter-clone.kalpvaig.com/api",
});

export default instance;
