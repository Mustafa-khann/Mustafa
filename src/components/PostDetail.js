import React from "react";
import { useParams, Link } from "react-router-dom";
import { posts } from "../data/data"; // Import posts from data.js
import "../styles/PostDetail.css";

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/--+/g, '-'); // Replace multiple - with single -
}

const PostDetail = () => {
  const { title } = useParams();
  const post = posts.find((post) => toSlug(post.title) === decodeURIComponent(title));

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
