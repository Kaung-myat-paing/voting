import axios from '../axios/index'

export const imageServices = {
    getImageBySelId
};


function getImageBySelId(id) {
    return axios.get('/images', id)
}