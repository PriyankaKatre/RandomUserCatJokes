// InfiniteScroll.js
import React, { useState, useRef, useCallback } from "react";
import useFetchCats from "./useFetchCats";

const InfiniteScroll = () => {
  const [page, setPage] = useState(1);
  const { cats, loading, error } = useFetchCats(page, 4);
  const observer = useRef();
  const lastCatRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div style={{ display: "flex", overflowX: "auto", gap: "20px" }}>
      {cats.map((cat, index) => (
        <div
          key={cat.id}
          ref={index === cats.length - 1 ? lastCatRef : null}
          style={{
            minWidth: "200px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#f0f0f0",
          }}
        >
          <img src={cat.image} alt={cat.name} width="100%" />
          <p>{cat.name}</p>
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default InfiniteScroll;
