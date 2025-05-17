import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch, FaCheck, FaCheckCircle } from 'react-icons/fa';
import defaultavatar from "../assets/uploads/defaultavatar.jpg"
import { baseUrl } from '../utils/globalurl';
import alumniMH from "../assets/uploads/alumniMH.jpg";
import { useAuth } from '../AuthContext'; 
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const AlumniList = () => {
    const { isLoggedIn, isAdmin , isAlumnus, isStudent} = useAuth();
    const navigate = useNavigate();
    const [alumniList, setAlumniList] = useState([]);
    const [filteredAlumni, setFilteredAlumnni] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (isLoggedIn && isAdmin || isAlumnus) {
            axios.get(`${baseUrl}auth/alumni_list`)
                .then((res) => {
                    setAlumniList(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [isLoggedIn, isAdmin]);

    useEffect(() => {
        if (alumniList.length > 0) {
            const filteredlist = alumniList.filter(list =>
                list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                list.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                list.batch.toString().includes(searchQuery)
            );
            setFilteredAlumnni(filteredlist);
        }
    }, [searchQuery, alumniList]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // ✅ Restrict access if not logged in
    const hasPrompted = useRef(false);

    useEffect(() => {
        if (!isLoggedIn && !hasPrompted.current) {
            hasPrompted.current = true;
            const confirmLogin = window.confirm("Please login first to access this page.");
            if (confirmLogin) {
                navigate('/login');
            } else {
                navigate('/');
            }
        }
    }, [isLoggedIn, navigate]);

    // // ✅ Restrict access if the user is an admin
    // if (isAdmin) {
    //     return (
    //         <div className="container text-center mt-5">
    //             <h3>Admins are not allowed to access this page.</h3>
    //         </div>
    //     );
    // }
    return (
        <>
            <header className="masthead" style={{ backgroundImage: `url(${alumniMH})` }}>
                <div className="container-fluid h-100">
                    <div className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end mb-4 page-title">
                            <h3 className="text-white">Alumni List</h3>
                            <hr className="divider my-4" />
                        </div>
                    </div>
                </div>
            </header>
            {alumniList.length > 0 && <div className="container mt-4">
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="filter-field">
                                            <FaSearch />
                                        </span>
                                    </div>
                                    <input
                                        value={searchQuery} onChange={handleSearchInputChange}
                                        type="text"
                                        className="form-control"
                                        id="filter"
                                        placeholder="Filter name, course, batch"
                                        aria-label="Filter"
                                        aria-describedby="filter-field"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-primary btn-block" id="search">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            <div className="container-fluid mt-3 pt-2">
                {filteredAlumni.length > 0 ? <>
                    <div className="row">
                        {filteredAlumni.map((a, index) => (
                            <div className="alu-card" key={index}>
                                <div className="card h-100 shadow-sm">
                                <center>
                                  <img
                                    src={a.avatar ? `${baseUrl}${a.avatar}` : defaultavatar}
                                    className="alu-img"
                                    alt="avatar"
                                  />
                                </center>

                                    <div className="card-body">
                                        <h5 className="card-title text-center pad-zero ">{a.name.replace(/\b\w/g, char => char.toUpperCase())} <small>
                                            <i className={`badge badge-primary ${a.status === 1 ? '' : 'd-none'}`}>
                                                <FaCheckCircle></FaCheckCircle>Verified
                                            </i>
                                            <i className={`badge badge-warning ${a.status === 0 ? '' : 'd-none'}`}>
                                                Unverified
                                            </i>
                                        </small></h5>

                                        <p className="card-text">
                                            <strong>Email:</strong> {a.email}
                                        </p>
                                        {a.course && <p className="card-text">
                                            <strong>Course:</strong> {a.course}
                                        </p>}
                                        {a.batch != "0000" && <p className="card-text">
                                            <strong>Batch:</strong> {a.batch}
                                        </p>}
                                        {a.connected_to && <p className="card-text">
                                            <strong>Currently working in/as:</strong> {a.connected_to}
                                        </p>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </> : <>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <p >{searchQuery}</p>
                        <h4 className='text-info-emphasis'>No Data Available</h4>
                    </div>
                </>}
            </div>
        </>
    );
};

export default AlumniList;
