import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

export const books = [
  // Fiction
  {
    slug: '1984',
    title: '1984',
    author: 'George Orwell',
    category: 'Fiction',
    spineColor: '#2D3436',
    textColor: '#DFE6E9',
    accentColor: '#E17055',
    topColor: '#3D4446',
    thickness: 52,
    description: 'A dystopian novel set in a totalitarian society under constant surveillance. Orwell\'s masterpiece explores the dangers of authoritarianism, propaganda, and the manipulation of truth — themes that remain chillingly relevant.',
  },
  {
    slug: 'there-is-no-antimemetics-division',
    title: 'There Is No Antimemetics Division',
    author: 'qntm',
    category: 'Fiction',
    spineColor: '#0D0D0D',
    textColor: '#00CEC9',
    accentColor: '#00CEC9',
    topColor: '#1D1D1D',
    thickness: 44,
    description: 'A mind-bending exploration of antimemetics — ideas that resist being remembered or communicated. Built from the SCP Foundation universe, it asks: what happens when the enemy is something you can\'t remember exists?',
  },
  {
    slug: 'fahrenheit-451',
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    category: 'Fiction',
    spineColor: '#D63031',
    textColor: '#FFEAA7',
    accentColor: '#FDCB6E',
    topColor: '#E64A3B',
    thickness: 46,
    description: 'In a future where books are banned and "firemen" burn them, one man begins to question everything. Bradbury\'s scorching novel is a defense of literature and free thought against the numbing embrace of mass media.',
  },
  {
    slug: 'lolita',
    title: 'Lolita',
    author: 'Vladimir Nabokov',
    category: 'Fiction',
    spineColor: '#6C5CE7',
    textColor: '#FDF2E9',
    accentColor: '#FD79A8',
    topColor: '#7C6CF7',
    thickness: 54,
    description: 'A controversial and linguistically dazzling novel narrated by Humbert Humbert. Nabokov crafts a disturbing yet masterful exploration of obsession, manipulation, and the unreliable narrator.',
  },
  {
    slug: 'the-idiot',
    title: 'The Idiot',
    author: 'Fyodor Dostoevsky',
    category: 'Fiction',
    spineColor: '#B2BEC3',
    textColor: '#2D3436',
    accentColor: '#636E72',
    topColor: '#C2CED3',
    thickness: 60,
    description: 'Prince Myshkin, a genuinely good man, returns to Russian society only to be consumed by it. Dostoevsky examines whether pure goodness can survive a corrupt world.',
  },
  {
    slug: 'the-trial',
    title: 'The Trial',
    author: 'Franz Kafka',
    category: 'Fiction',
    spineColor: '#636E72',
    textColor: '#DFE6E9',
    accentColor: '#FFEAA7',
    topColor: '#737E82',
    thickness: 42,
    description: 'Josef K. is arrested and prosecuted by a remote, inaccessible authority for a crime that is never revealed. Kafka\'s unfinished novel is the definitive literary rendering of bureaucratic absurdity and existential dread.',
  },
  {
    slug: 'crime-and-punishment',
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    category: 'Fiction',
    spineColor: '#2D3436',
    textColor: '#E17055',
    accentColor: '#E17055',
    topColor: '#3D4446',
    thickness: 64,
    description: 'Raskolnikov murders a pawnbroker to prove an extraordinary-man theory, then is destroyed by his own conscience. A psychological deep-dive into guilt, redemption, and the limits of rationalism.',
  },

  // Philosophy
  {
    slug: 'consciousness-explained',
    title: 'Consciousness Explained',
    author: 'Daniel C. Dennett',
    category: 'Philosophy',
    spineColor: '#00B894',
    textColor: '#FDFEFE',
    accentColor: '#55EFC4',
    topColor: '#10C8A4',
    thickness: 56,
    description: 'Dennett dismantles the "Cartesian theater" model of consciousness and proposes the Multiple Drafts theory. A rigorous, contrarian take on the hardest problem in philosophy of mind.',
  },
  {
    slug: 'godel-escher-bach',
    title: 'Gödel, Escher, Bach',
    author: 'Douglas Hofstadter',
    category: 'Philosophy',
    spineColor: '#FDCB6E',
    textColor: '#2D3436',
    accentColor: '#E17055',
    topColor: '#FEDB8E',
    thickness: 70,
    description: 'An exploration of how self-reference and formal rules give rise to meaning, intelligence, and consciousness — weaving together mathematics, art, and music into a unified intellectual tapestry.',
  },
  {
    slug: 'existentialism-is-a-humanism',
    title: 'Existentialism is a Humanism',
    author: 'Jean-Paul Sartre',
    category: 'Philosophy',
    spineColor: '#2D3436',
    textColor: '#DFE6E9',
    accentColor: '#74B9FF',
    topColor: '#3D4446',
    thickness: 38,
    description: 'Sartre\'s defense of existentialism: existence precedes essence, we are condemned to be free, and we are fully responsible for what we make of ourselves.',
  },
  {
    slug: 'communist-manifesto',
    title: 'Communist Manifesto',
    author: 'Karl Marx',
    category: 'Philosophy',
    spineColor: '#C0392B',
    textColor: '#FDFEFE',
    accentColor: '#E74C3C',
    topColor: '#D0493B',
    thickness: 34,
    description: 'The foundational text of Marxism. A short, incendiary pamphlet laying out the theory of class struggle and the call for proletarian revolution that reshaped the 20th century.',
  },

  // Non-Fiction
  {
    slug: 'debt-the-first-5000-years',
    title: 'Debt: The First 5,000 Years',
    author: 'David Graeber',
    category: 'Non-Fiction',
    spineColor: '#1E3799',
    textColor: '#DFE6E9',
    accentColor: '#74B9FF',
    topColor: '#2E47A9',
    thickness: 62,
    description: 'A sweeping anthropological history of debt that overturns the standard economic narrative. Graeber argues that debt precedes money and that its moral weight has been used to justify everything from slavery to war.',
  },
  {
    slug: 'design-as-art',
    title: 'Design as Art',
    author: 'Bruno Munari',
    category: 'Non-Fiction',
    spineColor: '#FDFEFE',
    textColor: '#2D3436',
    accentColor: '#E17055',
    topColor: '#F0F0F0',
    thickness: 36,
    description: 'Munari argues that design is not mere decoration but a way of thinking. A slim, elegant manifesto on making the visual environment more humane, functional, and beautiful.',
  },
  {
    slug: 'the-visual-display-of-quantitative-information',
    title: 'The Visual Display of Quantitative Information',
    author: 'Edward R. Tufte',
    category: 'Non-Fiction',
    spineColor: '#DFE6E9',
    textColor: '#2D3436',
    accentColor: '#636E72',
    topColor: '#EFF2F5',
    thickness: 48,
    description: 'The definitive guide to data visualization. Tufte establishes principles of graphical excellence — maximizing data-ink ratio, eliminating chartjunk, and letting the data speak.',
  },

  // Technology
  {
    slug: 'chip-war',
    title: 'Chip War',
    author: 'Chris Miller',
    category: 'Technology',
    spineColor: '#0C2461',
    textColor: '#82CCDD',
    accentColor: '#3C6382',
    topColor: '#1C3471',
    thickness: 54,
    description: 'The geopolitical history of the semiconductor industry. Miller traces how chips became the most critical resource of the modern era, shaping military power, economic competition, and technological supremacy.',
  },
  {
    slug: 'fundamentals-of-materials-science',
    title: 'Fundamentals of Materials Science and Engineering',
    author: 'William D. Callister',
    category: 'Technology',
    spineColor: '#0A3D62',
    textColor: '#DFE6E9',
    accentColor: '#3C6382',
    topColor: '#1A4D72',
    thickness: 66,
    description: 'The canonical materials science textbook. Covers atomic structure, crystallography, mechanical properties, phase diagrams, and the engineering of metals, ceramics, polymers, and composites.',
  },
  {
    slug: 'fundamentals-of-aerodynamics',
    title: 'Fundamentals of Aerodynamics',
    author: 'John D. Anderson',
    category: 'Technology',
    spineColor: '#1B1464',
    textColor: '#A29BFE',
    accentColor: '#6C5CE7',
    topColor: '#2B2474',
    thickness: 64,
    description: 'Anderson\'s comprehensive treatment of aerodynamic theory — from incompressible flow to hypersonics. The standard reference for understanding lift, drag, and fluid dynamics in aerospace engineering.',
  },
  {
    slug: 'silicon-photonics-design',
    title: 'Silicon Photonics Design',
    author: 'Lukas Chrostowski',
    category: 'Technology',
    spineColor: '#0D0D0D',
    textColor: '#00CEC9',
    accentColor: '#00B894',
    topColor: '#1D1D1D',
    thickness: 48,
    description: 'A practical guide to designing photonic circuits on silicon. Covers waveguides, ring resonators, Mach-Zehnder interferometers, and the simulation/fabrication workflow for integrated photonics.',
  },

  // Electronics
  {
    slug: 'the-art-of-electronics',
    title: 'The Art of Electronics',
    author: 'Paul Horowitz',
    category: 'Electronics',
    spineColor: '#2D3436',
    textColor: '#FFEAA7',
    accentColor: '#FDCB6E',
    topColor: '#3D4446',
    thickness: 72,
    description: 'The bible of electronics. Horowitz and Hill cover everything from basic circuits to microprocessors with an engineer\'s intuition — emphasizing practical design over pure theory.',
  },

  // Biology
  {
    slug: 'the-selfish-gene',
    title: 'The Selfish Gene',
    author: 'Richard Dawkins',
    category: 'Biology',
    spineColor: '#00B894',
    textColor: '#FDFEFE',
    accentColor: '#55EFC4',
    topColor: '#10C8A4',
    thickness: 48,
    description: 'Dawkins reframes evolution from the gene\'s perspective: organisms are survival machines for replicators. Introduces the concept of memes and fundamentally shifts how we think about natural selection.',
  },
  {
    slug: 'the-origin-of-species',
    title: 'The Origin of Species',
    author: 'Charles Darwin',
    category: 'Biology',
    spineColor: '#6C5B3E',
    textColor: '#F5E6CC',
    accentColor: '#D4A574',
    topColor: '#7C6B4E',
    thickness: 58,
    description: 'Darwin\'s foundational work introducing the theory of evolution by natural selection. Methodical, evidence-rich, and still staggering in its explanatory power after more than 160 years.',
  },
  {
    slug: 'molecular-biology-of-the-cell',
    title: 'Molecular Biology of the Cell',
    author: 'Bruce Alberts',
    category: 'Biology',
    spineColor: '#0984E3',
    textColor: '#FDFEFE',
    accentColor: '#74B9FF',
    topColor: '#1994F3',
    thickness: 74,
    description: 'The standard reference for cell biology. Covers everything from DNA replication and gene expression to cell signaling, the cytoskeleton, and cancer — at molecular resolution.',
  },

  // Programming
  {
    slug: 'a-computational-logic',
    title: 'A Computational Logic',
    author: 'Robert S. Boyer',
    category: 'Programming',
    spineColor: '#636E72',
    textColor: '#DFE6E9',
    accentColor: '#B2BEC3',
    topColor: '#737E82',
    thickness: 46,
    description: 'A foundational work on mechanized theorem proving. Boyer and Moore develop a logic and a system for automatically verifying the correctness of programs — pioneering formal verification.',
  },
  {
    slug: 'algorithms-in-c',
    title: 'Algorithms in C',
    author: 'Robert Sedgewick',
    category: 'Programming',
    spineColor: '#2D3436',
    textColor: '#DFE6E9',
    accentColor: '#636E72',
    topColor: '#3D4446',
    thickness: 56,
    description: 'Sedgewick\'s practical guide to fundamental algorithms implemented in C. Covers sorting, searching, graph algorithms, and string processing with clear code and analysis.',
  },
  {
    slug: 'arm-bare-metal',
    title: 'ARM Bare Metal',
    author: 'Daniel Umanoskis',
    category: 'Programming',
    spineColor: '#0D0D0D',
    textColor: '#00CEC9',
    accentColor: '#00B894',
    topColor: '#1D1D1D',
    thickness: 38,
    description: 'A hands-on guide to programming ARM processors without an operating system. Covers register-level hardware interaction, interrupts, and building embedded systems from scratch.',
  },
  {
    slug: 'c-programming-language',
    title: 'C Programming Language',
    author: 'Kernighan & Ritchie',
    category: 'Programming',
    spineColor: '#FDFEFE',
    textColor: '#2D3436',
    accentColor: '#636E72',
    topColor: '#F0F0F0',
    thickness: 40,
    description: 'K&R — the original and most influential programming book ever written. Lean, precise, and complete. Every serious programmer has read it; many keep it within arm\'s reach.',
  },
  {
    slug: 'computer-systems',
    title: 'Computer Systems: A Programmer\'s Perspective',
    author: 'Bryant & O\'Hallaron',
    category: 'Programming',
    spineColor: '#1E3799',
    textColor: '#FDFEFE',
    accentColor: '#4A69BD',
    topColor: '#2E47A9',
    thickness: 68,
    description: 'How computers actually execute programs — from bits and assembly to memory hierarchies, linking, virtual memory, and concurrency. The bridge between code and hardware.',
  },
  {
    slug: 'cuda-c-programming-guide',
    title: 'CUDA C Programming Guide',
    author: 'NVIDIA',
    category: 'Programming',
    spineColor: '#27AE60',
    textColor: '#FDFEFE',
    accentColor: '#2ECC71',
    topColor: '#37BE70',
    thickness: 44,
    description: 'NVIDIA\'s official guide to programming GPUs with CUDA. Covers the execution model, memory hierarchy, kernel optimization, and parallel computing patterns for massively parallel workloads.',
  },
  {
    slug: 'data-structures-and-algorithms-in-cpp',
    title: 'Data Structures and Algorithms in C++',
    author: 'Mark Allen Weiss',
    category: 'Programming',
    spineColor: '#2C3E50',
    textColor: '#ECF0F1',
    accentColor: '#3498DB',
    topColor: '#3C4E60',
    thickness: 58,
    description: 'A thorough treatment of data structures and algorithm analysis using C++. Covers lists, trees, hashing, sorting, graphs, and algorithm design with mathematical rigor.',
  },
  {
    slug: 'programming-massively-parallel-processors',
    title: 'Programming Massively Parallel Processors',
    author: 'Kirk & Hwu',
    category: 'Programming',
    spineColor: '#0D0D0D',
    textColor: '#E17055',
    accentColor: '#D63031',
    topColor: '#1D1D1D',
    thickness: 52,
    description: 'The definitive textbook on GPU computing and parallel programming. Covers CUDA architecture, parallel patterns, memory optimization, and real-world application case studies.',
  },

  // Manufacturing
  {
    slug: 'structures',
    title: 'Structures: Or Why Things Don\'t Fall Down',
    author: 'J.E. Gordon',
    category: 'Manufacturing',
    spineColor: '#B2BEC3',
    textColor: '#2D3436',
    accentColor: '#636E72',
    topColor: '#C2CED3',
    thickness: 50,
    description: 'A brilliantly accessible introduction to structural engineering. Gordon explains tension, compression, beams, and arches with wit and clarity — making the invisible forces of the built world visible.',
  },
  {
    slug: 'the-toyota-way',
    title: 'The Toyota Way',
    author: 'Jeffrey Liker',
    category: 'Manufacturing',
    spineColor: '#D63031',
    textColor: '#FDFEFE',
    accentColor: '#FF7675',
    topColor: '#E64041',
    thickness: 54,
    description: 'A deep look at Toyota\'s management principles: continuous improvement, respect for people, long-term thinking, and lean manufacturing. The operational philosophy that revolutionized production worldwide.',
  },
  {
    slug: 'the-design-of-everyday-things',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    category: 'Manufacturing',
    spineColor: '#FDCB6E',
    textColor: '#2D3436',
    accentColor: '#E17055',
    topColor: '#FEDB8E',
    thickness: 48,
    description: 'Norman\'s classic on human-centered design. Introduces affordances, signifiers, and mapping — the principles that separate good design (doors you can open) from bad (doors that confuse you).',
  },

  // Robotics
  {
    slug: 'introduction-to-robotics',
    title: 'Introduction to Robotics',
    author: 'John J. Craig',
    category: 'Robotics',
    spineColor: '#0C2461',
    textColor: '#82CCDD',
    accentColor: '#3C6382',
    topColor: '#1C3471',
    thickness: 56,
    description: 'The standard textbook for robot mechanics and control. Covers spatial descriptions, forward/inverse kinematics, dynamics, trajectory planning, and manipulator design.',
  },
  {
    slug: 'nasa-systems-engineering-handbook',
    title: 'NASA Systems Engineering Handbook',
    author: 'NASA',
    category: 'Robotics',
    spineColor: '#1B1464',
    textColor: '#DFE6E9',
    accentColor: '#6C5CE7',
    topColor: '#2B2474',
    thickness: 60,
    description: 'NASA\'s comprehensive guide to systems engineering: requirements, architecture, verification, validation, and managing complexity in large-scale aerospace and defense programs.',
  },

  // Software
  {
    slug: 'blitzscaling',
    title: 'Blitzscaling',
    author: 'Reid Hoffman',
    category: 'Software',
    spineColor: '#E17055',
    textColor: '#FDFEFE',
    accentColor: '#FDCB6E',
    topColor: '#F18065',
    thickness: 46,
    description: 'Hoffman\'s framework for scaling startups at breakneck speed — prioritizing speed over efficiency in the face of uncertainty. Case studies from LinkedIn, Airbnb, and other hypergrowth companies.',
  },
  {
    slug: 'designing-data-intensive-applications',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'Software',
    spineColor: '#2D3436',
    textColor: '#74B9FF',
    accentColor: '#0984E3',
    topColor: '#3D4446',
    thickness: 62,
    description: 'The modern bible of distributed systems. Kleppmann covers replication, partitioning, transactions, batch/stream processing, and the trade-offs that define how we build reliable, scalable data systems.',
  },
  {
    slug: 'the-mythical-man-month',
    title: 'The Mythical Man-Month',
    author: 'Frederick Brooks',
    category: 'Software',
    spineColor: '#636E72',
    textColor: '#FDFEFE',
    accentColor: '#B2BEC3',
    topColor: '#737E82',
    thickness: 44,
    description: 'Brooks\'s timeless essays on software engineering management. "Adding manpower to a late software project makes it later." Still the most cited book in the field, half a century later.',
  },
];

const BooksPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const shelfRef = useRef(null);
  const bookRefs = useRef([]);
  const history = useHistory();

  const handleScroll = useCallback(() => {
    if (!shelfRef.current) return;
    const container = shelfRef.current;
    const containerHeight = container.clientHeight;

    let closest = 0;
    let closestDist = Infinity;
    bookRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const bookCenter = rect.top - containerRect.top + rect.height / 2;
      const viewCenter = containerHeight / 2;
      const dist = Math.abs(bookCenter - viewCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const el = shelfRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToBook = (index) => {
    const book = bookRefs.current[index];
    if (book && shelfRef.current) {
      const containerRect = shelfRef.current.getBoundingClientRect();
      const bookRect = book.getBoundingClientRect();
      const offset = bookRect.top - containerRect.top + shelfRef.current.scrollTop
        - (shelfRef.current.clientHeight / 2) + (bookRect.height / 2);
      shelfRef.current.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  // Compute line width based on distance from hovered index
  const getLineWidth = (i) => {
    if (hoveredIndex < 0) return undefined;
    const dist = Math.abs(i - hoveredIndex);
    if (dist === 0) return '32px';
    if (dist === 1) return '24px';
    if (dist === 2) return '18px';
    if (dist === 3) return '14px';
    return undefined;
  };

  // Track hover by mousemove on the container - much more reliable than per-button mouseenter
  const lineContainerRef = useRef(null);
  const lineButtonRefs = useRef([]);

  const handleIndicatorMouseMove = useCallback((e) => {
    const buttons = lineButtonRefs.current;
    if (!buttons.length) return;
    const mouseY = e.clientY;
    let closest = -1;
    let closestDist = Infinity;
    buttons.forEach((btn, i) => {
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(mouseY - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    if (closestDist < 20) {
      setHoveredIndex(closest);
    } else {
      setHoveredIndex(-1);
    }
  }, []);

  return (
    <div className="bookshelf-page">
      {/* Left scroll indicator */}
      <nav className="bookshelf-scroll-indicator" aria-label="Book navigation">
        <Link to="/" className="scroll-indicator-back">←</Link>
        <div
          className="scroll-indicator-lines"
          ref={lineContainerRef}
          onMouseMove={handleIndicatorMouseMove}
          onMouseLeave={() => setHoveredIndex(-1)}
        >
          {books.map((book, i) => (
            <button
              key={book.slug}
              ref={(el) => (lineButtonRefs.current[i] = el)}
              className={`scroll-indicator-line ${i === activeIndex ? 'active' : ''} ${i === hoveredIndex ? 'hovered' : ''}`}
              onClick={() => scrollToBook(i)}
              aria-label={book.title}
              data-title={book.title}
              style={getLineWidth(i) ? { width: getLineWidth(i) } : undefined}
            />
          ))}
        </div>
      </nav>

      {/* Main content */}
      <div className="bookshelf-main" ref={shelfRef}>
        {/* Header matching site aesthetic */}
        <header className="bookshelf-header">
          <Link to="/" className="back-link">← Back</Link>
          <h1 className="page-title">Books</h1>
          <p className="page-subtitle">Books that i've read or suggest.</p>
        </header>

        {/* 3D Books */}
        <section className="bookshelf-shelf">
          {books.map((book, idx) => (
            <div
              key={book.slug}
              ref={(el) => (bookRefs.current[idx] = el)}
              className="book-3d-wrapper"
              onClick={() => history.push(`/books/${book.slug}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && history.push(`/books/${book.slug}`)}
              aria-label={`${book.title} by ${book.author}`}
            >
              <div
                className="book-3d"
                style={{
                  '--spine-color': book.spineColor,
                  '--top-color': book.topColor,
                  '--text-color': book.textColor,
                  '--accent-color': book.accentColor,
                  '--book-thickness': `${book.thickness}px`,
                }}
              >
                <div className="book-3d-front">
                  <span className="book-3d-author">{book.author}</span>
                  <span className="book-3d-title">{book.title}</span>
                </div>
                <div className="book-3d-top"></div>
                <div className="book-3d-right"></div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default BooksPage;
