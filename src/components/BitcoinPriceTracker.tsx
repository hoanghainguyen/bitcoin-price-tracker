import React, { useState, useEffect } from 'react'; // Import React tools to build the page
import './BitcoinPriceTracker.css'; // Import styles to make it look nice
import { getBitcoinMonths } from './BitcoinMonths'; // Get the list of months
import type { Month } from './Month'; // Import the Month type to organize our data

// Main component to show Bitcoin prices
const BitcoinPriceTracker = () => {

  
  const apiKey = import.meta.env.VITE_BITCOIN_API_KEY;
  // State to hold the prices, loading status, and any errors
  const [prices, setPrices] = useState<Month[]>([]); // List of prices for each month
  const [loading, setLoading] = useState<boolean>(true); // True while we wait for data
  const [error, setError] = useState<string | null>(null); // Store any error messages

  // This runs when the page loads to get Bitcoin prices
  useEffect(() => {
    // Check if we have an API key from the .env file
    //console.log('API Key Check:', process.env.VITE_BITCOIN_API_KEY);
    //const apiKey = process.env.VITE_BITCOIN_API_KEY;
    if (!apiKey) {
      setError('Oeps, geen API-sleutel! Heb je de .env file ingesteld?'); // Error if no key
      setLoading(false); // Stop loading since we can’t fetch
      return; // Stop here if no key
    }

    // Get the list of months from BitcoinMonths
    const months = getBitcoinMonths();
    let fetchedPrices: { date: string; price: number }[] = []; // Empty list for prices

    // Start loading data
    setLoading(true);
    setError(null); // Clear any old errors

    // Function to fetch the price for one month
    const fetchPrice = (month: Month, index: number) => {
      // Convert date to a number the API understands
      const unixTimestamp = Math.floor(new Date(month.date).getTime() / 1000);
      fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=EUR&toTs=${unixTimestamp}&limit=1&aggregate=1&api_key=${apiKey}`)
        .then((response) => {
          // Check if the API worked
          if (!response.ok) {
            throw new Error(`Geen prijs voor ${month.date}`); // Error if it fails
          }
          return response.json(); // Get the data
        })
        .then((data) => {
          // Get the price from the data, use 0 if none
          const eurPrice = data.Data[0]?.close || 0;
          fetchedPrices.push({ date: month.date, price: eurPrice }); // Add to our list

          console.log('fetchedPrices:', fetchedPrices);

          // When all prices are fetched, update the page
          if (fetchedPrices.length === months.length) {
            setPrices(fetchedPrices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
            setLoading(false); // Done loading
          } 
          // Fetch the next month’s price
          else if (index + 1 < months.length) {
            fetchPrice(months[index + 1], index + 1);
          }
        })
        .catch((err) => {
          // Log the error and use 0 as a price if it fails
          console.log(`Fout bij ophalen prijs voor ${month.date}:`, err);
          fetchedPrices.push({ date: month.date, price: 0 });
          if (fetchedPrices.length === months.length) {
            setPrices(fetchedPrices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
            setLoading(false); // Done even with errors
          } else if (index + 1 < months.length) {
            fetchPrice(months[index + 1], index + 1);
          }
        });
    };

    // Start fetching prices from the first month
    if (months.length > 0) {
      fetchPrice(months[0], 0);
    } else {
      setError('Oeps, de blockchain neemt een koffiepauze! Geen maanden om op te halen.'); // No months error
      setLoading(false); // Stop loading
    }
  }, []); // Empty array means this runs only once when the page loads

  // What to show on the page
  return (
    <div className="bitcoin-tracker"> {/* Main container with styles */}
      <h1>Bitcoin Prijs Tracker</h1> {/* Big title */}
      <p style={{ fontSize: '14px', color: '#666' }}>
        Prijzen zijn historische schattingen in Euro (EUR) via CryptoCompare, beperkt door gratis API.
      </p> {/* Small note about the data */}
      {loading && <p>Prijzen aan het minen in Euro… niet aan Satoshi vertellen!</p>} {/* Loading message */}
      {error && <p>{error}</p>} {/* Show error if there is one */}
      {!loading && !error && ( // Show table only when loaded and no errors
        <table>
          <thead>
            <tr>
              <th>Maand</th> {/* Table header for month */}
              <th>Prijs (EUR)</th> {/* Table header for price */}
            </tr>
          </thead>
          <tbody>
            {prices.map((item) => {
              // Find the month details for this price
              const month = getBitcoinMonths().find(m => m.date === item.date);
              return (
                <tr key={item.date}> {/* Each row has a unique key */}
                  <td>
                    {month 
                      ? `${month.month} ${month.year}` 
                      : new Date(item.date).toLocaleString('nl-NL', { month: 'long', year: 'numeric' })}
                  </td> {/* Show month and year */}
                  <td>€{item.price.toFixed(2)}</td> {/* Show price with 2 decimals */}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BitcoinPriceTracker; // Make this component available to other files