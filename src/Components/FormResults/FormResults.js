import React from 'react';
import  { Row, Col } from 'react-bootstrap';

const FormResults = ( props )=>{


    return(
        <Row id="form-results">
            {
                props.results.map( ( data ) => {
                    return(
                        <Col lg="2">
                            <h4 className="title">{data.column}</h4>
                            <p className="text-content">{data.value}</p>
                        </Col>
                    )
                } )
            }
        </Row>
    )
}


export default FormResults;