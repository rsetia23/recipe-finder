import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600">❤️ Your Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorite recipes yet. Start adding some!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="card bg-base-100 shadow-xl">
              <figure>
                <img src={recipe.image} alt={recipe.title} className="rounded-t-xl w-full h-40 object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  <Link to={`/recipe/${recipe.id}`} className="text-blue-600 hover:underline">
                    {recipe.title}
                  </Link>
                </h2>

                {/* Recipe Badges */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge badge-info text-sm min-w-max">🍽 {recipe.servings} Servings</span>
                  {recipe.vegetarian && <span className="badge badge-success text-sm min-w-max">Vegetarian</span>}
                  {recipe.vegan && <span className="badge badge-success text-sm min-w-max">Vegan</span>}
                  {recipe.glutenFree && <span className="badge badge-warning text-sm min-w-max">Gluten-Free</span>}
                </div>

                {/* View Details Button */}
                <div className="flex justify-between items-center mt-4">
                  <Link to={`/recipe/${recipe.id}`} className="btn btn-sm btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
