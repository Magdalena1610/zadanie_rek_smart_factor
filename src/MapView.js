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
import parkingi from './data/parkingi';
import {fromLonLat} from 'ol/proj';
import {useGeographic} from 'ol/proj';




var styles = {
 
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

let vectorSource = new VectorSource({
  features: new GeoJSON().readFeatures(parkingi),
});

let styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};

class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = { center: [18.606363236904144,54.38519346546863], zoom: 16 };

    this.olmap = new Map({
      target: null,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source:vectorSource,
          style: styleFunction
        })
      ],
      view: new View({
        center:fromLonLat(this.state.center),
        zoom: this.state.zoom
      })
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map");
    useGeographic();
  }


  render() {
    console.log(this.state.center)
    return (
      <div id="map" style={{ width: "100%", height: "500px" }}>
      </div>
    );
  }
}

export default MapView;
