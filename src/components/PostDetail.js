import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { posts } from "../data/data";
import "../styles/PostDetail.css";
import { slugify } from "../utils/slug";

const PostDetail = () => {
  const { title } = useParams();
  const post = useMemo(() => {
    const decoded = decodeURIComponent(title);
    return posts.find((p) => slugify(p.title) === decoded);
  }, [title]);

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
