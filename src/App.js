import React, {Component} from 'react';

import parkingi from './data/parkingi';

import './App.css';

class App extends Component {



  render(){
    return(
      <div>
        {parkingi.features.map(park =><div key={park.properties.street+park.properties.spots}> {park.properties.street}</div>)}
      </div>
    )
  }
}
export default App;