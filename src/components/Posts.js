import React from "react";
import { Link } from "react-router-dom";
import { posts } from "../data/data"; // Import posts from data.js
import "../styles/Posts.css";

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/--+/g, '-'); // Replace multiple - with single -
}

const Posts = () => {
  return (
    <div className="posts-container">
      <div className="section-header">
        <span className="section-title">/ posts</span>
      </div>
      <p className="posts-intro">Here you can find a list of posts.</p>
      
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <Link to={`/posts/${toSlug(post.title)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>{post.title}</h2>
              <p><em>{post.date}</em></p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;