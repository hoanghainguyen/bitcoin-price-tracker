import React from 'react';

function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">About This Project</h2>
      <p className="text-gray-600 leading-relaxed">
        This Bitcoin  Price Tracker fetches historical Bitcoin prices by month since  November 2011. Built with React 19 and Vite, it demonstrates API integration,
        state management with hooks, and responsive design. Check out the code on GitHub or
        connect with me <a href="https://my-portfolio-gules-alpha-89.vercel.app/> (Hoang Hai Nguyen )</a> to learn more!
      </p>
    </section>
  );
}

export default About;