import React, { Component } from "react";
import { XlsxToJson } from "./Utils";
import  Form from "./Components/Form";

/**
 *  Manage cars data from xslx file converted to JSON
 *  XLSX file wil be located at specific /public folder
 *  for UPDATES information it's necesary to change the file inside it.
 *  ex: https://uploads.codesandbox.io/uploads/user/df6ff7f5-1e82-4373-8f4a-9930336ba434/Fwi3-ficha-tecnica-equinox.xls
 *
 *  Project components
 *  App
 *   FormComponent
 *   FormResultsComponent
 *
 *  States
 *    Intial state of aplication will be a json file with all Brands availables
 *    to populate the first dropdown menu.
 *
 *  Utils
 *    Utils folder contain scripts to controll the process of parse the information
 *    on a schema.
 *  Form
 *    Schema of form would be  [ model, version, year ]
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: false,
      cars: null,
      car: {}
    };
  }

  componentDidMount() {
    // TODO: Get json from XML (utils)
    let getCars = XlsxToJson().then( cars => {
      console.log( cars );
      this.setState({ cars: cars })
    });
  }

  render() {
    let car = this.state.cars ? this.state.cars : "";
    if(car){

      return(
        <React.Fragment>
          <h1>GM app {car.brand}</h1>;
          <Form models={this.state.cars.models} />
        </React.Fragment>
      )
    }else{
      return (
        <p>Loading ...</p>)
    }
  }
}

export default App;
