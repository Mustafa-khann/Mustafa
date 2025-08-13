import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { posts } from "../data/data"; // Import posts from data.js
import "../styles/Posts.css";
import { slugify } from "../utils/slug";

const Posts = () => {
  const sortedPosts = useMemo(() => {
    return posts.slice().sort((a, b) => b.id - a.id);
  }, []);

  return (
    <div className="posts-container">
      <div className="section-header">
        <span className="section-title">/ posts</span>
      </div>
      <p className="posts-intro">Here you can find a list of posts.</p>
      
      <div className="posts-grid">
        {sortedPosts.map((post) => (
          <div key={post.id} className="post-card">
            <Link to={`/posts/${slugify(post.title)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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