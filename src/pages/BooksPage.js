import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Lab.css';

const books = [
  // Fiction
  { title: '1984', author: 'George Orwell', category: 'Fiction' },
  { title: 'There Is No Antimemetics Division', author: 'qntm', category: 'Fiction' },
  { title: 'Fahrenheit 451', author: 'Ray Bradbury', category: 'Fiction' },
  { title: 'Lolita', author: 'Vladimir Nabokov', category: 'Fiction' },
  { title: 'The Idiot', author: 'Fyodor Dostoevsky', category: 'Fiction' },
  { title: 'The Trial', author: 'Franz Kafka', category: 'Fiction' },
  { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', category: 'Fiction' },

  // Philosophy
  { title: 'Consciousness Explained', author: 'Daniel C. Dennett', category: 'Philosophy' },
  { title: 'Gödel, Escher, Bach', author: 'Douglas Hofstadter', category: 'Philosophy' },
  { title: 'Existentialism is a Humanism', author: 'Jean-Paul Sartre', category: 'Philosophy' },
  { title: 'Communist Manifesto', author: 'Karl Marx', category: 'Philosophy' },

  // Non-Fiction
  { title: 'Debt: The First 5,000 Years', author: 'David Graeber', category: 'Non-Fiction' },
  { title: 'Design as Art', author: 'Bruno Munari', category: 'Non-Fiction' },
  { title: 'The Visual Display of Quantitative Information', author: 'Edward R. Tufte', category: 'Non-Fiction' },

  // Technology
  { title: 'Chip War', author: 'Chris Miller', category: 'Technology' },
  { title: 'Fundamentals of Materials Science and Engineering', author: 'William D. Callister', category: 'Technology' },
  { title: 'Fundamentals of Aerodynamics', author: 'John D. Anderson', category: 'Technology' },
  { title: 'Silicon Photonics Design', author: 'Lukas Chrostowski', category: 'Technology' },

  // Electronics
  { title: 'The Art of Electronics', author: 'Paul Horowitz', category: 'Electronics' },

  // Biology
  { title: 'The Selfish Gene', author: 'Richard Dawkins', category: 'Biology' },
  { title: 'The Origin of Species', author: 'Charles Darwin', category: 'Biology' },
  { title: 'Molecular Biology of the Cell', author: 'Bruce Alberts', category: 'Biology' },

  // Programming
  { title: 'A Computational Logic', author: 'Robert S. Boyer', category: 'Programming' },
  { title: 'Algorithms in C', author: 'Robert Sedgewick', category: 'Programming' },
  { title: 'ARM Bare Metal', author: 'Daniel Umanoskis', category: 'Programming' },
  { title: 'C Programming Language', author: 'Kernighan & Ritchie', category: 'Programming' },
  { title: 'Computer Systems: A Programmer\'s Perspective', author: 'Bryant & O\'Hallaron', category: 'Programming' },
  { title: 'CUDA C Programming Guide', author: 'NVIDIA', category: 'Programming' },
  { title: 'Data Structures and Algorithms in C++', author: 'Mark Allen Weiss', category: 'Programming' },
  { title: 'Programming Massively Parallel Processors', author: 'Kirk & Hwu', category: 'Programming' },

  // Manufacturing
  { title: 'Structures: Or Why Things Don\'t Fall Down', author: 'J.E. Gordon', category: 'Manufacturing' },
  { title: 'The Toyota Way', author: 'Jeffrey Liker', category: 'Manufacturing' },
  { title: 'The Design of Everyday Things', author: 'Don Norman', category: 'Manufacturing' },

  // Robotics
  { title: 'Introduction to Robotics', author: 'John J. Craig', category: 'Robotics' },
  { title: 'NASA Systems Engineering Handbook', author: 'NASA', category: 'Robotics' },

  // Software
  { title: 'Blitzscaling', author: 'Reid Hoffman', category: 'Software' },
  { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', category: 'Software' },
  { title: 'The Mythical Man-Month', author: 'Frederick Brooks', category: 'Software' },
];

const BooksPage = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(books.map(b => b.category))].sort();
  const filtered = filter === 'All' ? books : books.filter(b => b.category === filter);

  // Group by category
  const grouped = filtered.reduce((acc, book) => {
    if (!acc[book.category]) acc[book.category] = [];
    acc[book.category].push(book);
    return acc;
  }, {});

  return (
    <main className="lab-page">
      <header className="lab-header">
        <Link to="/" className="lab-back-link">← Back</Link>
        <h1 className="lab-header-name">Books</h1>
        <p className="lab-header-definition">Reference material. No rankings.</p>
      </header>

      <section className="lab-section">
        <div className="lab-filter">
          <label htmlFor="category">Filter: </label>
          <select
            id="category"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="lab-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </section>

      {Object.entries(grouped).sort().map(([category, categoryBooks]) => (
        <section key={category} className="lab-section">
          <h2 className="lab-section-title">{category}</h2>
          <ul className="lab-books-list">
            {categoryBooks.map((book, idx) => (
              <li key={idx} className="lab-book-item">
                <span className="lab-book-title">{book.title}</span>
                <span className="lab-book-author">{book.author}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
};

export default BooksPage;
