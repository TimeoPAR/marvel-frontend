import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ComicList.css";

const ComicList = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get("http://localhost:4000/comics?page=1");
        setComics(response.data.results);
      } catch (error) {
        console.error("Erreur API:", error);
      }
    };

    fetchComics();
  }, []);

  return (
    <div className="comic-list">
      {comics.map((comic) => (
        <div key={comic._id} className="comic-card">
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
          />
          <h3>{comic.title}</h3>
          <p>{comic.description || "Pas de description disponible"}</p>
        </div>
      ))}
    </div>
  );
};

export default ComicList;
