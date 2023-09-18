import axios from "axios"

const registerNewUser = (email, password, username, address, phone, sex) => {
    return axios.post('http://localhost:8080/api/v1/register', {
        email, password, username, address, phone, sex
    })
}

const loginUser = (account, password) => {
    return axios.post('http://localhost:8080/api/v1/login', {
        account, password
    })
}

const allUser = (page) => {
    return axios.get(`http://localhost:8080/api/v1/user/read?page=${page}&limit=5`)
}

export {
    registerNewUser, loginUser, allUser
}