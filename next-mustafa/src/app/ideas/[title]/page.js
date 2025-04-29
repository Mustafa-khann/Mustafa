"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function IdeaDetailPage() {
  const params = useParams();
  const title = params.title;

  return (
    <div className="idea-detail-container" style={{ 
      margin: "auto",
      maxWidth: "800px",
      paddingTop: "100px",
      minHeight: "100vh"
    }}>
      <div className="section-header">
        <span className="section-title">{decodeURIComponent(title)}</span>
      </div>
      <p style={{ 
        fontFamily: "NTR, sans-serif",
        color: "var(--slate)",
        fontSize: "22px"
      }}>
        This idea is coming soon. Check back later.
      </p>
    </div>
  );
} 