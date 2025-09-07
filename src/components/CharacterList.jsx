// CharacterList.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FavoritesContext } from "../App.jsx"; // On utilise le context global
import "./ComicList.css";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Récupération du context favoris
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/characters?page=${page}&name=${search}`
        );
        // S'assurer que response.data.results est un tableau
        setCharacters(
          Array.isArray(response.data.results) ? response.data.results : []
        );
      } catch (error) {
        console.error("Erreur API:", error);
        setCharacters([]);
      }
    };
    fetchCharacters();
  }, [page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Rechercher un personnage..."
          value={search}
          onChange={handleSearchChange}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div className="comic-list">
        {characters.map((character) => (
          <div key={character._id} className="comic-card">
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              onClick={() => navigate(`/characters/${character._id}/comics`)}
              style={{ cursor: "pointer" }}
            />
            <h3>{character.name}</h3>
            <p>{character.description || "Pas de description disponible"}</p>
            <button
              onClick={() => toggleFavorite(character)}
              style={{
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "5px",
              }}
            >
              {favorites.some((fav) => fav._id === character._id)
                ? "Retirer des favoris"
                : "Ajouter aux favoris"}
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
          gap: "10px",
        }}
      >
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Précédent
        </button>
        <span style={{ color: "white", padding: "10px 20px" }}>{page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Suivant</button>
      </div>
    </div>
  );
};

export default CharacterList;
