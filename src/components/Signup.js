import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup({ showAlert }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) navigate("/");
  }, [navigate]);

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showAlert("Passwords do not match.", "danger");
      return;
    }

    if (password.length < 4) {
      showAlert("Password must be at least 4 characters.", "warning");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u) => u.email === email);

    if (exists) {
      showAlert("An account with this email already exists.", "danger");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ name, email }));

    showAlert(`Account created! Welcome, ${name}!`, "success");
    navigate("/");
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h3 className="card-title mb-1">Create Account</h3>
            <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
              Join Book Hub and start sharing books.
            </p>

            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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
                  placeholder="Min. 4 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-success w-100 mt-2">
                Sign Up
              </button>
            </form>

            <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: '0.875rem' }}>
              Already have an account?{' '}
              <Link to="/login" className="text-success">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;