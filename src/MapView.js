import React, { Component } from "react";
import Map from "ol/Map";
import View from "ol/View";
import Tile from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import FeatureFormat from 'ol/format/Feature';
import WKT from 'ol/format/WKT';
import parkingi from './data/parkingi';

console.log(parkingi)

const wkt =
  'POLYGON((10.689 -25.092, 34.595 ' +
  '-20.170, 38.814 -35.639, 13.502 ' +
  '-39.155, 10.689 -25.092))';

 const format = new WKT();

 const feature = format.readFeature(wkt, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857',
  })

class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = { center: [0, 0], zoom: 1 };

    this.olmap = new Map({
      target: null,
      layers: [
        new Tile({
          source: new OSM()
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [feature]
          })
        })
      ],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom
      })
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map");

    // // Listen to map changes
    // this.olmap.on("moveend", () => {
    //   let center = this.olmap.getView().getCenter();
    //   let zoom = this.olmap.getView().getZoom();
    //   this.setState({ center, zoom });
    // });
  }

  render() {
    return (
      <div id="map" style={{ width: "100%", height: "360px" }}>
      </div>
    );
  }
}

export default MapView;
