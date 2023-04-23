import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const UserList = () => {
    const [users, SetUsers] = useState([]);
    const [page, SetPage] = useState(0);
    const [limit, SetLimit] = useState(10);
    const [pages, SetPages] = useState(0);
    const [rows, SetRows] = useState(0);
    const [keyword, SetKeyword] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        getUsers();
    }, [page, keyword]);

    const getUsers = async () => {
        const response = await axios.get(
            `http://localhost:5000/users?search_query=${keyword}&page=${page}&limit${limit}`
        );
        SetUsers(response.data.result);
        SetPage(response.data.page);
        SetPages(response.data.totalPage);
        SetRows(response.data.totalRows);
    };

    const changePage = ({ selected }) => {
        SetPage(selected);
    };

    const searchData = (e) => {
        e.preventDefault();
        SetPage(0);
        SetKeyword(query);
    };
    return (
        <div className="container mt-5">
            <div className="columns">
                <div className="column is-centered">
                    <form onSubmit={searchData}>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Find something here..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            <div className="control">
                                <button
                                    type="submit"
                                    className="button is-info"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                    <table className="table is-striped is-bordered is-fullwidth mt-2">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>
                        Total Rows: {rows} Page: {rows ? page + 1 : 0} of{" "}
                        {pages}
                    </p>
                    <nav
                        className="pagination is-centered"
                        key={rows}
                        role="navigation"
                        aria-label="pagination"
                    >
                        <ReactPaginate
                            previousLabel={"< Prev"}
                            nextLabel={"Next >"}
                            pageCount={pages}
                            onPageChange={changePage}
                            containerClassName={"pagination-list"}
                            pageLinkClassName={"pagination-link"}
                            previousLinkClassName={"pagination-previous"}
                            nextLinkClassName={"pagination-next"}
                            activeLinkClassName={"pagination-link is-current"}
                            disabledLinkClassName={
                                "pagination-link is-disabled"
                            }
                        />
                    </nav>
                </div> 
            </div>
        </div>  
    );
};
 
export default UserList;
