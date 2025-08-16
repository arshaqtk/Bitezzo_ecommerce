import axios from "axios";

const Axios_instance = axios.create({
  baseURL: "http://localhost:5000", 
  headers: {
    "Content-Type": "application/json"
  }
});

export default Axios_instance;