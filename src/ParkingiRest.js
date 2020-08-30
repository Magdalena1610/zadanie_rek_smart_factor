import React, { Component } from "react";
import MaterialTable from "material-table";

class ParkingiRest extends Component {
  state = {
    columns: [
      { title: "Nazwa parkingu", field: "name" },
      { title: "Ilość wolnych miejsc", field: "freePlaces" },
    ],
    data: [],
    value: "",
  };
  handleInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
        "X-AUTH-LOGIN": "MagdalenaRomanowska",
        "X-AUTH-TOKEN": "6fee3b56-d8f0-4d68-a4da-3378970237da",
      },
      body: JSON.stringify({
        1: true,
        2: true,
        3: false,
        4: true,
        5: false,
        6: false,
        7: true,
        8: false,
      }),
    };

    fetch(
      "/parking/" + JSON.stringify(this.state.value) ,
      options
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => console.log("error while fetching ", error));
  };

  componentDidMount() {
    const options = { method: "GET", headers: { Origin: "*" } };
    fetch("/parking", options)
      .then((response) => {
        return response.json();
      })
      .then(data  => {

        let newData = [];
      
        console.log(data);
        data.forEach((element) => {
          let counter = 0;
          for (const [key, value] of Object.entries(element.places)) {
            if (value) {
              counter += 1;
            }
          }

          newData.push({ name: element.name, freePlaces: counter });
        });
        this.setState({
          data: newData,
        });
      })
      .catch((error) => console.log("error while fetching ", error));
  }
  render() {
    return (
      <>
        <MaterialTable
          title="Zadanie 2"
          columns={this.state.columns}
          data={this.state.data}
          localization={{
            body: {
              emptyDataSourceMessage: "Brak rekordów do wyświetlenia.",
              addTooltip: "Dodaj",
              deleteTooltip: "Usuń",
              editTooltip: "Edytuj",
              filterRow: {
                filterTooltip: "Filtr",
              },
              editRow: {
                deleteText: "Czy chcesz usunąć?",
                cancelTooltip: "Anuluj",
                saveTooltip: "Zapisz",
              },
            },
            grouping: {
              groupedBy: "Grupuj według:",
            },
            header: {
              actions: "Akcje",
            },
            pagination: {
              labelDisplayedRows: "{from}-{to} z {count}",
              labelRowsSelect: "Rekordów",
              labelRowsPerPage: "Rekordów na stronie:",
              firstAriaLabel: "Pierwsza strona",
              firstTooltip: "Pierwsza strona",
              previousAriaLabel: "Poprzednia strona",
              previousTooltip: "Poprzednia strona",
              nextAriaLabel: "Następna strona",
              nextTooltip: "Następna strona",
              lastAriaLabel: "Ostatnia strona",
              lastTooltip: "Ostatnia strona",
            },
            toolbar: {
              nRowsSelected: "{0} rekordów(s) wybranych(s)",
              showColumnsTitle: "Wyświetl kolumny",
              showColumnsAriaLabel: "Wyświetl kolumny",
              exportTitle: "Eksportuj",
              exportAriaLabel: "Eksportuj",
              exportName: "Eksportuj jako CSV",
              searchTooltip: "Szukaj",
              searchPlaceholder: "Szukaj",
            },
          }}
        />
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group mx-sm-4 mb-3">
            <label htmlFor="inputName">*Nazwa parkingu: </label>
            <input
              value={this.state.value}
              onChange={this.handleInput}
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Nazwa parkingu"
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Wyślij
          </button>
        </form>
      </>
    );
  }
}

export default ParkingiRest;
