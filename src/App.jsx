// App.jsx
import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import CharacterList from "./components/CharacterList.jsx";
import CharacterComics from "./components/CharacterComics.jsx";
import AllComics from "./components/AllComics.jsx";
import FavoritesList from "./components/FavoritesList.jsx";

// Création du contexte pour les favoris
export const FavoritesContext = createContext();

function App() {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  // Ajouter ou retirer un favori
  const toggleFavorite = (item) => {
    let updatedFavorites;
    if (favorites.find((fav) => fav._id === item._id)) {
      updatedFavorites = favorites.filter((fav) => fav._id !== item._id);
    } else {
      updatedFavorites = [...favorites, item];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/characters" element={<CharacterList />} />
          <Route path="/characters/:id/comics" element={<CharacterComics />} />
          <Route path="/comics" element={<AllComics />} />
          <Route path="/favorites" element={<FavoritesList />} />
        </Routes>
      </BrowserRouter>
    </FavoritesContext.Provider>
  );
}

export default App;
