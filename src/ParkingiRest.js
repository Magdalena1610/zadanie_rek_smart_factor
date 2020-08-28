import React, { Component } from "react";
import MaterialTable from 'material-table';



class ParkingiRest extends Component {
    state = {
        columns: [
            { title: 'Nazwa parkingu', field: 'name' },
            // { title: 'Ilość wolnych miejsc', field: '' },
          ],
          data: [],
    }
  

  componentDidMount () {

    const options = { method: 'GET', headers: { Origin: '*' } };
    fetch('https://rekrutacja-sf.herokuapp.com/parking', options)
        .then(response =>response.json()) 
        .then(data => {




            
            this.setState({
                data,
            })
            console.log(this.state.data)}
        )
        .catch(error => console.log('error while fetching ', error));


  }
  render() {
    return (
      <MaterialTable
        title="Zadanie 2"
        columns={this.state.columns}
        data={this.state.data}
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
                nRowsSelected: '{0} rekordów(s) wybranych(s)',
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
    )
  }
}

export default ParkingiRest;



        