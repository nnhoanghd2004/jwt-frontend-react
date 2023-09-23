import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { toast } from 'react-toastify';

function ModalUser(props) {
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    // const phoneValidate = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    let defaultValidInput = {
        emailValid: true,
        passwordValid: true,
        usernameValid: true,
        addressValid: true,
        phoneValid: true,
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [sex, setSex] = useState('Male');
    const [group, setGroup] = useState('');
    const [valid, setValid] = useState(defaultValidInput);

    const handleSubmit = () => {
        let groupSubmit;
        if (!group) groupSubmit = props.allGroup[0].name;
        else groupSubmit = group;
        props.allGroup.map((value) => {
            if (groupSubmit === value.name) groupSubmit = value.id;
        });
        if (
            defaultValidInput.emailValid &&
            defaultValidInput.passwordValid &&
            defaultValidInput.usernameValid &&
            defaultValidInput.addressValid &&
            defaultValidInput.phoneValid
        ) {
            if (password && email && username && address && phone) {
                props.handleCreate(email, password, username, address, phone, sex, groupSubmit);
            }
        }
    };

    const validateEmail = () => {
        const reg = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,}$/;
        if (!email) {
            toast.error('Your email is empty');
            setValid({ ...valid, emailValid: false });
            return;
        }
        if (!reg.test(email)) {
            toast.error('Invalid email');
            valid.emailValid = false;
            setValid({ ...valid, emailValid: false });
            return;
        }
        setValid({ ...valid, emailValid: true });
    };
    const validatePassword = () => {
        if (!password) {
            toast.error('Your password is empty');
            setValid({ ...valid, passwordValid: false });
            return;
        }
        if (password.length > 8) {
            if (!password.match(lowerCaseLetters)) {
                toast.error('Your password requires lowercase letters');
                setValid({ ...valid, passwordValid: false });
            } else if (!password.match(upperCaseLetters)) {
                toast.error('Your password requires uppercase letters');
                setValid({ ...valid, passwordValid: false });
            } else if (!password.match(numbers)) {
                toast.error('Your password requires numbers');
                setValid({ ...valid, passwordValid: false });
            }
        } else {
            toast.error('Your password less than 8 characters');
            setValid({ ...valid, passwordValid: false });
        }
        setValid({ ...valid, passwordValid: true });
    };
    const validateUsername = () => {
        if (!username) {
            toast.error('Your username is empty');
            setValid({ ...valid, usernameValid: false });
            return;
        }
        setValid({ ...valid, usernameValid: true });
    };
    const validateAddress = () => {
        if (!address) {
            toast.error('Your address is empty');
            setValid({ ...valid, addressValid: false });
            return;
        }
        setValid({ ...valid, addressValid: true });
    };
    const validatePhone = () => {
        if (!phone) {
            toast.error('Your phone is empty');
            setValid({ ...valid, phoneValid: false });
            return;
        }
        setValid({ ...valid, phoneValid: true });
    };

    const handleClick = (id) => {
        const key = id + 'Valid';
        setValid({ ...valid, [key]: true });
    };

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="form-outline my-1 col-6">
                                {props.title === 'Edit User' ? (
                                    <>
                                        <label className="mb-1" htmlFor="email">
                                            Email:
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            defaultValue={props.dataUser.email}
                                            className={'form-control py-3'}
                                            disabled
                                        />
                                    </>
                                ) : (
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Email address"
                                        defaultValue={email}
                                        className={'form-control py-3'}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={() => validateEmail()}
                                    />
                                )}
                            </div>

                            <div className="form-outline my-1 col-6">
                                {props.title === 'Edit User' ? (
                                    <>
                                        <label className="mb-1" htmlFor="username">
                                            Username:
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            placeholder="Username"
                                            defaultValue={props.dataUser.username}
                                            className={
                                                valid.usernameValid
                                                    ? 'form-control py-3'
                                                    : 'form-control py-3 is-invalid'
                                            }
                                            onChange={(e) => setUsername(e.target.value)}
                                            onBlur={() => validateUsername()}
                                            onClick={(e) => handleClick(e.target.id)}
                                        />
                                    </>
                                ) : (
                                    <input
                                        type="text"
                                        id="username"
                                        placeholder="Username"
                                        defaultValue={props.dataUser.username}
                                        className={
                                            valid.usernameValid ? 'form-control py-3' : 'form-control py-3 is-invalid'
                                        }
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={() => validateUsername()}
                                        onClick={(e) => handleClick(e.target.id)}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-outline my-1 col-6">
                                {props.title === 'Edit User' && (
                                    <label className="mb-1" htmlFor="password">
                                        Password:
                                    </label>
                                )}
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    defaultValue={password}
                                    className={
                                        valid.passwordValid ? 'form-control py-3' : 'form-control py-3 is-invalid'
                                    }
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={() => validatePassword()}
                                    onClick={(e) => handleClick(e.target.id)}
                                />
                            </div>
                            <div className="form-outline my-1 col-6">
                                {props.title === 'Edit User' ? (
                                    <>
                                        <label className="mb-1" htmlFor="phone">
                                            Phone Number:
                                        </label>
                                        <input
                                            type="text"
                                            id="phone"
                                            placeholder="Phone"
                                            defaultValue={props.dataUser.phone}
                                            className={
                                                valid.phoneValid ? 'form-control py-3' : 'form-control py-3 is-invalid'
                                            }
                                            onChange={(e) => setPhone(e.target.value)}
                                            onBlur={() => validatePhone()}
                                            onClick={(e) => handleClick(e.target.id)}
                                        />
                                    </>
                                ) : (
                                    <input
                                        type="text"
                                        id="phone"
                                        placeholder="Phone"
                                        defaultValue={phone}
                                        className={
                                            valid.phoneValid ? 'form-control py-3' : 'form-control py-3 is-invalid'
                                        }
                                        onChange={(e) => setPhone(e.target.value)}
                                        onBlur={() => validatePhone()}
                                        onClick={(e) => handleClick(e.target.id)}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="form-outline my-1">
                            {props.title === 'Edit User' ? (
                                <>
                                    <label className="mb-1" htmlFor="address">
                                        Address:
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        placeholder="Address"
                                        defaultValue={address}
                                        className={
                                            valid.addressValid ? 'form-control py-3' : 'form-control py-3 is-invalid'
                                        }
                                        onChange={(e) => setAddress(e.target.value)}
                                        onBlur={() => validateAddress()}
                                        onClick={(e) => handleClick(e.target.id)}
                                    />
                                </>
                            ) : (
                                <input
                                    type="text"
                                    id="address"
                                    placeholder="Address"
                                    defaultValue={address}
                                    className={
                                        valid.addressValid ? 'form-control py-3' : 'form-control py-3 is-invalid'
                                    }
                                    onChange={(e) => setAddress(e.target.value)}
                                    onBlur={() => validateAddress()}
                                    onClick={(e) => handleClick(e.target.id)}
                                />
                            )}
                        </div>
                        <div className="row">
                            {props.title === 'Edit User' ? (
                                <>
                                    <div className="form-outline my-1 col-6">
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            defaultValue={props.dataUser.sex}
                                            onChange={(e) => setSex(e.target.value)}
                                        >
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="form-outline my-1 col-6">
                                        <select
                                            defaultValue={props.allGroup[props.dataUser.group - 1]}
                                            className="form-select"
                                            aria-label="Default select example"
                                            onChange={(e) => setGroup(e.target.value)}
                                        >
                                            {props.allGroup.map((value, index) => {
                                                return <option>{value.name}</option>;
                                            })}
                                        </select>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="form-outline my-1 col-6">
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            defaultValue={sex}
                                            onChange={(e) => setSex(e.target.value)}
                                        >
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="form-outline my-1 col-6">
                                        <select
                                            defaultValue={group}
                                            className="form-select"
                                            aria-label="Default select example"
                                            onChange={(e) => setGroup(e.target.value)}
                                        >
                                            {props.allGroup.map((value, index) => {
                                                return <option>{value.name}</option>;
                                            })}
                                        </select>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="row mt-3 d-flex justify-content-around">
                            <button
                                type="button"
                                className="btn btn-success btn-block mb-4 col-5"
                                onClick={() => handleSubmit()}
                            >
                                {props.title === 'Create New User' ? 'Create' : 'Save'}
                            </button>
                            <button
                                className="btn btn-secondary btn-block mb-4 col-5"
                                onClick={() => {
                                    setValid(defaultValidInput);
                                    props.handleClose();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalUser;
