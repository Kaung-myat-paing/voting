import axios from '../axios/index'

export const voteService = {
    saveVote
};

function saveVote(vote) {
    return axios.post('/votes', vote)
}