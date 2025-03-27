import React from "react";
import { useParams, Link } from "react-router-dom";
import { posts } from "../data/data"; // Import posts from data.js
import "../styles/PostDetail.css";

const PostDetail = () => {
  const { id } = useParams();
  const post = posts.find((post) => post.id === parseInt(id));

  return (
    <div className="post-detail-container">
      {post ? (
        <>
          <div className="post-header">
            <Link to="/posts" className="back-button">
              <span className="back-arrow">←</span>
            </Link>
            <h1>{post.title}</h1>
          </div>
          <p><em>{post.date}</em></p>
          <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
        </>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

export default PostDetail;
