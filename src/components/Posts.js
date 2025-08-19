import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import "../styles/Posts.css";
import { slugify } from "../utils/slug";

const Posts = () => {
  const { filteredPosts, loading, error } = useData();

  if (loading) {
    return (
      <div className="posts-container">
        <LoadingSpinner size="large" message="Loading posts..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts-container">
        <div className="error-message">
          <p>Error loading posts: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="section-header">
        <span className="section-title">/ posts</span>
      </div>
      <p className="posts-intro">Here you can find a list of posts.</p>
      
      <SearchBar placeholder="Search posts..." />
      
      {filteredPosts.length === 0 ? (
        <div className="no-results">
          <p>No posts found matching your search.</p>
        </div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              <Link to={`/posts/${slugify(post.title)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="date-badge">{post.date}</div>
                <h2>{post.title}</h2>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;