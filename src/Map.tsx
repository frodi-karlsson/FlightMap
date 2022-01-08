import React from 'react'
import '@immfly/flights-map' 

interface City{
    city: String,
    latitude: Number,
    longitude: Number,
}

interface RouteObject{
    latitude: Number,
    longitude: Number,
    date: String,
}

interface Route{
    routes: RouteObject[];
}

interface Coords{
    latitude: number,
    longitude: number,
}

interface FlightView{
    name: String,
    origin: City,
    destination: City,
    state?: Number,
    color?: String,
    route?: Route,
    actualPosition?: Coords,
}

class FlightMapContainer extends React.Component {
    public flights: FlightView[];

    constructor(flights: FlightView[]){
        super();
        this.flights = flights;
    }

    static testFlightStructures() {
        let origin: City = {
            city: "Sydney",
            latitude: -33.8688,
            longitude: 151.2093,
        }
        let destination: City = {
            city: "Melbourne",
            latitude: -37.8136,
            longitude: 144.9631,
        }
        let actualPosition: Coords = {
            latitude: -35.4833,
            longitude: 148.8322,
        }
        let flightView = {
            name: "S2M",
            origin: origin,
            destination: destination,
            state: 1,
            actualPosition: actualPosition,
        }
        return [flightView];
    }

    static testFlightExample() {
        return [{
            name: 'V131',
            origin: { city: 'Paris', latitude: 40.471926, longitude: -3.56264 },
            destination: { city: 'Toronto', latitude: 49.0127983093, longitude: 2.54999995232 },
            state: 1,
            actualPosition: {latitude:44.587501525878906, longitude:-1.1114948987960815}
        }];
    }

    static testTwoFlights(){
        return [FlightMapContainer.testFlightExample()[0], FlightMapContainer.testFlightStructures()[0]]
    }

    render() {
        let flights = this.flights ? this.flights : FlightMapContainer.testFlightExample();
        return <flights-map ref={(el) => { el && (el.flights = flights) }} />
    }
}

export default FlightMapContainer;