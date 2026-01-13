import React from 'react';
<<<<<<< HEAD
import Header from './components/Header';
import Hero from './components/Hero';
import HowToUse from './components/HowToUse';
import Classifier from './components/Classifier';
import ModelInfo from './components/ModelInfo';
import DeepfakeInfo from './components/DeepfakeInfo';
import Footer from './components/Footer';

function App() {
  return (
    <main>
      <Header />
      <Hero />
      <HowToUse />
      <Classifier />
      <ModelInfo />
      <DeepfakeInfo />
      <Footer />
    </main>
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Edukasi from './pages/Edukasi';
import Games from './pages/Games';
import Deteksi from './pages/Deteksi';

function App() {
  return (
    <Router>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edukasi" element={<Edukasi />} />
          <Route path="/games" element={<Games />} />
          <Route path="/deteksi" element={<Deteksi />} />
        </Routes>
        <Footer />
      </main>
    </Router>
>>>>>>> Ver4
  );
}

export default App;
