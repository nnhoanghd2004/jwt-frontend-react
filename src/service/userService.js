import axios from '../config/axios';

const registerNewUser = (email, password, username, address, phone, sex) => {
    return axios.post('/api/v1/register', {
        email,
        password,
        username,
        address,
        phone,
        sex,
    });
};

const loginUser = (account, password) => {
    return axios.post('/api/v1/login', {
        account,
        password,
    });
};

const allUser = (page) => {
    return axios.get(`/api/v1/user/read?page=${page}&limit=3`);
};

const deleteUser = (id) => {
    return axios.delete('/api/v1/user/delete', { data: { id } });
};

const createUser = (email, password, username, address, phone, sex, group) => {
    return axios.post('/api/v1/user/create', {
        email,
        password,
        username,
        address,
        phone,
        sex,
        group,
    });
};

const updateUser = (id, username, address, phone, sex, group) => {
    return axios.put('/api/v1/user/update', {
        id,
        username,
        address,
        phone,
        sex,
        group,
    });
};

const getGroup = () => {
    return axios.get('/api/v1/group/read');
};

export { registerNewUser, loginUser, allUser, deleteUser, createUser, getGroup, updateUser };
