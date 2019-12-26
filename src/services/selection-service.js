import axios from '../axios/index'

export const selectionServices = {
    getSelections,
    saveSelection,
    getSelectionDetail
};

function getSelections() {
    return axios.get('/selections')
}

function saveSelection(selection) {
    return axios.post('/selections', selection)
}

function getSelectionDetail(id) {
    return axios.get('/selections/'+id)
}
