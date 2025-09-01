import axios from "axios";

const Axios_instance = axios.create({
  baseURL: 
  //  "http://localhost:5000",
  "https://react-ecommerce-server-m4c6.onrender.com", 
  headers: {
    "Content-Type": "application/json"
  }
});

export default Axios_instance;
