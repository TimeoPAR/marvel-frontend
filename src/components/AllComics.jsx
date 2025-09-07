// AllComics.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AllComics = () => {
  const [comics, setComics] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/comics${search ? `?title=${search}` : ""}`
        );
        setComics(response.data.results || []);
      } catch (error) {
        console.log("Erreur lors du fetch des comics :", error);
      }
    };
    fetchComics();
  }, [search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un comic"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="comic-list">
        {comics.map((comic) => (
          <div key={comic._id} className="comic-card">
            <img src={comic.thumbnail} alt={comic.title} />
            <h3>{comic.title}</h3>
            <p>{comic.description || "Pas de description"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllComics;
