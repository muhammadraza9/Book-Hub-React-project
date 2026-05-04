// import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Navbar() {

    // const [, setUser] = useState("");
    const navigation = useNavigate();

    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem("currentUser"));
    //     setUser(user)
    // },[]);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        // localStorage.setItem("loggedIn", false);
        navigation("/login");

    }
    // console.log("currentUser")
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark " style={{ backgroundColor: "#0b4b40ff" }} >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Book-Hub</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link active" to="/">Home</Link>
                            <Link className="nav-link active" to="/aboutus">Abot Us</Link>
                            <Link className="nav-link active" to="/books">Books</Link>
                        </div>
                    </div>
                </div>
                <div>
                    {!localStorage.getItem("currentUser") ?
                        <form className="d-flex ">
                            <Link className="btn btn-success mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-success mx-1" to="/signup" role="button">SignUp</Link>
                        </form>
                        :
                        <button onClick={handleLogout} className="btn btn-success mx-1" >Logout</button>
                    }

                </div>
            </nav>
        </>
    );
};

export default Navbar
