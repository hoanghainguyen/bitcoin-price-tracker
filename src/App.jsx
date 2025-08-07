import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BitcoinPriceTable from './components/BitcoinPriceTable';
import About from './components/About';
import './App.css';

function App() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch Bitcoin price data');
        }
        return response.json();
      })
      .then((data) => {
        const formattedPrices = data.prices.map((price) => ({
          date: new Date(price[0]).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          close: price[1],
        }));
        setPrices(formattedPrices);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-6 text-gray-600 text-lg">Loading prices...</div>;
  if (error) return <div className="text-center p-6 text-red-600 text-lg">Error: {error}</div>;

  return (
    <div className="App">
      <Header />
      <BitcoinPriceTable prices={prices} />
      <About />
    </div>
  );
}

export default App;