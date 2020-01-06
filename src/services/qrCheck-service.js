import axios from '../axios/index'

export const qrCheckService = {
    qrCheck
};

function qrCheck(ip) {
    return axios.post('/vote_check', ip )
}