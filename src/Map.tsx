import React from 'react';
import OlMap from 'ol/Map'; 
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOSM from 'ol/source/OSM';
import OlVectorLayer from 'ol/layer/Vector';
import OlSourceVector from 'ol/source/Vector';
import OlFeature from 'ol/Feature';
import OlGeomPoint from 'ol/geom/Point';
import * as OlProjection from 'ol/proj';


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
    public map;

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
        let actualPosition: Coords = {
            latitude: -35.4833,
            longitude: 148.8322,
        }
        let destination: City = {
            city: "Melbourne",
            latitude: -35.4833,
            longitude: 148.8322,
        }
        let flightView = {
            name: "S2M",
            origin: origin,
            destination: destination,
            state: 2,
            actualPosition: actualPosition,
        }
        return [flightView];
    }

    static testFlightExample() {
        return [{
            name: 'V131',
            origin: { city: 'Paris', latitude: 40.471926, longitude: -3.56264 },
            destination: { city: 'Toronto', latitude:44.587501525878906, longitude:-1.1114948987960815 },
            state: 2,
            actualPosition: {latitude:44.587501525878906, longitude:-1.1114948987960815}
        }];
    }

    static testTwoFlights(){
        return [FlightMapContainer.testFlightExample()[0], FlightMapContainer.testFlightStructures()[0]]
    }

    static fromData(data: any){
        let flights: FlightView[] = [];
        data.states.filter(s => !!s[1] && !!s[2] && !!s[5] && !!s[6]).forEach(state => { // true track = s[10]
            let flightView: FlightView = {
                name: state[1],
                origin: {
                    city: state[2],
                    latitude: state[6],
                    longitude: state[5],
                },
                destination: {
                    city: state[2],
                    latitude: state[6],
                    longitude: state[5],
                },
                state: 2,
                actualPosition: {
                    latitude: state[6],
                    longitude: state[5],
                },
            }
            flights.push(flightView);
        });
        return flights;
    }

    buildMap(){
        let map = new OlMap({
            target: 'map',
            layers: [
                new OlLayerTile({
                    source: new OlSourceOSM()
                })
            ],
            view: new OlView({
                center: [0, 0],
                zoom: 2
            })
        });
        this.map = map;
        this.addMarkers();
        
        return map;

    }

    addMarkers(){
        if(!this.flights || this.flights.length === 0){
            throw new Error("No flights to add");
        }
        console.log(this.flights)
        let markers = new OlVectorLayer({
            source: new OlSourceVector(),
        });

        markers.set('name', 'flightMarker');
        this.map.addLayer(markers);
        this.flights.forEach(flight => {
            let lonLat = OlProjection.fromLonLat([flight.actualPosition.longitude, flight.actualPosition.latitude]);
            let feature = new OlFeature({
                geometry: new OlGeomPoint(lonLat),
                name: flight.name,
                text: flight.name,

            });
            markers.getSource().addFeature(feature);
        });
        console.log(markers.getSource().getFeatures());
    }


    updateMarkers(){ 
        let layer = this.map.getLayers().getArray().find(l => l.get('name') === 'flightMarker');
        if(layer){
            this.map.removeLayer(layer);
        }
        this.addMarkers();
    }

    updateMap(){
        this.map.getView().setCenter([0, 0]);
        this.map.getView().setZoom(2);
    }

    render() {
        if(this.map){
            this.updateMap();
        }
        return (
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
        );
    }
}

export default FlightMapContainer;