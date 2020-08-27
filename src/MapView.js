import React, { Component } from "react";
import 'ol/ol.css';
import OSM from "ol/source/OSM";
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import WKT from 'ol/format/WKT';
import {fromLonLat} from 'ol/proj';
import {useGeographic} from 'ol/proj';
import parkingi from './data/parkingi';
import App from './App';

let styles = {
 
  'Polygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  })
};

// let vectorSource = new VectorSource({
//   features: new GeoJSON().readFeatures(this.props.data),
// });

let styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};

class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      center: [18.606363236904144,54.38519346546863],
      zoom: 16,
      dataParkingi : parkingi,
      
    };

    this.vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(this.state.dataParkingi),
    })
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: styleFunction
    })

    this.olmap = new Map({
      target: null,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.vectorLayer
      ],
      view: new View({
        center:fromLonLat(this.state.center),
        zoom: this.state.zoom
      })
    });
  }

  handleDeleteRow = (oldData) =>{
    console.log(this.state.dataParkingi)
    const dataPF = [...this.state.dataParkingi.features];
    dataPF.splice(dataPF.indexOf(oldData), 1);

    this.setState(previousState => ({
        dataParkingi:{
          "type": "FeatureCollection",
          "features": dataPF,
          }
    }));

    console.log(this.state.dataParkingi)
    // this.vectorSource.refresh();
    // this.olmap.render();
    
  
  }

  handleUpdateRow = (oldata, newData) =>{
     
     
    this.setState((previousState)=> {
      const data = [...previousState.dataParkingi.features];
      data[data.indexOf(oldata)] = newData;
      
      return { ...previousState.dataParkingi, data };
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map");
    
    useGeographic();
  }
//dziala

  render() {
    console.log(this.state.dataParkingi)
    return (
      <div>
        <App dataParkingi={this.state.dataParkingi.features} functionUpdate={this.handleUpdateRow} functionDelete={this.handleDeleteRow}/>
        <div id="map" style={{ width: "100%", height: "500px" }}></div>
      </div>
      
    );
    
  }
}

export default MapView;
