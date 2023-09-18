import React, { useEffect, useState } from 'react';
import { allUser } from '../../service/userService'
import ReactPaginate from 'react-paginate';

const Users = () => {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1)
    }
    useEffect(async () => {
        let data = await allUser(currentPage);
        console.log(data);
        setUsers(data.data.DT.users);
        setTotalPage(data.data.DT.totalPages);
    }, [currentPage])
    return (
        <>
            <div className='container'>
                <div className='mb-3'>
                    <h3>All Users</h3>
                    <button className='btn btn-success'>Refesh</button>
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
                                users.map((value) => {
                                    return (
                                        <tr>
                                            <th scope="row">{value.id}</th>
                                            <td>{value.email}</td>
                                            <td>{value.username}</td>
                                            <td>{value.address}</td>
                                            <td>{value.sex === 1 ? "Male" : "Female"}</td>
                                            <td>{value.phone}</td>
                                            <td>{value.Group ? value.Group.name : ""}</td>
                                            <div>
                                                <button className='btn btn-warning'>Edit</button>
                                                <button className='btn btn-danger'>Delete</button>
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
        </>

    );
};
export default Users;