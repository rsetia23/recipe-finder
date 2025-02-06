import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RecipeCard from "/components/RecipeCard";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const navigate = useNavigate(); 

  const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY; 
  const API_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&addRecipeInformation=true`;

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(API_URL);
      if (response.data.results.length === 0) {
        setShowNoResults(true); 
      }
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-base-200 p-6 lg:h-screen">
        <h1 className="text-3xl font-bold mb-6">CookRahul 🍽️</h1>
        <nav className="flex flex-col gap-4">
          <button onClick={() => navigate("/")} className="btn btn-outline btn-primary">🏠 Home</button>
          <button onClick={() => navigate("/favorites")} className="btn btn-outline btn-secondary">❤️ Favorites</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-x-hidden">
        {/* Search Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            fetchRecipes();
          }} 
          className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6"
        >
          <input
            type="text"
            placeholder="🔍 What do you want to cook today?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-bordered w-full md:w-1/2 shadow-md"
          />
          <button type="submit" className="btn btn-primary w-full md:w-auto">
            Search
          </button>
        </form>

        {/* No Results Popup */}
        {showNoResults && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold">⚠ No recipes found!</h2>
              <p className="text-gray-600">Try searching for something else.</p>
              <button onClick={() => setShowNoResults(false)} className="btn btn-primary mt-4">OK</button>
            </div>
          </div>
        )}

        {/* Recipe Grid */}
        <h2 className="text-2xl font-bold mb-4">Recommended Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
