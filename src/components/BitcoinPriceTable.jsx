import React from 'react';

function BitcoinPriceTable({ prices }) {
  return (
    <section id="prices" className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Bitcoin Daily Prices (Last 7 Days)</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-4 text-left text-gray-800">Date</th>
              <th className="border p-4 text-left text-gray-800">Closing Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price) => (
              <tr key={price.date} className="hover:bg-gray-50">
                <td className="border p-4">{price.date}</td>
                <td className="border p-4">${price.close.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default BitcoinPriceTable;