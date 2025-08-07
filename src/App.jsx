import React from 'react';
import About from './components/About.jsx';
import BitcoinPriceTracker from './components/BitcoinPriceTracker.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <About/>
      <BitcoinPriceTracker />      
    </div>
  );
}

export default App;