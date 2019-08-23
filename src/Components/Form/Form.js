import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import  { Row, Col } from 'react-bootstrap';
import Select from './Select';
import { getCarVersionsByModel, getMotoresByVersion, getYearsByMotor, getAllCarSelectedData } from "./../../Utils";

/**
 *  Schema of form [ model, version, motor, year ]
 *  Form submits on last field change
 */
class FormComponent extends Component {

    constructor( props ){
        super()
        this.state = {
            model : '',
            version:[{label:'', value:''}],
            motor: [{label:'', value:''}],
            selected:{
                model: '',
                version: '',
                motor: ''
            }
        }
        this.handleModelChange   = this.handleModelChange.bind(this)
        this.handleVersionChange = this.handleVersionChange.bind(this)
        this.handleMotorChange   = this.handleMotorChange.bind(this)
        this.handleYearChange    = this.handleYearChange.bind(this)

    }

    handleModelChange( model ){
        console.log("handle change", model )
        let versions = getCarVersionsByModel(  this.props.cars, model.value  );
        this.setState( prevState =>({
            version: versions,
            selected: {
                ...prevState.selected,
                model: model
            } 
        }))
    }

    /**
     *  Match Car > preselected Model and selected version
     */
    handleVersionChange( version ){
        console.log("handle version", version )
        this.setState({motor:null});
        let motors = getMotoresByVersion(  this.props.cars, this.state.selected.model.value, version  );
        this.setState( prevState => ({
            motor: motors,
            selected: {
                ...prevState.selected,
                version: version,
                motor: ''
            } 
        }))

        
    }

    handleMotorChange( motor ){
        let years = getYearsByMotor(  this.props.cars,  this.state.selected.model.value ,  this.state.selected.version,  motor  );
        this.setState( prevState => ({
            year: years,
            selected: {
                ...prevState.selected,
                motor: motor
            }  
        }))
    }

    handleYearChange( year ){
        let carData = getAllCarSelectedData(  this.props.cars,  this.state.selected.model.value ,  this.state.selected.version,  this.state.selected.motor, year  );
        this.setState( prevState => ({
            selected: {
                ...prevState.selected,
                year: year
            }  
        }))

        this.props.completeForm(carData)
    }


    render(){
        return(
            <div id="form-component">
                <Formik
                initialValues={{ model: '', version: '',  motor: '', year: '' }}
                enableReinitialize={true} 
                onSubmit={(values, { setSubmitting }) => {
                    // TODO: Find all car information and display it with a FormResultsComponent
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    }, 400);
                }}
                >
                {({ isSubmitting, values }) => (
                       
                    <Form>
                            <Row>
                           
                                <Col lg={3}>
                                    { /* Version Field  */}
                                    <React.Fragment>
                                        <p className="field-label">MODELO</p>
                                        <Field name="model"  handleChange={this.handleModelChange} component={Select} options={this.props.models} />
                                        <ErrorMessage name="model" component="div" />
                                    </React.Fragment>
                                </Col>

                                <Col lg={3}>
                                    { /* Model Field  */}
                                    <React.Fragment>
                                        <p className="field-label">VERSÃO</p>
                                        <Field name="version"  handleChange={this.handleVersionChange} component={Select} options={this.state.version} />
                                        <ErrorMessage name="version" component="div" />
                                    </React.Fragment>
                                </Col>

                                <Col lg={3}>
                                    { /* Motor Field  */}
                                    <React.Fragment>
                                        <p className="field-label">MOTOR</p>
                                        <Field name="motor"  handleChange={this.handleMotorChange}  component={Select} options={this.state.motor} />
                                        <ErrorMessage name="motor" component="div" />
                                    </React.Fragment>
                                </Col>

                                <Col lg={3}>
                                    { /* Motor Field  */}
                                    <React.Fragment>
                                        <p className="field-label">ANO</p>
                                        <Field name="year" component={Select} options={this.state.year} handleChange={this.handleYearChange}  />
                                        <ErrorMessage name="year" component="div" />
                                    </React.Fragment>
                                </Col>
                              
                            </Row>
                    </Form>
                )}
                </Formik>
            </div>
        )
    }
}


export default FormComponent