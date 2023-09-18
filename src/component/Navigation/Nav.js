import React from 'react';
import './Nav.scss'
import { NavLink } from 'react-router-dom';
import _ from "lodash";
import { useEffect, useState } from "react";

function Nav() {
    const [account, setAccount] = useState({});

    useEffect(() => {
        let checkLogin = sessionStorage.getItem('account');
        if (checkLogin) {
            setAccount(JSON.parse(checkLogin))
        }
    }, [])
    return (
        <>
            {account && !_.isEmpty(account) && account.isAuthenticate && (
                <ul className="topnav">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/users">Users</NavLink></li>
                    <li><NavLink to="/projects">Products</NavLink></li>
                    <li style={{ float: 'left' }}><NavLink to="/about">About</NavLink></li>
                </ul >
            )
            }
        </>


    );
}

export default Nav;