import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY; 
  const API_URL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(API_URL);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details", error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="text-center text-gray-500">Loading...</p>;

  // ✅ Fixing the duplicate step numbers issue
  const formattedInstructions = recipe.analyzedInstructions?.[0]?.steps
    ? recipe.analyzedInstructions[0].steps.map((step) => step.step) // Spoonacular already provides steps
    : recipe.instructions
      ? recipe.instructions.split(". ").map((step) => step.trim()) // Fallback for non-structured instructions
      : ["Instructions not available."];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-primary">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full rounded-lg my-4" />

      {/* 🛒 Ingredients Section */}
      <h2 className="text-xl font-semibold">🛒 Ingredients</h2>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        {recipe.extendedIngredients.map((ing) => (
          <li key={ing.id} className="text-gray-700">{ing.original}</li>
        ))}
      </ul>

      {/* 👨‍🍳 Instructions Section (Improved Readability) */}
      <h2 className="text-xl font-semibold">👨‍🍳 Instructions</h2>
      <div className="bg-gray-100 p-4 rounded-lg mt-2">
        <ul className="list-decimal pl-5 space-y-2">
          {formattedInstructions.map((step, index) => (
            <li key={index} className="text-gray-700 leading-relaxed">{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecipeDetails;
