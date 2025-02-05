import { useState, useEffect } from "react";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600">Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <ul className="list-disc pl-5">
          {favorites.map((fav) => (
            <li key={fav.id}>{fav.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesPage;
