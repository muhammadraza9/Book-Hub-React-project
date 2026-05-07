import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Books() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [books, setBooks] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (!stored) {
      navigate("/login");
      return;
    }
    const savedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    setBooks(savedBooks);
  }, [navigate]);

  const handleAddBook = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const newBook = {
      id: Date.now(),
      name,
      description,
      image: image ? URL.createObjectURL(image) : null,
      owner: currentUser ? currentUser.name : "Anonymous",
    };

    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));

    setName("");
    setDescription("");
    setImage(null);
  };

  const handleDelete = (id) => {
    const updatedBooks = books.filter((b) => b.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setDeleteId(null);
  };

  return (
    <div className="mt-4">
      <h2>Add Book</h2>

      <form onSubmit={handleAddBook}>
        <div className="mt-3">
          <label htmlFor="bookName" className="form-label">Book Name</label>
          <input
            id="bookName"
            className="form-control mb-2"
            placeholder="Book Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mt-3">
          <label htmlFor="bookDesc" className="form-label">Book Description</label>
          <textarea
            id="bookDesc"
            className="form-control mb-2"
            placeholder="Book Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mt-3">
          <label className="form-label">Book Cover Image</label>
          <div
            onClick={() => document.getElementById('bookImage').click()}
            style={{
              width: '100px',
              height: '100px',
              border: '2px dashed #ced4da',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f8f9fa',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ fontSize: '0.7rem', color: '#adb5bd', textAlign: 'center', padding: '6px' }}>
                📷<br />Choose
              </span>
            )}
          </div>
          <input
            id="bookImage"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-success mt-3">Add Book</button>
      </form>

      <hr />

      <h3>
        Book List{' '}
        <span className="badge bg-success" style={{ fontSize: '0.8rem' }}>{books.length}</span>
      </h3>

      {books.length === 0 && (
        <p className="text-muted">No books added yet.</p>
      )}

      <div className="row g-3 mt-1">
        {books.map((book) => (
          <div key={book.id} className="col-md-6">
            <div
              className="card p-3 h-100"
              style={{ boxShadow: "0 0 5px rgba(58, 126, 44, 0.3)" }}
            >
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1 me-2">
                  <strong>{book.name}</strong>
                  <p className="mb-1 mt-1">{book.description}</p>
                  <small className="text-muted">👤 {book.owner}</small><br />
                  <small className="text-muted">ID: {book.id}</small>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => setDeleteId(book.id)}
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirm Modal */}
      {deleteId && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Book</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setDeleteId(null)}
                  />
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this book? This cannot be undone.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(deleteId)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" onClick={() => setDeleteId(null)} />
        </>
      )}
    </div>
  );
}

export default Books;