import axios from "axios"
const formAPI = axios.create({
    header:{
        "Content-Type": "application/json"
    }
})

const URL = 'http://localhost:5000/users'

function apigetuserdata(){
    return formAPI.get(URL)
}

function apipostuserdata(payload){
    return formAPI.post(URL,payload)
}

function apiupdateuserdata(payload){
    return formAPI.put(`${URL}/${payload.id}`,payload.update)
}

function apideleteuserdata(id){
    return formAPI.delete(`${URL}/${id}`)
}

export const api = {
    apigetuserdata,
    apipostuserdata,
    apiupdateuserdata,
    apideleteuserdata
}