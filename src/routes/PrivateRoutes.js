import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        let checkLogin = sessionStorage.getItem('account');
        if (!checkLogin) {
            navigate('/login')
        }
    }, [])
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoutes;