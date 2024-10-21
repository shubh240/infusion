import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../index.css';
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Pagination from "../Pagination"
import useDebounce from "../../hooks/useDebounce";
import SearchAndExport from "../SearchAndExport";
import { getStartUpDetails } from "../../store/slice/startUpListSlice";
import { SEARCH_DELAY } from "../../app.config";
import { setLoader } from "../../store/slice/masterSlice";
import Swal from 'sweetalert2';
import * as API from '../../utils/api.service';

const Dashboard = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const debounce = useDebounce(search, SEARCH_DELAY);
    const { StartUpList: { data: StartUpList } } = useSelector((state) => state.startUp);
    console.log('StartUpList :', StartUpList);
    const handlePageChange = (newPage) => { setPage(newPage) };
    const [showModal, setShowModal] = useState(false);
    const [selectedStartUp, setSelectedStartUp] = useState(null);
    const [isViewMode, setIsViewMode] = useState(false);

    const handleStartUpAPI = () => {
        dispatch(setLoader(true));
        let submitData = {
            search: debounce,
            page: page
        }
        dispatch(getStartUpDetails(submitData));
        dispatch(setLoader(false));
    };

    const startUpListData = useMemo(() => {
        return StartUpList?.map((item, index) => (
            <tr key={index}>
                <td>{item?.id}</td>
                <td>{item?.title}</td>
                <td>{item?.author}</td>
                <td>{item?.created_at}</td>
                <td>
                    <a
                        className="text-primary fs-5 mx-2 cursor_pointer action-icon"
                        onClick={() => navigate('/view-post', { state: item })}
                    >
                        <i className="ri-eye-line"></i>
                    </a>

                    <a
                        className="text-warning fs-5 mx-2 cursor_pointer action-icon"
                        onClick={() => navigate('/edit-post', { state: item })}
                    >
                        <i className="ri-edit-line"></i>
                    </a>

                </td>
            </tr>
        ));
    }, [StartUpList]);

    useEffect(() => {
        handleStartUpAPI();
    }, [page, debounce]);

    return (
        <main className="page_wrepper">
            <div className="content">
                <div className="container-fluid">
                    <div className="card rounded-3">
                        <div className="card-body">
                            <div className="rounded-3 mb-3">
                                <SearchAndExport searchFieldName="Start up name , Founder name ..." setSearch={setSearch} setShowModal={setShowModal} setSelectedStartUp={setSelectedStartUp} setIsViewMode={setIsViewMode} />
                            </div>
                            <div className="responsive-table-plugin">
                                <div className="table-rep-plugin">
                                    <div className="table-responsive mb-3" data-pattern="priority-columns">
                                        {StartUpList?.length > 0 ? (
                                            <table className="table table-hover table-centered mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Title</th>
                                                        <th>Author</th>
                                                        <th>Incorporation Date</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {startUpListData}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p className="text-center">No Data Found</p>
                                        )}
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}

export default Dashboard;
