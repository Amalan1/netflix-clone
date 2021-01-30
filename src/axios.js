import axios from "axios";
/**base url to make request to the movie database */
const instance= axios.create({
    baseURL: "https://api.themoviedb.org/3",
});
/**the above instance is created so that whenever we type instance.get('trend') it will search for the trend option in the url */
export default instance;