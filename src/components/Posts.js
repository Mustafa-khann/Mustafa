import React from "react";
import { Link } from "react-router-dom";
import "../styles/Posts.css";

const Posts = () => {
  const posts = [
    {
      id: 1,
      title: "Knowing as Inseparable from Doing",
      date: "March 25, 2025"
    },
    {
      id: 2,
      title: "Open Questions",
      date: "January 27, 2025",
    },
    {
      id: 3,
      title: "Why Physical AI (Robotics) is Going to Revolutionize Industrialism",
      date: "Jan 14 2025",
      content: ""
    },
    {
      id: 4,
      title: "The Future of AI: Navigating the Technological Horizon",
      date: "Mar 26 2025",
      content: ""
    },
    {
      id: 5,
      title: "The Strategic Imperative for Domestic Manufacturing Renaissance",
      date: "Mar 26 2025",
      content: ""
    },
    {
      id: 6,
      title: "Vibe Coding",
      date: "Mar 26 2025",
      content: ""
    },
    {
      id: 7,
      title: "Why Robotics is Hard to Break Into (Personal Experience)",
      date: "Mar 27 2025",
    }
  ];

  return (
    <div className="posts-container">
      <div className="section-header">
        <span className="section-title">/ posts</span>
      </div>
      <p className="posts-intro">Here you can find a list of posts.</p>
      
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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