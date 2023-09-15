import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const navigate = useNavigate();
    useEffect(() => {
        let checkLogin = sessionStorage.getItem('account');
        if (!checkLogin) {
            navigate('/login')
        }
    }, [])
    return (
        <div>
            users component
        </div>
    );
};

export default Users;