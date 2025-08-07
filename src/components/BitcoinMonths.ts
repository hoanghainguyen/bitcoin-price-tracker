import  { Month } from './Month.ts';
   // Function to generate months since Bitcoin's birth
const getBitcoinMonths = (): Month[] => {
     const startDate = new Date('2011-11-03'); // Bitcoin genesis block
     const endDate = new Date();              // Current date and time (2025-08-07 12:49 PM CEST)
     const months: Month[] = [];

     let currentDate = new Date(startDate);
     const dutchMonths = [
       'januari', 'februari', 'maart', 'april', 'mei', 'juni',
       'juli', 'augustus', 'september', 'oktober', 'november', 'december'
     ];

     while (currentDate <= endDate) {
       const year = currentDate.getFullYear();
       const monthIndex = currentDate.getMonth();
       const monthName = dutchMonths[monthIndex];
       const dateStr = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD

       months.push({ year, month: monthName, date: dateStr });

       // Move to the first day of the next month
       currentDate.setMonth(currentDate.getMonth() + 1);
       currentDate.setDate(1); // Ensure we start at the 1st of the month
     }

     
     //months.sort((a, b) => a.year - b.year); // Ascending first
     months.reverse();

     return months;
   };

   // Generate and log the list (for testing or use in React)
   const bitcoinMonths = getBitcoinMonths();
   console.log('Bitcoin Months:', bitcoinMonths);

   // Export for use in a React component
   export { getBitcoinMonths };
   