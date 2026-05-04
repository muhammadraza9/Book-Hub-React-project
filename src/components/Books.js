import React, { useEffect } from 'react';
import { useState } from 'react';

function Books() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [books, setBooks] = useState([]);


  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    setBooks(savedBooks);
  }, []);

  const handleAddBook = (e) => {
    e.preventDefault();

    const newBook = {
      id: Date.now(),
      name,
      description
    };

    const UpdateBook = [...books, newBook]
    setBooks(UpdateBook);
    localStorage.setItem("books", JSON.stringify(UpdateBook));

    setName("");
    setDescription("");
  };

  return (
    <div className="container mt-3">
      <h2> Add Book </h2>

      <form onSubmit={handleAddBook}>

        <div className="mt-3">
          <label htmlFor="name" className="form-label"> Book Name</label>
          <input className='form-control mb-2' placeholder='Book Name' value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="mt-3">
          <label htmlFor="name" className="form-label">Book Description</label>
          <textarea className='form-control mb-2' placeholder='Book Description' value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <button type='submit' className='btn btn-success'>Add Book</button>

      </form>

      <hr />

      <h3> Book List </h3>

      {books.length === 0 && <p> No Books Added</p>}

      {books.map((book) => (
        <div key={book.id} className="card p-3" style={{ padding: "10px 0" ,  boxShadow: "0 0 5px rgba(58, 126, 44, 0.3)" }}>
          <strong>{book.name}</strong>
          <p>{book.description}</p>
          <small> ID : {book.id}</small>
        </div>
      ))}


    </div>
  )

}

export default Books
