import React from 'react';
import { Link } from 'react-router-dom';
import { getPostDateMeta, getPostPath } from '../../utils/posts';
import { postEditorial } from '../../data/editorial';

const PostList = ({ posts, compact = false }) => (
  <ol className={`writing-list${compact ? ' writing-list-compact' : ''}`}>
    {posts.map((post) => {
      const copy = postEditorial[post.id];
      const date = getPostDateMeta(post.date);
      return (
        <li key={post.id}>
          <Link className="writing-row" to={getPostPath(post)}>
            <time dateTime={date.isoDate}>{date.isoDate || post.date}</time>
            <div><h3>{copy?.title || post.title}</h3>{!compact && copy?.summary && <p>{copy.summary}</p>}</div>
            <span className="entry-arrow" aria-hidden="true">↗</span>
          </Link>
        </li>
      );
    })}
  </ol>
);
export default PostList;
