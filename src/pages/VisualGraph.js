import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Accordion from '../components/Accordion';
import { Link } from "react-router-dom";

const VisualGraph = () => {
  const [accordionData, setAccordionData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    Axios.get('http://127.0.0.1:8000/graph_data')
      .then(response => {
        const neo4jData = response.data.data;
        // Process the Neo4j data and create Accordion components
        const accordionComponents = neo4jData.map((item, index) => {
          // Access data correctly based on the response structure
          const title = `Transaction ${index + 1}`;
          const from = item.p[0].addressId;
          const to = item.p[2].addressId;

          // Adjust these lines according to your data structure
          const amount = ''; // Add your logic to access the amount
          const date = '';   // Add your logic to access the date
          const time = '';   // Add your logic to access the time
          const state = '';  // Add your logic to access the state

          return (
            <Accordion
              key={index}
              title={title}
              from={from}
              to={to}
              amount={amount}
              date={date}
              time={time}
              state={state}
            />
          );
        });

        setAccordionData(accordionComponents);
        /*const neo4jData = response.data.data;
        // Process the Neo4j data and create Accordion components
        const accordionComponents = neo4jData.map((item, index) => {
          // Check if item.start and item.end exist
          if (item.start && item.end) {
            const title = `Transaction ${index + 1}`;
            const from = item.start.properties.addressId;
            const to = item.end.properties.addressId;
            const amount = item.properties.amount;
            const date = item.properties.date;
            const time = item.properties.time;
            const state = item.properties.state;

            return (
              <Accordion
                key={index}
                title={title}
                from={from}
                to={to}
                amount={amount}
                date={date}
                time={time}
                state={state}
              />
            );
          } else {
            // Handle cases where item.start or item.end is undefined
            return (
              <Accordion
                key={index}
                title={`Transaction ${index + 1}`}
              />
            );
          }
        });

        setAccordionData(accordionComponents);*/
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {accordionData}
    </div>
  );
};

export default VisualGraph;
