import React from "react";
import { useParams, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import LoadingSpinner from "./LoadingSpinner";
import "../styles/PostDetail.css";

const PostDetail = () => {
  const { title } = useParams();
  const { getPostBySlug, loading, error } = useData();
  
  const decoded = decodeURIComponent(title);
  const post = getPostBySlug(decoded);

  if (loading) {
    return (
      <div className="post-detail-container">
        <LoadingSpinner size="large" message="Loading post..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-detail-container">
        <div className="error-message">
          <p>Error loading post: {error}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-detail-container">
        <div className="error-message">
          <p>Post not found.</p>
          <Link to="/posts" className="back-button">
            ← Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <div className="post-header">
        <Link to="/posts" className="back-button">
          <span className="back-arrow">←</span>
        </Link>
        <h1>{post.title}</h1>
      </div>
      <p><em>{post.date}</em></p>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </div>
  );
};

export default PostDetail;
