import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FlightMapContainer from './Map.tsx'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
  
);
var flightComponent = new FlightMapContainer(FlightMapContainer.testTwoFlights());
setTimeout(function() {
  document.getElementsByTagName('flights-map')[0].flights = flightComponent.flights
  document.getElementsByTagName('flights-map')[0].config = {animation: {enabled: false}, showMarkers: true}
}, 200)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
