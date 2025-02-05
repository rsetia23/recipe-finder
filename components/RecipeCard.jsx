import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === recipe.id));
  }, [recipe.id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((fav) => fav.id !== recipe.id);
    } else {
      // Add to favorites
      favorites.push(recipe);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={recipe.image} alt={recipe.title} className="rounded-t-xl w-full h-40 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{recipe.title}</h2>
        <p className="text-gray-500">{recipe.cuisines?.join(", ") || "Various Cuisine"}</p>

        {/* Recipe Badges */}
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="badge badge-info text-sm min-w-max">🍽 {recipe.servings} Servings</span>
          {recipe.vegetarian && <span className="badge badge-success text-sm min-w-max">Vegetarian</span>}
          {recipe.vegan && <span className="badge badge-success text-sm min-w-max">Vegan</span>}
          {recipe.glutenFree && <span className="badge badge-warning text-sm min-w-max">Gluten-Free</span>}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-4">
          <Link to={`/recipe/${recipe.id}`} className="btn btn-sm btn-primary">
            View Details
          </Link>
          <button onClick={toggleFavorite} className={`btn btn-sm ${isFavorite ? "btn-error" : "btn-outline btn-error"}`}>
            {isFavorite ? "❤️ Unfavorite" : "🤍 Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
