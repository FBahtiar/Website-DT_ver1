import React from 'react';
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
  );
}

export default App;
