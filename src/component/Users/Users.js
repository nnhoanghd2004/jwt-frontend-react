import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ModalDelete from './ModalDelete';
import { toast } from 'react-toastify';

import ModalUser from './ModalUser';
import { allUser, deleteUser, createUser, updateUser } from '../../service/userService';

const Users = () => {
    const defaultDataUser = {
        email: '',
        password: '',
        username: '',
        address: '',
        phone: '',
        sex: '',
        Group: '',
    };
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalRow, setTotalRow] = useState(0);
    const [showModelDeleteUser, setShowModelDeleteUser] = useState(false);
    const [showModelUser, setShowModelUser] = useState(false);
    const [dataUser, setDataUser] = useState({});
    const [titleModalUser, setTitleModalUser] = useState('');

    const handleRefesh = () => {
        setTotalRow(totalRow + 1);
    };
    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1);
    };

    const handleCloseDeleteUser = () => {
        setDataUser({});
        setShowModelDeleteUser(false);
    };
    const handleOpenDeleteUser = (dataUser) => {
        setDataUser(dataUser);
        setShowModelDeleteUser(true);
    };
    const handleDelete = async () => {
        await deleteUser(dataUser.id);
        toast.success(`Delete user: ${dataUser.email} success`);
        setShowModelDeleteUser(false);
        setTotalRow(totalRow - 1);
    };

    const handleCloseUser = () => {
        setDataUser({});
        setShowModelUser(false);
    };
    const handleOpenUser = (dataUser) => {
        setDataUser(dataUser);
        setShowModelUser(true);
    };
    const handleConfirm = async (email, password, username, address, phone, sex, group) => {
        let data = await createUser(email, password, username, address, phone, sex, group);
        if (data && +data.EC === 0) {
            toast.success(data.EM);
        } else {
            toast.error(data.EM);
        }
        setShowModelUser(false);
        setTotalRow(totalRow - 1);
    };

    const handleEditUser = async (id, username, address, phone, sex, group) => {
        let data = await updateUser(id, username, address, phone, sex, group);
        if (data && +data.EC === 0) {
            toast.success(data.EM);
        } else {
            toast.error(data.EM);
        }
        setShowModelUser(false);
        setTotalRow(totalRow - 1);
    };

    useEffect(() => {
        async function fetchData() {
            let data = await allUser(currentPage);
            let user = data.DT.users.reduce((accum, val) => {
                accum.push({ ...val, Group: val.Group.name });
                return accum;
            }, []);
            setUsers(user);
            setTotalPage(data.DT.totalPages);
            setTotalRow(data.DT.totalRows);
        }
        fetchData();
    }, [currentPage, totalRow]);

    return (
        <>
            <div className="container">
                <div className="mb-3">
                    <h3 className="py-3">All Users</h3>
                    <button className="btn btn-success" onClick={() => handleRefesh()}>
                        <i className="fa fa-refresh me-2"></i>
                        Refesh
                    </button>
                    <button
                        className="btn btn-primary mx-3"
                        onClick={() => {
                            setTitleModalUser('Create New User');
                            handleOpenUser(defaultDataUser);
                        }}
                    >
                        <i className="fa fa-plus me-2"></i>
                        Add new user
                    </button>
                </div>
                <div>
                    <table className="table table-hover table-bordered rounded overflow-hidden">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Address</th>
                                <th scope="col">Sex</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Group</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((value, index) => {
                                return (
                                    <tr key={`row-${index}`}>
                                        <th scope="row">{(currentPage - 1) * 3 + index + 1}</th>

                                        <td>{value.id}</td>
                                        <td>{value.email}</td>
                                        <td>{value.username}</td>
                                        <td>{value.address}</td>
                                        <td>{value.sex}</td>
                                        <td>{value.phone}</td>
                                        <td>{value.Group}</td>
                                        <div>
                                            <button
                                                className="btn btn-warning me-3"
                                                onClick={() => {
                                                    setTitleModalUser('Edit User');
                                                    handleOpenUser(value);
                                                }}
                                            >
                                                <i className="fa fa-pencil-square-o"></i>
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleOpenDeleteUser(value)}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={totalPage}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
            <ModalDelete
                show={showModelDeleteUser}
                dataUser={dataUser}
                handleClose={handleCloseDeleteUser}
                handleDelete={handleDelete}
            />
            <ModalUser
                show={showModelUser}
                title={titleModalUser}
                dataUser={dataUser}
                handleClose={handleCloseUser}
                handleCreate={handleConfirm}
                handleEdit={handleEditUser}
            />
        </>
    );
};
export default Users;
