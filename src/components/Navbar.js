import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setCurrentUser(JSON.parse(stored));
    else setCurrentUser(null);
  }, [location]); // re-check on every route change

  function handleLogout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  }

  const isActive = (path) =>
    location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">📚 Book Hub</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={isActive('/')} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={isActive('/books')} to="/books">Books</Link>
            </li>
            <li className="nav-item">
              <Link className={isActive('/aboutus')} to="/aboutus">About Us</Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            {currentUser ? (
              <>
                <li className="nav-item d-flex align-items-center me-2">
                  <span className="navbar-text text-light">
                    👤 <strong>{currentUser.name}</strong>
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link className={isActive('/login')} to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-success btn-sm" to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;