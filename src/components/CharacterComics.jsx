// CharacterComics.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CharacterComics() {
  const { characterId } = useParams();
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(`/comics/${characterId}`);
        setComics(response.data);
      } catch (error) {
        console.error("Erreur lors du fetch des comics :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComics();
  }, [characterId]);

  if (loading) return <p>Chargement des comics...</p>;

  return (
    <div className="comics-container">
      {comics.length === 0 && <p>Aucun comic trouvé pour ce personnage.</p>}
      {comics.map((comic) => (
        <div key={comic._id} className="card">
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
            onError={(e) => (e.target.src = "/fallback-image.png")} // image de secours
          />
          <h3>{comic.title}</h3>
          <p>{comic.description || "Pas de description disponible."}</p>
        </div>
      ))}
    </div>
  );
}

export default CharacterComics;
