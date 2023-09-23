import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoutes from './PrivateRoutes';
import Login from '../component/Login/Login';
import Home from '../component/Home /Home';
import Register from '../component/Register/Register';
import Users from '../component/Users/Users';
import Projects from '../component/Projects/Projects';

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/users"
                    element={
                        <PrivateRoutes>
                            <Users />
                        </PrivateRoutes>
                    }
                />
                <Route
                    path="/projects"
                    element={
                        <PrivateRoutes>
                            <Projects />
                        </PrivateRoutes>
                    }
                />
                <Route path="*" element={'404 Not Found'} />
            </Routes>
        </div>
    );
};

export default AppRoutes;
