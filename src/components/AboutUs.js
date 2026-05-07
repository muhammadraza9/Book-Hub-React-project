import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const coverUrl = (isbn) => `https://books.google.com/books/content?vid=ISBN${isbn}&printsec=frontcover&img=1&zoom=1`;

const SEED_BOOKS = [
  {
    id: 1,
    name: "The Women",
    author: "Kristin Hannah",
    genre: "Historical Fiction",
    year: 2025,
    image: coverUrl("9781250178633"),
    description: "An intimate portrait of coming of age in a dangerous time and an epic tale of a nation divided. When twenty-year-old nursing student Frankie McGrath follows her brother to serve in Vietnam, she discovers that women can be heroes too — but coming home may be the hardest battle of all.",
    owner: "Book Hub",
  },
  {
    id: 2,
    name: "Funny Story",
    author: "Emily Henry",
    genre: "Romance",
    year: 2025,
    image: coverUrl("9780593441282"),
    description: "Daphne and Miles have nothing in common except the people who broke their hearts. When their exes fall for each other, they find themselves unlikely roommates — and maybe something more. A shimmering, joyful novel about opposites with the wrong thing in common.",
    owner: "Book Hub",
  },
  {
    id: 3,
    name: "Circe",
    author: "Madeline Miller",
    genre: "Fantasy / Mythology",
    year: 2025,
    image: coverUrl("9780316556347"),
    description: "A bold retelling of the goddess's story from The Odyssey. In the house of Helios, a daughter is born with a strange power — witchcraft. Exiled to a deserted island, Circe hones her craft and crosses paths with famous figures of myth, but finds her greatest challenge is an ordinary woman's love.",
    owner: "Book Hub",
  },
  {
    id: 4,
    name: "The Housemaid",
    author: "Freida McFadden",
    genre: "Thriller",
    year: 2025,
    image: coverUrl("9781538742570"),
    description: "Every day I clean the Winchesters' beautiful house. I try to ignore how Nina makes a mess just to watch me clean it up. And how her husband seems more broken every day. But something is very wrong in this house — and I am about to find out what.",
    owner: "Book Hub",
  },
  {
    id: 5,
    name: "Mistborn: The Final Empire",
    author: "Brandon Sanderson",
    genre: "Fantasy",
    year: 2025,
    image: coverUrl("9780765311788"),
    description: "In a world where ash falls from the sky and mists dominate the night, a young street thief named Vin joins a crew of rebels planning the impossible — to overthrow the immortal Lord Ruler. A heist story with epic fantasy world-building and political intrigue.",
    owner: "Book Hub",
  },
  {
    id: 6,
    name: "The Vanishing Half",
    author: "Brit Bennett",
    genre: "Literary Fiction",
    year: 2025,
    image: coverUrl("9780525536291"),
    description: "The Vignes twin sisters will always be identical. But after growing up together in a small Black Southern town, both ran away — one back to their roots, one to a completely different world. A story about identity, family, and the lives we choose to live.",
    owner: "Book Hub",
  },
];

function AboutUs() {
  const [currentUser, setCurrentUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setCurrentUser(JSON.parse(stored));

    const existing = JSON.parse(localStorage.getItem("books") || "[]");

    // Force re-seed if any Book Hub entry has outdated year or none exist
    const seedsOutdated = existing
      .filter((b) => b.owner === "Book Hub")
      .some((b) => b.year !== 2025 || (b.image && b.image.includes("openlibrary")));
    const notSeeded = !existing.some((b) => b.owner === "Book Hub");

    if (notSeeded || seedsOutdated) {
      const userBooks = existing.filter((b) => b.owner !== "Book Hub");
      const merged = [...SEED_BOOKS, ...userBooks];
      localStorage.setItem("books", JSON.stringify(merged));
      setBooks(merged);
    } else {
      setBooks(existing);
    }
  }, []);

  function handleBookClick(book) {
    if (!currentUser) {
      setShowLoginPrompt(true);
    } else {
      setSelectedBook(book);
    }
  }

  return (
    <div className="mt-4">
      <div className="p-4 mb-4 border-start border-success border-4 bg-light rounded">
        <h2 className="mb-1">About Book Hub</h2>
        <p className="text-muted mb-0">
          Book Hub is a community-driven reading platform where members add and share their favourite books.
          Browse the collection below — login to view full details of each book.
        </p>
      </div>

      {!currentUser && (
        <div className="alert alert-warning d-flex align-items-center justify-content-between" role="alert">
          <span>💡 <strong>Login</strong> to view full book details.</span>
          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-sm btn-success">Login</Link>
            <Link to="/signup" className="btn btn-sm btn-outline-secondary">Sign Up</Link>
          </div>
        </div>
      )}

      <h4 className="mb-3">
        Community Books{' '}
        <span className="badge bg-success" style={{ fontSize: '0.75rem' }}>{books.length}</span>
      </h4>

      {books.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <p style={{ fontSize: '2rem' }}>📭</p>
          <p>No books added yet. <Link to="/books" className="text-success">Add some!</Link></p>
        </div>
      ) : (
        <div className="row g-3">
          {books.map((book) => (
            <div key={book.id} className="col-md-4 col-sm-6">
              <div
                className="card h-100"
                style={{ cursor: 'pointer', boxShadow: "0 0 5px rgba(58, 126, 44, 0.3)", transition: 'transform 0.15s' }}
                onClick={() => handleBookClick(book)}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {book.image ? (
                  <img src={book.image} alt={book.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: '100px', background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                    📖
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-1">{book.name}</h5>
                  <div className="mb-2">
                    {book.author && <small className="text-muted me-2">✍️ {book.author}</small>}
                    {book.genre && (
                      <span className="badge bg-success bg-opacity-10 text-success" style={{ fontSize: '0.7rem' }}>
                        {book.genre}
                      </span>
                    )}
                  </div>
                  <p className="card-text text-muted flex-grow-1" style={{ fontSize: '0.875rem' }}>
                    {book.description.length > 80 ? book.description.slice(0, 80) + '…' : book.description}
                  </p>
                  <div className="mt-2">
                    <small className="text-success">👤 {book.owner}</small>
                    {book.year && <small className="text-muted ms-2">· {book.year}</small>}
                  </div>
                  <button className="btn btn-sm btn-outline-success mt-3 w-100">
                    {currentUser ? 'View Details' : '🔒 Login to View'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBook && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">📖 {selectedBook.name}</h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedBook(null)} />
                </div>
                <div className="modal-body">
                  {selectedBook.image && (
                    <img src={selectedBook.image} alt={selectedBook.name} className="rounded mb-3" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
                  )}
                  {(selectedBook.author || selectedBook.genre || selectedBook.year) && (
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {selectedBook.author && <span className="badge bg-secondary">✍️ {selectedBook.author}</span>}
                      {selectedBook.genre && <span className="badge bg-success">{selectedBook.genre}</span>}
                      {selectedBook.year && <span className="badge bg-light text-dark border">{selectedBook.year}</span>}
                    </div>
                  )}
                  <p>{selectedBook.description}</p>
                  <hr />
                  <p className="mb-1"><strong>Added by:</strong> <span className="text-success">{selectedBook.owner}</span></p>
                  <p className="text-muted mb-0" style={{ fontSize: '0.78rem' }}>Book ID: {selectedBook.id}</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setSelectedBook(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" onClick={() => setSelectedBook(null)} />
        </>
      )}

      {showLoginPrompt && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Login Required</h5>
                  <button type="button" className="btn-close" onClick={() => setShowLoginPrompt(false)} />
                </div>
                <div className="modal-body">
                  <p>You need to be logged in to view full book details.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowLoginPrompt(false)}>Cancel</button>
                  <Link to="/login" className="btn btn-success">Go to Login</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" onClick={() => setShowLoginPrompt(false)} />
        </>
      )}
    </div>
  );
}

export default AboutUs;