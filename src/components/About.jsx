import React from 'react';

function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">About This Project</h2>
		  <p className="text-gray-600 leading-relaxed">
		  Deze Bitcoin Price Tracker haalt historische Bitcoin-prijzen op per maand sinds november 2011. Gebouwd met React 19 en Vite, demonstreert het API-integratie,
		  statusbeheer met hooks en responsief design. Bekijk de code op GitHub of
		  neem contact met mij <a href="https://my-portfolio-gules-alpha-89.vercel.app" /> (Hoang Hai Nguyen )</a>   op voor meer informatie!       
      </p>
    </section>
  );
}

export default About;