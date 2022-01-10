import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FlightMapContainer from './Map.tsx'
import FlightInfo from './FlightInfo.ts'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
  
);
const flightInfo = new FlightInfo();
let flightMap;
let map;

setTimeout(async function() {
  flightInfo.getOngoingFlights().then(flights => flights.json()).then(flights => {
    flightMap = new FlightMapContainer();
    let newData = FlightMapContainer.fromData(flights);
    flightMap.flights = newData;
    map = flightMap.buildMap();
    flightMap.addMarkers(map);
  })

  setInterval(function() {
    flightInfo.getOngoingFlights().then(flights => flights.json()).then(data => {
      let newData = FlightMapContainer.fromData(data);
      flightMap.flights = newData;
      flightMap.updateMarkers();
    });
  }, 10000);
    
    
}, 200);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
