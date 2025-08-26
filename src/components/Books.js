import React, { useState } from 'react';
import '../styles/Books.css'; // Import the CSS file for styling

const Books = () => {
  const bookList = [
    // Fiction
    {
      title: '1984',
      author: 'George Orwell',
      cover: '/assets/bookCovers/1984.jpg',
      category: 'Fiction',
    },
    {
      title: 'There Is No Antimemetics Division',
      author: 'qntm',
      cover: '/assets/bookCovers/antimemetics.jpg',
      category: 'Fiction',
    },
    {
      title: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      cover: '/assets/bookCovers/fehrenheit451.jpg',
      category: 'Fiction',
    },
    {
      title: 'Lolita',
      author: 'Vladimir Nabokov',
      cover: '/assets/bookCovers/lolita.jpg',
      category: 'Fiction',
    },
    {
      title: 'The Idiot',
      author: 'Fyodor Dostoevsky',
      cover: '/assets/bookCovers/the idiot.jpg',
      category: 'Fiction',
    },
    {
      title: 'The Trial',
      author: 'Franz Kafka',
      cover: '/assets/bookCovers/thetrial.jpg',
      category: 'Fiction',
    },
    {
      title: 'Crime and Punishment',
      author: 'Fyodor Dostoevsky',
      cover: '/assets/bookCovers/cnp.jpg',
      category: 'Fiction',
    },

    // Philosophy
    {
      title: 'Consciousness Explained',
      author: 'Daniel C. Dennett',
      cover: '/assets/bookCoovers/consciousnessexplained.jpg',
      category: 'Philosophy',
    },
    {
      title: 'Gödel, Escher, Bach',
      author: 'Douglas Hofstadter',
      cover: '/assets/bookCovers/godel, escher, bach.jpg',
      category: 'Philosophy',
    },
    {
      title: 'Existentialism is a Humanism',
      author: 'Jean-Paul Sartre',
      cover: '/assets/bookCovers/exist.jpg',
      category: 'Philosophy',
    },
    {
      title: 'Communist Manifesto',
      author: 'Karl Marx',
      cover: '/assets/bookCovers/communistmanifesto.jpg',
      category: 'Philosophy',
    },

    // Non-Fiction
    {
      title: 'Debt: The First 5,000 Years',
      author: 'David Graeber',
      cover: '/assets/bookCovers/debt.jpg',
      category: 'Non-Fiction',
    },
    {
      title: 'Design as Art',
      author: 'Bruno Munari',
      cover: '/assets/bookCovers/designAsArt.jpg',
      category: 'Non-Fiction',
    },
    {
      title: 'Something to do with paying attention',
      author: 'David Foster Wallace',
      cover: '/assets/bookCovers/Stdwa.jpg',
      category: 'Non-Fiction',
    },
    // Technology
    {
      title: "Chip War: The Fight for the World's Most Critical Technology",
      author: 'Chris Miller',
      cover: '/assets/bookCovers/chipwar.png',
      category: 'Technology',
    },
    {
      title: 'Fundamentals of Materials Science and Engineering',
      author: 'William D. Callister',
      cover: '/assets/bookCovers/materialscience.png',
      category: 'Technology',
    },
    {
      title: 'Fundamentals of Aerodynamics (6th Edition)',
      author: 'John D. Anderson',
      cover: '/assets/bookCovers/aero.png',
      category: 'Technology',
    },
    {
      title: 'The Visual Display of Quantitative Information, 2nd Ed.',
      author: 'Edward R. Tufte',
      cover: '/assets/bookCovers/vdqi.jpg',
      category: 'Non-Fiction',
    },
    {
      title: 'Silicon Photonics Design',
      author: 'Lukas Chrostowski & Micheal Hochberg',
      cover: '/assets/bookCovers/fstp.png',
      category: 'Technology',
    },
    // Electronics
    {
      title: 'The Art of Electronics',
      author: 'Paul Horowitz, Winfield Hill',
      cover: '/assets/bookCovers/electronics.png',
      category: 'Electronics',
    },

    // Biology
    {
      title: 'The Selfish Gene',
      author: 'Richard Dawkins',
      cover: '/assets/bookCovers/selfishgene.jpeg',
      category: 'Biology',
    },
    {
      title: 'The Origin of Species',
      author: 'Charles Darwin',
      cover: '/assets/bookCovers/originofspecies.jpg',
      category: 'Biology',
    },
    {
      title: 'Molecular Biology of the Cell',
      author: 'Bruce Alberts et al.',
      cover: '/assets/bookCovers/thecell.jpg',
      category: 'Biology',
    },

    // Programming
    {
      title: 'A Computational Logic',
      author: 'Robert S. Boyer, J. Strother Moore',
      cover: '/assets/bookCovers/comlogic.png',
      category: 'Programming',
    },
    {
      title: 'Algorithms in C',
      author: 'Robert Sedgewick',
      cover: '/assets/bookCovers/algoc.png',
      category: 'Programming',
    },
    {
      title: 'ARM Bare Metal',
      author: 'Daniel Umanoskis',
      cover: '/assets/bookCovers/baremetal.png',
      category: 'Programming',
    },
    {
      title: 'C Programming Language (2nd Edition)',
      author: 'Kernighan & Ritchie',
      cover: '/assets/bookCovers/C.png',
      category: 'Programming',
    },
    {
      title: 'CSAPP 2016',
      author: '',
      cover: '/assets/bookCovers/cpro.png',
      category: 'Programming',
    },
    {
      title: 'CUDA C Programming Guide',
      author: '',
      cover: '/assets/bookCovers/cuda.png',
      category: 'Programming',
    },
    {
      title: 'Data Structures and Algorithms in C++',
      author: 'Mark Allen Weiss',
      cover: '/assets/bookCovers/dsacpp.png',
      category: 'Programming',
    },
    {
      title: 'Mathematics for 3D Game Programming and Computer Graphics',
      author: 'Eric Lengyel',
      cover: '/assets/bookCovers/mathgame.png',
      category: 'Programming',
    },
    {
      title: 'Programming Massively Parallel Processors',
      author: 'John L. Gustafson',
      cover: '/assets/bookCovers/pmpp.png',
      category: 'Programming',
    },

    // Manufacturing
    {
      title: "Structures: Or Why Things Don't Fall Down",
      author: 'J.E. Gordon',
      cover: '/assets/bookCovers/structures.png',
      category: 'Manufacturing',
    },
    {
      title: 'The Toyota Way',
      author: 'Jeffrey Liker',
      cover: '/assets/bookCovers/toyota.png',
      category: 'Manufacturing',
    },
    {
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      cover: '/assets/bookCovers/design.jpg',
      category: 'Manufacturing',
    },
    // Robotics
    {
      title: 'Introduction to Robotics (3rd Edition)',
      author: 'John J. Craig',
      cover: '/assets/bookCovers/robotics.png',
      category: 'Robotics',
    },
    {
      title: 'NASA Systems Engineering Handbook',
      author: 'Michael S. Malone',
      cover: '/assets/bookCovers/nasaeng.png',
      category: 'Robotics',
    },

    // Software
    {
      title: 'Blitzscaling',
      author: 'Reid Hoffman, Chris Yeh',
      cover: '/assets/bookCovers/blitz.png',
      category: 'Software',
    },
    {
      title: 'Designing Data-Intensive Applications',
      author: '',
      cover: '/assets/bookCovers/ddia.png',
      category: 'Software',
    },
    {
      title: 'The Mythical Man-Month',
      author: '',
      cover: '/assets/bookCovers/myth.png',
      category: 'Software',
    },
  ];

  // Get unique categories and add "All" option
  const categories = ['All', ...new Set(bookList.map(book => book.category))].sort();

  // State to track selected category
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Handle category change
  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value);
  };

  // Filter books based on selected category
  const filteredBooks =
    selectedCategory === 'All'
      ? bookList
      : bookList.filter(book => book.category === selectedCategory);

  return (
    <div className='books-container'>
      <div className='section-header'>
        <span className='section-title'>/my bookshelf</span>
      </div>
      <p className='books-intro'>Here you can find a list of books I've read and recommend.</p>

      <div className='category-filter'>
        <label htmlFor='category-select'>Filter by category: </label>
        <select
          id='category-select'
          value={selectedCategory}
          onChange={handleCategoryChange}
          className='category-dropdown'
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className='books-grid'>
        {filteredBooks.map((book, index) => (
          <div className='book-card' key={index}>
            <div className='category-badge'>{book.category}</div>
            <a href={book.link} target='_blank' rel='noopener noreferrer'>
              <img
                src={book.cover}
                alt={`${book.title} cover`}
                className='book-cover'
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = '/assets/bookCovers/placeholder.jpg';
                }}
              />
            </a>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
