import React from 'react';
import Posts from '../components/Posts';
import { SEO } from '../components/common';

const PostsPage = () => {
  return (
    <div className='posts-page'>
      <SEO title='Posts' description='All essays and notes.' url='/posts' type='website' contentType='posts' />
      <Posts />
    </div>
  );
};

export default PostsPage;
