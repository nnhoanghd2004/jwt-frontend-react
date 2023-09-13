import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../../service/userService'


export default function Login() {
    const navigate = useNavigate();
    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")


    const handleLogin = () => {
        if (!account) {
            toast.error("Please enter email address or number phone")
            return
        }
        if (!password) {
            toast.error("Please enter password")
            return
        }

        let res = loginUser(account, password)
        console.log(res);
    }

    return (
        <div className='container pt-5' >
            <div className='row'>
                <div className='col-4'></div>
                <div className='col-4 rounded' style={{ backgroundColor: "white" }}>
                    <div className='d-flex justify-content-center mt-3'>
                        <h2 className='d-flex '>Hoang</h2>
                    </div>
                    <form>
                        <div className="form-outline my-3">
                            <input
                                type="email"
                                id="form2Example1"
                                className="form-control py-3"
                                placeholder='Email address or number phone'
                                value={account}
                                onChange={(e) => setAccount(e.target.value)}
                            />
                        </div>

                        <div className="form-outline my-3">
                            <input
                                type="password"
                                id="form2Example2"
                                className="form-control py-3"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="row mb-4">
                            <div className="col">
                                <a href="#!">Forgot password?</a>
                            </div>
                        </div>
                        <div className='row mt-3 d-flex justify-content-around'>
                            <button type="button"
                                className="btn btn-success btn-block mb-4 col-5"
                                onClick={() => handleLogin()}
                            >Login</button>
                            <div
                                className="btn btn-secondary btn-block mb-4 col-5"
                                onClick={() => navigate('/register')}
                            >Register </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
