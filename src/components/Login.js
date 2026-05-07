import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ showAlert }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) navigate("/");
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Get registered users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      showAlert("Invalid email or password.", "danger");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify({ name: found.name, email: found.email }));
    showAlert(`Welcome back, ${found.name}!`, "success");
    navigate("/");
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h3 className="card-title mb-1">Login</h3>
            <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
              Welcome back to Book Hub.
            </p>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-success w-100 mt-2">
                Login
              </button>
            </form>

            <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: '0.875rem' }}>
              Don't have an account?{' '}
              <Link to="/signup" className="text-success">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;