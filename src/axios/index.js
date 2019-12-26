import axios from "axios";

const instance = axios.create({
    baseURL: 'http://kaunghtut.cyberwings.asia/kqvoting/api/'
});

export default instance;