import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import FullRecipeInformation from "./pages/FullRecipeInformation/FullRecipeInformation";
import { AddRecipePage } from "./pages/AddRecipePage/AddRecipePage";
import UserPage from "./pages/UserPage/UserPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipes/:id" element={<FullRecipeInformation />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/addRecipe" element={<AddRecipePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
