import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import "./index.css";
import App from "./App";
import FavoritesPage from "./pages/FavoritesPage";
import RecipeDetails from "./pages/RecipeDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
