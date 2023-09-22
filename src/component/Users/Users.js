import React, { useEffect, useState } from 'react';
import { allUser, deleteUser } from '../../service/userService'
import ReactPaginate from 'react-paginate';
import ModalDelete from './ModalDelete';
import { toast } from 'react-toastify';

const Users = () => {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalRow, setTotalRow] = useState(0);
    const [show, setShow] = useState(false);
    const [dataUser, setDataUser] = useState({});

    const handleRefesh = (e) => {
        setCurrentPage(+e.selected + 1)
    }

    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1)
    }

    const handleClose = () => {
        setDataUser({})
        setShow(false);
    }

    const handleOpen = (dataUser) => {
        setDataUser(dataUser)
        setShow(true);
    }

    const handleDelete = async () => {
        await deleteUser(dataUser.id);
        console.log(dataUser);
        toast.success(`Delete user: ${dataUser.email} success`);
        setShow(false);
        setTotalRow(totalRow-1);
    }

    useEffect(async () => {
        let data = await allUser(currentPage);
        setUsers(data.data.DT.users);
        setTotalPage(data.data.DT.totalPages);
        setTotalRow(data.data.DT.totalRows);
    }, [currentPage, totalRow])

    return (
        <>
            <div className='container'>
                <div className='mb-3'>
                    <h3>All Users</h3>
                    <button className='btn btn-success'
                    onClick={() => handleRefesh()}
                    >Refesh</button>
                    <button className='btn btn-primary'>Add new user</button>
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
                            {
                                users.map((value, index) => {
                                    return (
                                        <tr key={`row-${index}`}>
                                            <th scope="row">{value.id}</th>
                                            <td>{value.email}</td>
                                            <td>{value.username}</td>
                                            <td>{value.address}</td>
                                            <td>{value.sex === 1 ? "Male" : "Female"}</td>
                                            <td>{value.phone}</td>
                                            <td>{value.Group ? value.Group.name : ""}</td>
                                            <div>
                                                <button className='btn btn-warning'
                                                >Edit</button>
                                                <button className='btn btn-danger'
                                                onClick={() => handleOpen(value)}
                                                >Delete</button>
                                            </div>
                                        </tr>
                                    )
                                })
                            }
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
                show = {show}
                handleClose = {handleClose}
                handleDelete = {handleDelete}
                dataUser = {dataUser}
            />
        </>
    );
};
export default Users;