import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getGroup } from '../../service/userService';

function ModalUser(props) {
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;

    let defaultValidInput = {
        emailValid: true,
        passwordValid: true,
        usernameValid: true,
        addressValid: true,
        phoneValid: true,
    };
    const [dataUser, setDataUser] = useState({});
    const [valid, setValid] = useState(defaultValidInput);
    const [groups, setGroups] = useState([]);

    const handleSubmit = () => {
        let groupSubmit;
        if (!dataUser.Group) groupSubmit = groups[0].name;
        else groupSubmit = dataUser.Group;
        groups.forEach((value) => {
            if (groupSubmit === value.name) groupSubmit = value.id;
        });
        if (
            defaultValidInput.emailValid &&
            defaultValidInput.passwordValid &&
            defaultValidInput.usernameValid &&
            defaultValidInput.addressValid &&
            defaultValidInput.phoneValid
        ) {
            if (dataUser.username && dataUser.address && dataUser.phone) {
                if (props.title === 'Edit User') {
                    props.handleEdit(
                        dataUser.id,
                        dataUser.username,
                        dataUser.address,
                        dataUser.phone,
                        dataUser.sex,
                        groupSubmit,
                    );
                    setDataUser({});
                } else {
                    props.handleCreate(
                        dataUser.email,
                        dataUser.password,
                        dataUser.username,
                        dataUser.address,
                        dataUser.phone,
                        dataUser.sex,
                        groupSubmit,
                    );
                    setDataUser({});
                }
            }
        }
    };

    const validateInput = (type) => {
        switch (type) {
            case 'email':
                validateEmail();
                break;
            case 'password':
                validatePassword();
                break;
            case 'username':
                validateUsername();
                break;
            case 'phone':
                validatePhone();
                break;
            default:
                break;
        }
    };

    const validateEmail = () => {
        const reg = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,}$/;
        if (!dataUser.email) {
            toast.error('Your email is empty');
            setValid({ ...valid, emailValid: false });
            return;
        }
        if (!reg.test(dataUser.email)) {
            toast.error('Invalid email');
            valid.emailValid = false;
            setValid({ ...valid, emailValid: false });
            return;
        }
        setValid({ ...valid, emailValid: true });
    };
    const validatePassword = () => {
        if (!dataUser.password) {
            toast.error('Your password is empty');
            setValid({ ...valid, passwordValid: false });
            return;
        }
        if (dataUser.password.length > 8) {
            if (!dataUser.password.match(lowerCaseLetters)) {
                toast.error('Your password requires lowercase letters');
                setValid({ ...valid, passwordValid: false });
            } else if (!dataUser.password.match(upperCaseLetters)) {
                toast.error('Your password requires uppercase letters');
                setValid({ ...valid, passwordValid: false });
            } else if (!dataUser.password.match(numbers)) {
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
        if (!dataUser.username) {
            toast.error('Your username is empty');
            setValid({ ...valid, usernameValid: false });
            return;
        }
        setValid({ ...valid, usernameValid: true });
    };
    const validateAddress = () => {
        if (!dataUser.address) {
            toast.error('Your address is empty');
            setValid({ ...valid, addressValid: false });
            return;
        }
        setValid({ ...valid, addressValid: true });
    };
    const validatePhone = () => {
        if (!dataUser.phone) {
            toast.error('Your phone is empty');
            setValid({ ...valid, phoneValid: false });
            return;
        }
        setValid({ ...valid, phoneValid: true });
    };

    const getAllGroup = async () => {
        let data = await getGroup();
        setGroups(data.DT);
    };

    const handleClick = (id) => {
        const key = id + 'Valid';
        setValid({ ...valid, [key]: true });
    };

    useEffect(() => {
        setDataUser(props.dataUser);
    }, [props.dataUser]);

    useEffect(() => {
        getAllGroup();
    }, []);

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
                                        defaultValue={dataUser.email}
                                        className={'form-control py-3'}
                                        onChange={(e) => {
                                            setDataUser({ ...dataUser, email: e.target.value });
                                        }}
                                        // onBlur={() => validateEmail()}
                                    />
                                )}
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
                                            onChange={(e) => {
                                                setDataUser({ ...dataUser, phone: e.target.value });
                                            }}
                                            // onBlur={() => validatePhone()}
                                            onClick={(e) => handleClick(e.target.id)}
                                            disabled
                                        />
                                    </>
                                ) : (
                                    <input
                                        type="text"
                                        id="phone"
                                        placeholder="Phone"
                                        defaultValue={dataUser.phone}
                                        className={
                                            valid.phoneValid ? 'form-control py-3' : 'form-control py-3 is-invalid'
                                        }
                                        onChange={(e) => {
                                            setDataUser({ ...dataUser, phone: e.target.value });
                                        }}
                                        // onBlur={() => validatePhone()}
                                        onClick={(e) => handleClick(e.target.id)}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="row">
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
                                            onChange={(e) => {
                                                setDataUser({ ...dataUser, username: e.target.value });
                                            }}
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
                                        onChange={(e) => {
                                            setDataUser({ ...dataUser, username: e.target.value });
                                        }}
                                        onBlur={() => validateUsername()}
                                        onClick={(e) => handleClick(e.target.id)}
                                    />
                                )}
                            </div>

                            {props.title === 'Edit User' ? (
                                <></>
                            ) : (
                                <div className="form-outline my-1 col-6">
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        className={
                                            valid.passwordValid ? 'form-control py-3' : 'form-control py-3 is-invalid'
                                        }
                                        onChange={(e) => {
                                            setDataUser({ ...dataUser, password: e.target.value });
                                        }}
                                        onBlur={() => validateInput('password')}
                                        onClick={(e) => handleClick(e.target.id)}
                                    />
                                </div>
                            )}
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
                                        defaultValue={dataUser.address}
                                        className={
                                            valid.addressValid ? 'form-control py-3' : 'form-control py-3 is-invalid'
                                        }
                                        onChange={(e) => {
                                            setDataUser({ ...dataUser, address: e.target.value });
                                        }}
                                        onBlur={() => validateAddress()}
                                        onClick={(e) => handleClick(e.target.id)}
                                    />
                                </>
                            ) : (
                                <input
                                    type="text"
                                    id="address"
                                    placeholder="Address"
                                    defaultValue={dataUser.address}
                                    className={
                                        valid.addressValid ? 'form-control py-3' : 'form-control py-3 is-invalid'
                                    }
                                    onChange={(e) => {
                                        setDataUser({ ...dataUser, address: e.target.value });
                                    }}
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
                                            value={dataUser.sex}
                                            onChange={(e) => {
                                                setDataUser({ ...dataUser, sex: e.target.value });
                                            }}
                                        >
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="form-outline my-1 col-6">
                                        <select
                                            value={dataUser.Group}
                                            className="form-select"
                                            aria-label="Default select example"
                                            onChange={(e) => {
                                                setDataUser({ ...dataUser, Group: e.target.value });
                                            }}
                                        >
                                            {groups.map((value, index) => {
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
                                            value={dataUser.sex}
                                            onChange={(e) => {
                                                setDataUser({ ...dataUser, sex: e.target.value });
                                            }}
                                        >
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="form-outline my-1 col-6">
                                        <select
                                            value={dataUser.Group}
                                            className="form-select"
                                            aria-label="Default select example"
                                            onChange={(e) => {
                                                setDataUser({ ...dataUser, Group: e.target.value });
                                            }}
                                        >
                                            {groups.map((value, index) => {
                                                return (
                                                    <option key={`option ${dataUser.Group + ' ' + index} `}>
                                                        {value.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="row mt-3 d-flex justify-content-around">
                            <button
                                type="button"
                                className="btn btn-success  mb-4 col-5"
                                onClick={() => handleSubmit()}
                            >
                                {props.title === 'Create New User' ? 'Create' : 'Save'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary  mb-4 col-5"
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
