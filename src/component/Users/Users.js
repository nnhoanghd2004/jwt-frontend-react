import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ModalDelete from './ModalDelete';
import { toast } from 'react-toastify';

import ModalUser from './ModalUser';
import { allUser, deleteUser, createUser, getGroup } from '../../service/userService';

const Users = () => {
    const defaultDataUser = {
        email: '',
        password: '',
        username: '',
        address: '',
        phone: '',
        sex: '',
        group: '',
    };
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalRow, setTotalRow] = useState(0);
    const [showModelDeleteUser, setShowModelDeleteUser] = useState(false);
    const [showModelUser, setShowModelUser] = useState(false);
    const [dataUser, setDataUser] = useState({});
    const [titleModalUser, setTitleModalUser] = useState('');
    const [groups, setGroups] = useState([]);

    const handleRefesh = (e) => {
        setCurrentPage(+e.selected + 1);
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
        setShowModelUser(false);
        setDataUser({});
    };
    const handleOpenUser = (dataUser) => {
        // console.log(dataUser);
        getAllGroup();
        setDataUser(dataUser);
        setShowModelUser(true);
    };
    const handleCreateNewUser = async (email, password, username, address, phone, sex, group) => {
        // console.log(email, password, username, address, phone, sex, group);
        let data = await createUser(email, password, username, address, phone, sex, group);
        console.log(data);
        if (data && data.data && +data.data.EC === 0) {
            toast.success(data.data.EM);
        } else {
            toast.error(data.data.EM);
        }
        setShowModelUser(false);
        setTotalRow(totalRow - 1);
    };

    const getAllGroup = async () => {
        let data = await getGroup();
        setGroups(data.data.DT);
    };

    useEffect(() => {
        async function fetchData() {
            console.log('count');
            let data = await allUser(currentPage);
            setUsers(data.data.DT.users);
            setTotalPage(data.data.DT.totalPages);
            setTotalRow(data.data.DT.totalRows);
        }
        fetchData();
    }, [currentPage, totalRow]);

    return (
        <>
            <div className="container">
                <div className="mb-3">
                    <h3>All Users</h3>
                    <button className="btn btn-success" onClick={() => handleRefesh()}>
                        Refesh
                    </button>
                    <button
                        className="btn btn-primary mx-3"
                        onClick={() => {
                            setTitleModalUser('Create New User');
                            handleOpenUser(defaultDataUser);
                        }}
                    >
                        Add new user
                    </button>
                </div>
                <div>
                    <table className="table table-hover table-bordered rounded overflow-hidden">
                        <thead>
                            <tr>
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
                                        <th scope="row">{value.id}</th>
                                        <td>{value.email}</td>
                                        <td>{value.username}</td>
                                        <td>{value.address}</td>
                                        <td>{value.sex}</td>
                                        <td>{value.phone}</td>
                                        <td>{value.Group ? value.Group.name : ''}</td>
                                        <div>
                                            <button
                                                className="btn btn-warning mx-3"
                                                onClick={() => {
                                                    setTitleModalUser('Edit User');
                                                    handleOpenUser(value);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleOpenDeleteUser(value)}
                                            >
                                                Delete
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
                handleClose={handleCloseDeleteUser}
                handleDelete={handleDelete}
                dataUser={dataUser}
            />
            <ModalUser
                show={showModelUser}
                handleClose={handleCloseUser}
                handleCreate={handleCreateNewUser}
                title={titleModalUser}
                dataUser={dataUser}
                allGroup={groups}
            />
        </>
    );
};
export default Users;
