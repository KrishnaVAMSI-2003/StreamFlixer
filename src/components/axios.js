import axios from "axios";

//creating an instance of base url to make requests to the movies database
const baseUrl = axios.create({
    baseURL: "https://api.themoviedb.org/3",
})

export default baseUrl;