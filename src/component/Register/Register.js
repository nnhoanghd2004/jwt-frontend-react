import React from 'react'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import { registerNewUser } from '../../service/userService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {

    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const phoneValidate = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    let defaultValidInput = {
        emailValid: true, passwordValid: true, rePasswordValid: true,
        usernameValid: true, addressValid: true, phoneValid: true
    }

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [sex, setSex] = useState(1);
    const [valid, setValid] = useState(defaultValidInput)

    const handleSubmit = async () => {
        if (defaultValidInput.emailValid && defaultValidInput.passwordValid && defaultValidInput.rePasswordValid &&
            defaultValidInput.usernameValid && defaultValidInput.addressValid && defaultValidInput.phoneValid) {
            if (password && email && rePassword && username && address && phone) {
                let res = await registerNewUser(email, password, username, address, phone, sex)
                let data = res.data
                console.log(data.EC);
                if (+data.EC === 0) {
                    toast.success(data.EM)
                    navigate('/login')
                } else {
                    toast.error(data.EM)
                }
            }
        }
    }
    const validateEmail = () => {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!email) {
            toast.error("Your email is empty");
            setValid({ ...valid, emailValid: false });
            return;
        }
        if (!reg.test(email)) {
            toast.error("Invalid email");
            valid.emailValid = false;
            setValid({ ...valid, emailValid: false });
            return;
        }
        setValid({ ...valid, emailValid: true });
    }
    const validatePassword = () => {
        if (!password) {
            toast.error("Your password is empty");
            setValid({ ...valid, passwordValid: false });
            return;
        }
        if (password.length > 8) {
            if (!password.match(lowerCaseLetters)) {
                toast.error("Your password requires lowercase letters");
                setValid({ ...valid, passwordValid: false });
            } else if (!password.match(upperCaseLetters)) {
                toast.error("Your password requires uppercase letters");
                setValid({ ...valid, passwordValid: false });
            } else if (!password.match(numbers)) {
                toast.error("Your password requires numbers");
                setValid({ ...valid, passwordValid: false });
            }
        } else {
            toast.error("Your password less than 8 characters");
            setValid({ ...valid, passwordValid: false });
        }
        setValid({ ...valid, passwordValid: true });
    }
    const validateRePassword = () => {
        if (!rePassword) {
            toast.error("Your Re-Password is empty");
            setValid({ ...valid, rePasswordValid: false });
            return;
        }
        if (rePassword !== password) {
            toast.error("Your passwords are not the same");
            setValid({ ...valid, rePasswordValid: false });
            return;
        }
        setValid({ ...valid, rePasswordValid: true });
    }
    const validateUsername = () => {
        if (!username) {
            toast.error("Your username is empty");
            setValid({ ...valid, usernameValid: false });
            return;
        }
        setValid({ ...valid, usernameValid: true });
    }
    const validateAddress = () => {
        if (!address) {
            toast.error("Your address is empty");
            setValid({ ...valid, addressValid: false });
            return;
        }
        setValid({ ...valid, addressValid: true });
    }
    const validatePhone = () => {
        if (!phone) {
            toast.error("Your phone is empty");
            setValid({ ...valid, phoneValid: false });
            return;
        }
        setValid({ ...valid, phoneValid: true });
    }

    const handleClick = (id) => {
        const key = id + "Valid"
        setValid({ ...valid, [key]: true });
    }

    // useEffect(() => {
    //     // axios.get('http://localhost:8080/api/v1/test-api')
    //     //     .then(data => console.log(data))
    //     axios.post('http://localhost:8080/api/v1/register', {
    //         email, password, username, address, phone, sex
    //     })
    // }, [])

    return (
        <div className='container pt-5' >
            <div className='row'>
                <div className='col-md-2 col-lg-3 col-xl-4'></div>
                <div className='col-sm-12 col-md-8 col-lg-6 col-xl-4 rounded' style={{ backgroundColor: "white" }}>
                    <div className='d-flex justify-content-center mt-3'>
                        <h2 className='d-flex'>Hoang</h2>
                    </div>
                    <form>
                        <div className="form-outline my-3">
                            <input type="email" id="email" placeholder='Email address' value={email}
                                className={valid.emailValid ? "form-control py-3" : "form-control py-3 is-invalid"}
                                onChange={(e) => setEmail(e.target.value)} onBlur={() => validateEmail()} onClick={(e) => handleClick(e.target.id)} />
                        </div>

                        <div className="form-outline my-3">
                            <input type="password" id="password" placeholder='Password' value={password}
                                className={valid.passwordValid ? "form-control py-3" : "form-control py-3 is-invalid"}
                                onChange={(e) => setPassword(e.target.value)} onBlur={() => validatePassword()} onClick={(e) => handleClick(e.target.id)} />
                        </div>

                        <div className="form-outline my-3">
                            <input type="password" id="rePassword" placeholder='Re-Password' value={rePassword}
                                className={valid.rePasswordValid ? "form-control py-3" : "form-control py-3 is-invalid"}
                                onChange={(e) => setRePassword(e.target.value)} onBlur={() => validateRePassword()} onClick={(e) => handleClick(e.target.id)} />
                        </div>

                        <div className="form-outline my-3">
                            <input type="text" id="username" placeholder='Username' value={username}
                                className={valid.usernameValid ? "form-control py-3" : "form-control py-3 is-invalid"}
                                onChange={(e) => setUsername(e.target.value)} onBlur={() => validateUsername()} onClick={(e) => handleClick(e.target.id)} />
                        </div>

                        <div className="form-outline my-3">
                            <input type="text" id="address" placeholder='Address' value={address}
                                className={valid.addressValid ? "form-control py-3" : "form-control py-3 is-invalid"}
                                onChange={(e) => setAddress(e.target.value)} onBlur={() => validateAddress()} onClick={(e) => handleClick(e.target.id)} />
                        </div>

                        <div className="form-outline my-3">
                            <input type="text" id="phone" placeholder='Phone' value={phone}
                                className={valid.phoneValid ? "form-control py-3" : "form-control py-3 is-invalid"}
                                onChange={(e) => setPhone(e.target.value)} onBlur={() => validatePhone()} onClick={(e) => handleClick(e.target.id)} />
                        </div>

                        <div>Sex</div>
                        <div className="input-group">
                            <div className="input-group-text">
                                <input className="mt-0" type="radio" name='sex' defaultChecked onClick={() => setSex(1)} />
                            </div>
                            <input type="text" className="form-control" defaultValue="Male" />
                            <div className="input-group-text">
                                <input className="mt-0" type="radio" name='sex' onClick={() => setSex(0)} />
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
                            <button type="button" className="btn btn-success btn-block mb-4 col-5" onClick={() => handleSubmit()}>Register</button>
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
