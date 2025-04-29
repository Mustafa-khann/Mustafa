"use client";

import React from "react";

export default function PostsPage() {
  return (
    <div className="posts-container" style={{ 
      margin: "auto",
      maxWidth: "1000px",
      paddingTop: "100px",
      minHeight: "100vh"
    }}>
      <div className="section-header">
        <span className="section-title">/posts</span>
      </div>
      <p style={{ 
        fontFamily: "NTR, sans-serif",
        color: "var(--slate)",
        fontSize: "22px"
      }}>
        Coming soon... Check back later for posts.
      </p>
    </div>
  );
} 