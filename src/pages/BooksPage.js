import React from 'react';
import Books from '../components/Books';
import { SEO } from '../components/common';

const BooksPage = () => {
  return (
    <div className='books-page'>
      <SEO 
        title='Books' 
        description='Curated book recommendations across technology, philosophy, fiction, and more.' 
        url='/books' 
        type='website'
        contentType='books'
      />
      <Books />
    </div>
  );
};

export default BooksPage;
