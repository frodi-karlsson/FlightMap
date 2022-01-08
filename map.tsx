import React from 'react'
import '@immfly/flights-map' 

class City{
    city: String;
    latitude: Number;
    Longitute: Number;

    constructor(city: String, latitude: Number, Longitute: Number){
        this.city = city;
        this.latitude = latitude;
        this.Longitute = Longitute;
    }

    asDict(){
        return {
            city: this.city,
            latitude: this.latitude,
            Longitute: this.Longitute
        }
    }
}

class Flight{
    name: String;
    origin: City;
    destination: City;

    constructor(name: String, origin: City, destination: City){
        this.name = name;
        this.origin = origin;
        this.destination = destination;
    }

    asDict(){
        return {
            name: this.name,
            origin: this.origin.asDict(),
            destination: this.destination.asDict()
        }
    }
}

class RouteObject{
    latitude: Number;
    Longitute: Number;
    date: String;

    constructor(latitude: Number, Longitute: Number, date: String){
        this.latitude = latitude;
        this.Longitute = Longitute;
        this.date = date;
    }

    asDict(){
        return {
            latitude: this.latitude,
            Longitute: this.Longitute,
            date: this.date
        }
    }
}

class Route{
    routes: RouteObject[];

    constructor(routes: RouteObject[]){
        this.routes = routes;
    }

    getRoute(){
        return this.routes;
    }
}

class FlightView{
    flight: Flight;
    state: Number;
    color: String;
    route: Route;

    constructor(flight: Flight, state: Number, color: String, route?: Route){
        this.flight = flight;
        this.state = state;
        this.color = color;
        this.route = route;
    }

    asDict(){
        return {
            flight: this.flight.asDict(),
            state: this.state,
            color: this.color,
            route: this.route.getRoute()
        }
    }
}

class FlightMapContainer extends React.Component {
    flights: FlightView[];

    constructor(flights: FlightView[]){
        super();
        this.flights = flights;
    }

    static testFlight() {
        let origin = new City("Sydney", -33.8688, 151.2093);
        let destination = new City("Melbourne", -37.8136, 144.9631);
        let flight = new Flight("Sydney to Melbourne", origin, destination);
        let route = new Route([new RouteObject(-33.8688, 151.2093, "2020-01-01"), new RouteObject(-37.8136, 144.9631, "2020-01-02")]);
        let flightView = new FlightView(flight, 0, "red", route);
        return flightView;
    }

    render() {
        let flights = this.flights ? this.flights : FlightMapContainer.testFlight();
        return (
            <div className="map-container">
                <div className="map-container-inner">
                    <flights-map ref={(el) => { (el.flights = flights)} } />
                </div>
            </div>
        );
    }
}

export default FlightMapContainer;