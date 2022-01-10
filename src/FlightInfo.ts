import React from 'react';

class FlightInfo extends React.Component {
    auth = {user: process.env.REACT_APP_OPENSKY_USER, pass: process.env.REACT_APP_OPENSKY_PASS};
    
    public getOngoingFlights() {
        if(this.auth.pass === undefined || this.auth.user === undefined) {
            throw new Error("Authentication not implemented yet");
        } else {
            return fetch(`https://opensky-network.org/api/states/all`)
        }
        

    }
    
}
export default FlightInfo;
