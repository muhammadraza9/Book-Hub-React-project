import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Home() {
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (!stored) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(stored));

    }
  }, [navigate]);

  if (!currentUser) return null;

  return (
    <div className="mt-4">
      {/* Welcome banner */}
      <div className="p-4 mb-4 bg-dark text-white rounded-3">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div
            className="rounded-circle bg-success d-flex align-items-center justify-content-center text-white fw-bold"
            style={{ width: 56, height: 56, fontSize: '1.4rem', flexShrink: 0 }}
          >
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="mb-0">Welcome back, <span className="text-success">{currentUser.name}</span>!</h2>
            <p className="mb-0 text-secondary" style={{ fontSize: '0.9rem' }}>{currentUser.email}</p>
          </div>
        </div>
        <p className="mb-3 text-secondary">Explore and manage your book collection from here.</p>
        <div className="d-flex gap-2 flex-wrap">
          <Link to="/books" className="btn btn-success">Manage Books</Link>
          <Link to="/aboutus" className="btn btn-outline-light">Browse Collection</Link>
        </div>
      </div>

      {/* Books box */}
      <div
        className="card"
        style={{ cursor: 'pointer', boxShadow: '0 0 5px rgba(58,126,44,0.3)', width: '220px', minHeight: '160px' }}
        onClick={() => navigate('/aboutus')}
      >
        <div className="card-body">
          <h5 className="card-title">📚 Browse Collection</h5>
          <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
            Explore all books added by the community on the About Us page.
          </p>
          <span className="btn btn-sm btn-outline-secondary">Browse</span>
        </div>
      </div>
    </div>
  );
}

export default Home;