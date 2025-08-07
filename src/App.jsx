import React from 'react';
import BitcoinPriceTracker from './components/BitcoinPriceTracker.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <BitcoinPriceTracker />
      <About/>
    </div>
  );
}

export default App;