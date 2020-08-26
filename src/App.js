import React, {Component} from 'react';
import MaterialTable from 'material-table';
import MapView from './MapView';
import parkingi from './data/parkingi';
import './App.css';

class App extends Component {

  state = {
    columns: [
      { title: 'Nazwa ulicy', field: 'properties.street' },
      { title: 'Liczba miejsc', field: 'properties.spots' },
      { title: 'Liczba miejsc dla niepełnosprawnych', field: 'properties.handicappedSpots', type: 'numeric' },
      { title: 'Płatny', field: 'properties.paid', type: 'boolean' },
    ],
    dataParkingi: parkingi,

  }

  handleOnRowAdd = newData => new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        this.setState(prevState => {
          const data = [...prevState.data];
          data.push(newData);
          return { ...prevState, data };
        });
      }, 600)
  });

  handleOnRowUpdate = oldData =>  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      this.setState(prevState => {
        const data = [...prevState.data];
        console.log(data)
        data.splice(data.indexOf(oldData), 1);
        return { ...prevState, data };
        
      });
      console.log(this.prevState)  
    }, 600)
    
  });

  handleOnRowDelete = oldData =>  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      const data = [...this.state.dataParkingi.features];
        data.splice(data.indexOf(oldData), 1);
      this.setState( {
       data,
      });
    }, 600)
  });


  render(){
    return (
      <div>
      <MaterialTable
        title="Parking"
        columns={this.state.columns}
        data={this.state.dataParkingi.features}
        editable={
        {
          onRowAdd: this.handleOnRowAdd,
          onRowUpdate: this.handleOnRowUpdate,
          onRowDelete: this.handleOnRowDelete
        }
      }
        localization={{
          body: {
              emptyDataSourceMessage: "Brak rekordów do wyświetlenia.",
              addTooltip: 'Dodaj',
              deleteTooltip: 'Usuń',
              editTooltip: 'Edytuj',
              filterRow: {
                  filterTooltip: 'Filtr'
              },
              editRow: {
                  deleteText: 'Czy chcesz usunąć?',
                  cancelTooltip: 'Anuluj',
                  saveTooltip: 'Zapisz'
              }
          },
          grouping: {
              placeholder: "Tirer l'entête ...",
              groupedBy: 'Grupuj według:'
          },
          header: {
              actions: 'Akcje'
          },
          pagination: {
              labelDisplayedRows: '{from}-{to} z {count}',
              labelRowsSelect: 'Rekordów',
              labelRowsPerPage: 'Rekordów na stronie:',
              firstAriaLabel: 'Pierwsza strona',
              firstTooltip: 'Pierwsza strona',
              previousAriaLabel: 'Poprzednia strona',
              previousTooltip: 'Poprzednia strona',
              nextAriaLabel: 'Następna strona',
              nextTooltip: 'Następna strona',
              lastAriaLabel: 'Ostatnia strona',
              lastTooltip: 'Ostatnia strona'
          },
          toolbar: {
              addRemoveColumns: 'Ajouter ou supprimer des colonnes',
              nRowsSelected: '{0} rekordów(s) wybranych(s)',
              showColumnsTitle: 'Wyświetl kolumny',
              showColumnsAriaLabel: 'Wyświetl kolumny',
              exportTitle: 'Eksportuj',
              exportAriaLabel: 'Eksportuj',
              exportName: 'Eksportuj jako CSV',
              searchTooltip: 'Szukaj',
              searchPlaceholder: 'Szukaj'
          }
     }}/>
     <div>
     <MapView dataP={this.state.dataParkingi}/>
     </div>
     </div>
    )
  }}
  



export default App;