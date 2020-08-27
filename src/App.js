import React, {Component} from 'react';
import MaterialTable from 'material-table';

import './App.css';


const App = (props) => {
    const [state, setState] = React.useState({
      columns: [
        { title: 'Nazwa ulicy', field: 'properties.street' },
        { title: 'Liczba miejsc', field: 'properties.spots' },
        { title: 'Liczba miejsc dla niepełnosprawnych', field: 'properties.handicappedSpots', type: 'numeric' },
        { title: 'Płatny', field: 'properties.paid', type: 'boolean'},
      ],
      data: props.dataParkingi,
    });
  
    return (
      <MaterialTable
        title="Editable Example"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  props.functionUpdate(oldData, newData)
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return(                   
                      { ...prevState, data }); 
                  });    
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                props.functionDelete(oldData)
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return( 
                   // props.function({ ...prevState, data }),
                    { ...prevState, data });
                });
              }, 600);
            }),
        }}
      />
    );
  }



export default App;