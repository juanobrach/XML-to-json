import React, { Component } from "react";
import { XlsxToJson } from "./Utils";
import  Form from "./Components/Form";
import  FormResults from "./Components/FormResults";

import  { Container } from 'react-bootstrap';


/**
 *  Manage cars data from xslx file converted to JSON
 *  XLSX file wil be located at specific /public folder
 *  for UPDATES information it's necesary to change the file inside it.
 *  ex: https://uploads.codesandbox.io/uploads/user/df6ff7f5-1e82-4373-8f4a-9930336ba434/Fwi3-ficha-tecnica-equinox.xls
 *
 *  Project components
 *  App
 *   FormComponent
 *   FormResults
 *
 *  States
 *    Intial state of aplication will be a json file with all Brands availables
 *    to populate the first dropdown menu.
 *
 *  Utils
 *    Utils folder contain scripts to controll the process of parse the information
 *    on a schema.
 *  Form
 *    Schema of form would be  [ model, version, motor, year ]
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: false,
      cars: null,
      car: {},
      results: [],
      showResults : false
    };

    this.completeForm = this.completeForm.bind(this);
  }

  componentDidMount() {
    // TODO: Get json from XML (utils)
    XlsxToJson().then( cars => {
      this.setState({ cars: cars })
    });
  }

  // Show Results
  completeForm = ( results ) =>{
    this.setState({
      showResults:true,
      results: results
    })
  }

  render() {
    let car = this.state.cars ? this.state.cars : "";
    if(car){

      return(
        <React.Fragment>
          <Container>
            <h2 className="form-title">Veja as informações sobre o seu veículo:</h2>
            <Form models={this.state.cars.models} cars={this.state.cars} completeForm={this.completeForm} />
            {
              this.state.showResults ? <FormResults  results={this.state.results}/> : ''         
            }
          </Container>
        </React.Fragment>
      )
    }else{
      return (
        <p>Loading ...</p>)
    }
  }
}

export default App;
