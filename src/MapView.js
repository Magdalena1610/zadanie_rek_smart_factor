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
let styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};
class MapView extends Component {

  state = {
      center: [18.606363236904144,54.38519346546863],
      zoom: 16,
      dataParkingi : parkingi,
      vectorLayer :null,
      olmap: null,
    };
  
    
  
  componentDidMount() {
    let vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(this.state.dataParkingi),
    });
    let vectorLayer = new VectorLayer({
       source: vectorSource,
     style: styleFunction
   });
   
    this.state.olmap = new Map({
       target: this.refs.mapContainer,
       layers: [
         new TileLayer({
           source: new OSM()
         }),
         vectorLayer
       ],
       view: new View({
         center:fromLonLat(this.state.center),
         zoom: this.state.zoom
       })
     });
    console.log('componentDidMount')
     useGeographic(); 
    //  this.olmap.setTarget("map");   
  };

  // vectorSource = new VectorSource({
  //     features: new GeoJSON().readFeatures(this.state.dataParkingi),
  //   });
  // vectorLayer = new VectorLayer({
  //     source: this.vectorSource,
  //     style: styleFunction
  // });

  // olmap = new Map({
  //     target: null,
  //     layers: [
  //       new TileLayer({
  //         source: new OSM()
  //       }),
  //       this.vectorLayer
  //     ],
  //     view: new View({
  //       center:fromLonLat(this.state.center),
  //       zoom: this.state.zoom
  //     })
  //   });
  // ;

  handleDeleteRow = (oldData) =>{
    const dataPF = [...this.state.dataParkingi.features]
    dataPF.splice(dataPF.indexOf(oldData), 1)
    this.setState({
        dataParkingi:{
          "type": "FeatureCollection",
          "features": dataPF,
    }});
    console.log('funkcja usuwania')
    
    // this.olmap.render()
    // this.vectorSource.refresh()
    // this.olmap.render() 
  };
  // componentDidUpdate(prevState) {
  //   // Typowy sposób użycia (nie zapomnij porównać właściwości):
  //   if (prevState.dataParkingi !== this.state.dataParkingi) {
  //      let feature = new Feature(new GeoJSON().readFeatures(prevState.dataParkingi));
  //      this.vectorSource.addFeature(feature);
  //      this.olmap.addLayer(this.vectorLayer)
  //    console.log(prevState.dataParkingi);
  //   }

  componentDidUpdate(prevProps, prevState) {
    console.log('Prev state', prevState.dataParkingi); // Before update
    console.log('New state', this.state.dataParkingi); // After update 

    if(prevState.dataParkingi !== this.state.dataParkingi){
      let vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(this.state.dataParkingi),
      });
      let vectorLayer = new VectorLayer({
         source: vectorSource,
       style: styleFunction
     });
       let olmap = new Map({
          target: this.refs.mapUpdate,
          layers: [
            new TileLayer({
              source: new OSM()
            }),
            vectorLayer
          ],
          view: new View({
            center:fromLonLat(this.state.center),
            zoom: this.state.zoom,
          }),     
      })
    //   this.setState({
    //     olmap,
    //   })
      useGeographic(); 
     //  this.olmap.setTarget("map");   
     
    }
  }
    
    // this.state.vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));
    // let feature = new Feature(this.state.dataParkingi.features);
    // this.vectorSource.addFeature(feature);
    // console.log(this.vectorSource.features)
    // this.vectorLayer.setSource({
    //     features: this.state.dataParkingi
    //   });
    // this.state.featuresLayer.setSource(
    //   new VectorSource({
    //     features: this.state.dataParkingi
    //   })
    // ); 
  
  handleUpdateRow = (oldata, newData) =>{    
    this.setState((previousState)=> {
      const data = [...previousState.dataParkingi.features];
      data[data.indexOf(oldata)] = newData;     
      return { ...previousState.dataParkingi, data };
    });
  };

  
  render(){
    return (
      <div>
        <App dataParkingi={this.state.dataParkingi.features} functionUpdate={this.handleUpdateRow} functionDelete={this.handleDeleteRow}/>
        <div ref="mapContainer" style={{ width: "100%", height: "500px" }}></div>
        <div ref="mapUpdate" style={{ width: "100%", height: "500px" }}></div>
      </div>
      
    );
    
  }
}

export default MapView;
