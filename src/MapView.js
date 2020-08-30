import React, { Component } from "react";
import 'ol/ol.css';
import OSM from "ol/source/OSM";
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import Select from 'ol/interaction/Select';
import Overlay from 'ol/Overlay';
import {Fill, Stroke, Style} from 'ol/style';
import {Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {fromLonLat} from 'ol/proj';

import {useGeographic} from 'ol/proj';

import {pointerMove} from 'ol/events/condition';
import ParkingiRest from './ParkingiRest';

import parkingi from './data/parkingi';
import './MapView.css';
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
    }

   

  componentDidMount() {
    let container = this.refs.popup;
    let content = this.refs.popupContent;

    let overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    
    let vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(this.state.dataParkingi),
    });
    let vectorLayer = new VectorLayer({
       source: vectorSource,
     style: styleFunction
   });

   let select = new Select({
    condition: pointerMove,
  });
  
    let olmap = new Map({
       target: this.refs.mapContainer,
       layers: [
         new TileLayer({
           source: new OSM()
         }),
         vectorLayer
       ],
       overlays: [overlay],
       view: new View({
         center:fromLonLat(this.state.center),
         zoom: this.state.zoom
       })
     });
     olmap.addInteraction(select);
     select.on('select', function (e) {
       
      if ( e.selected.length >0){
        let coordinate = e.selected[0].getGeometry().getCoordinates()
        let properties = e.selected[0].getProperties();
        console.log(properties.street);
        console.log(coordinate[0][0]);
        let ifPaid ='';
        if(properties.paid){
          ifPaid='Tak';
        }else{
          ifPaid ='Nie';
        }
      
        content.innerHTML = '<span>Ulica: <b>'+ properties.street +'</b></span><br>'+
                            '<span>Liczba miejsc parkingowych: <b>'+ properties.spots +'</b></span><br>'+
                            '<span>W tym dla niepełnosprawnych: <b>'+ properties.handicappedSpots +'</b></span><br>'+
                            '<span>Płatny: <b>'+ ifPaid +'</b></span><br><br>'+
                            'Lokalizacja: <code>' + coordinate[0][0] + '</code>';
        overlay.setPosition(coordinate[0][0]);

     

    }
     });

   
    useGeographic(); 
  };

  

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
 

  componentDidUpdate(prevProps, prevState) {

    console.log(this.state.zoom)


    console.log('Prev state', prevState.dataParkingi); // Before update
    console.log('New state', this.state.dataParkingi); // After update 
    this.olmap.render() 
  }

  handleUpdateRow = (oldata, newData) =>{    
    this.setState((previousState)=> {
      const data = [...previousState.dataParkingi.features];
      data[data.indexOf(oldata)] = newData;     
      return { ...previousState.dataParkingi, data };
    });
  };

  handleClickRow = (rowData) =>{    
    console.log(rowData.geometry.coordinates[0][0])
    let coordinates = rowData.geometry.coordinates[0][0]
    this.setState({
      zoom : 20,
      center: coordinates
    })
    
  };

  
  render(){
    return (
      <div>
        <App dataParkingi={this.state.dataParkingi.features} functionUpdate={this.handleUpdateRow} functionDelete={this.handleDeleteRow}  functionClick={this.handleClickRow}/>
        <div ref="mapContainer" style={{ width: "100%", height: "500px" }}></div>
        <div ref="popup" className="ol-popup">    
          <div ref="popupContent"></div>
        </div>
        <div><ParkingiRest/></div>
      </div>
      
    );
    
  }
}

export default MapView;
