import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Recarga from "./pages/Recarga";
import TabelaCRUD from "./pages/TabelaCRUD";

import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container-principal">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/admin" element={<TabelaCRUD />} />
            <Route path="/recarga" element={<Recarga />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
