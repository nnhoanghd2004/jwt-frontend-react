import axios from "axios"

const registerNewUser = (email, password, username, address, phone, sex) => {
    return axios.post('http://localhost:8080/api/v1/register', {
        email, password, username, address, phone, sex
    })
}

export {
    registerNewUser
}