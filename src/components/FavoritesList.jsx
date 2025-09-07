import React, { useContext } from "react";
import { FavoritesContext } from "../App.jsx";

const FavoritesList = () => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  if (!favorites.length) return <p>Vous n’avez aucun favori pour le moment.</p>;

  return (
    <div className="favorites-list">
      {favorites.map((item) => (
        <div key={item._id} className="card">
          <img
            src={item.thumbnail?.path + "." + item.thumbnail?.extension}
            alt={item.name || item.title}
          />
          <h3>{item.name || item.title}</h3>
          <p>{item.description?.substring(0, 100) || "Pas de description."}</p>
          <button onClick={() => toggleFavorite(item)}>
            {favorites.find((fav) => fav._id === item._id)
              ? "Retirer des favoris"
              : "Ajouter aux favoris"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
