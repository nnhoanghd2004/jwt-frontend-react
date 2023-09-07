import React from 'react'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [sex, setSex] = useState("Male");
    const validateData = () => {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!reg.test(email)) {
            toast.warn("Invalid email");
            return false;
        }

        const lowerCaseLetters = /[a-z]/g;
        const upperCaseLetters = /[A-Z]/g;
        const numbers = /[0-9]/g;
        const phoneValidate = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

        if (password.length > 8) {
            if (!password.match(lowerCaseLetters)) {
                toast.warn("Your password requires lowercase letters");
                return false;
            } else if (!password.match(upperCaseLetters)) {
                toast.warn("Your password requires uppercase letters");
                return false;
            } else if (!password.match(numbers)) {
                toast.warn("Your password requires numbers");
                return false;
            }
        } else {
            toast.warn("Your password requires numbers");
            return false;
        }

        if (rePassword !== password) {
            toast.warn("Your passwords are not the same");
            return false;
        }

        if (!username) {
            toast.warn("Your username is empty");
            return false;
        }

        if (!address) {
            toast.warn("Your address is empty");
            return false;
        }

        if (!phoneValidate.test(phone)) {
            toast.warn("Invalide phone number");
            return false;
        }

        return true;
    }
    const handleRegister = () => {
        if (validateData())
            console.log({ email, password, username, address, phone, sex });
    }

    // useEffect(() => {
    //     axios.get('http://localhost:8080/test/api')
    //         .then(data => console.log(data))
    // }, [])

    return (
        <div className='container pt-5' >
            <div className='row'>
                <div className='col-md-2 col-lg-3 col-xl-4'></div>
                <div className='col-sm-12 col-md-8 col-lg-6 col-xl-4  rounded' style={{ backgroundColor: "white" }}>
                    <div className='d-flex justify-content-center mt-3'>
                        <h2 className='d-flex '>Hoang</h2>
                    </div>
                    <form>
                        <div className="form-outline my-3">
                            <input type="email" id="form2Example1" className="form-control py-3"
                                placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-outline my-3">
                            <input type="password" id="form2Example2" className="form-control py-3"
                                placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="form-outline my-3">
                            <input type="password" id="form2Example2" className="form-control py-3"
                                placeholder='Re-Password' value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                        </div>

                        <div className="form-outline my-3">
                            <input type="text" id="form2Example1" className="form-control py-3"
                                placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div className="form-outline my-3">
                            <input type="text" id="form2Example2" className="form-control py-3"
                                placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div className="form-outline my-3">
                            <input type="text" id="form2Example1" className="form-control py-3"
                                placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <div>Sex</div>
                        <div className="input-group">
                            <div className="input-group-text">
                                <input className="mt-0" type="radio" name='sex' defaultChecked onClick={() => setSex("Male")} />
                            </div>
                            <input type="text" className="form-control" defaultValue="Male" />
                            <div className="input-group-text">
                                <input className="mt-0" type="radio" name='sex' onClick={() => setSex("Female")} />
                            </div>
                            <input type="text" className="form-control" defaultValue="Female" />
                        </div>
                        {/* <div className="form-outline my-3">
                            <input type="radio" id="Male" className="form-control py-3" />
                            <label for="html">Male</label><br />
                            <input type="radio" id="Femal" className="form-control py-3" />
                            <label for="html">Femal</label><br />
                            <input type="radio" id="Other" className="form-control py-3" />
                            <label for="html">Other</label><br />
                        </div> */}

                        <div className="row my-4">
                            <div className="col">
                                <a href="#!">Forgot password?</a>
                            </div>
                        </div>
                        <div className='row mt-3 d-flex justify-content-around'>
                            <button type="button" className="btn btn-success btn-block mb-4 col-5" onClick={() => handleRegister()}>Register</button>
                            <button className="btn btn-secondary btn-block mb-4 col-5" onClick={() => navigate("/login")}>
                                Login
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
