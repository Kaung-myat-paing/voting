import axios from "axios";

const instance = axios.create({
    baseURL: 'https://cloud.kaunghtut.com/api/'
});

export default instance;