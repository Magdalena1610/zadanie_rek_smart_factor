import React from 'react';
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
      tableRef: React.createRef()
    });
  
    return (
      <MaterialTable
        title="Zadanie 1"
        columns={state.columns}
        data={state.data}
        tableRef={state.tableRef}
        onRowClick={(event, rowData) => {
          rowData.tableData.checked = !rowData.tableData.checked;
          state.tableRef.current.dataManager.changeRowSelected(
             rowData.tableData.checked,
             [rowData.tableData.id]
          );
          state.tableRef.current.onSelectionChange(rowData);
          //console.log(rowData)
          props.functionClick(rowData);
      }}
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
              nRowsSelected: '{0} rekord(ów) wybranych',
              showColumnsTitle: 'Wyświetl kolumny',
              showColumnsAriaLabel: 'Wyświetl kolumny',
              exportTitle: 'Eksportuj',
              exportAriaLabel: 'Eksportuj',
              exportName: 'Eksportuj jako CSV',
              searchTooltip: 'Szukaj',
              searchPlaceholder: 'Szukaj'
          }
     }}
    
      />
    );
  }



export default App;