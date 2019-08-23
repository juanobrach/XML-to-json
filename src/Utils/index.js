import * as XLSX from "xlsx";


const VERSION = "Marca/Modelo/Versão";
const MOTOR   = "Modelo de Motor";
const YEAR     = "Ano / Modelo";

/*
 *  Get XLSX Workbook from public url of the server
 *  Every Sheet in the workbook is a model.We need to  remove "Historico" sheet is
 *  not a model.
 *  @return json
 *
 */
export const XlsxToJson = xlsx => {
  return new Promise(function(resolve, reject) {
    let response = [];
    let models = [];
    let url = "cars.xlsx";
    
    makeRequest("GET", url).then( ( file, I ) =>{
      var data = new Uint8Array(file);
      
      var workbook = XLSX.read(data, { type: "array" });
      let sheets = workbook.Sheets;
      /**
       *  Iterarion 1 : Iterate every sheet. Each sheet is a car model wich
       *  contain on the first row the header and then the values
       */
      models = Object.keys(sheets).map(key => {
        let model = key;
        let sheet = XLSX.utils.sheet_to_json(sheets[model], { range: 1 });
    
        // TODO: Actual the XLSX has on every last row of every sheet junk data. Remove from code or
        // remove from the XLSX
        sheet.splice(-1, 1);
        return {
          model: model,
          data: sheet
        };
      });
      response = {
        models : prepareOptionsSelectSchema( Object.keys(sheets)),
        data : models
      }
      resolve(response)
      return
    })
  })
};

function makeRequest(method, url) {
  return new Promise( function(resolve, reject) {
    fetch(url).then(function(response) {
      return response.arrayBuffer();
    }).then(function(json) {
        resolve(json)
    }).catch(function(ex) {
    })
  })
}


/**
 *  We are using Formik as our Form statefull library
 *  Need to prepare a schema for select fields like { value: String, label: String }
 */
function prepareOptionsSelectSchema( options ){
  return options.map( (option, index) => {
      return { value: index, label: option }
  })
}


/**
 *  Step 1
 *  Iterate over each versions available for this car model
 *  
 *  model > data > modelVariants[] 
  */
export const getCarVersionsByModel = ( cars, carModelIndex ) =>{
  let versions = [];
  cars.data.forEach( (carVariants, index ) => {
      if( index ===  carModelIndex ){
        carVariants.data.forEach( (variant) =>{
          Object.keys(variant).forEach( ( column ) => {
            if( column === VERSION ){
              if(  versions.indexOf( variant[column] ) < 0 ){
                versions.push( variant[column] );
              }
            }
          })
        })
      }
  });
  return prepareOptionsSelectSchema(versions);
}

/**
 *  Step 2 ( match [model, version])
 *  Iterate over each versions available for this car model
 *  TODO: validate motors of the same preselected version
 *  model > data > modelVariants[] 
  */
 export const getMotoresByVersion = ( cars, model,  version ) =>{
  let motores = [];
  console.log('model:', model)
  console.log('version:', version)
  cars.data.forEach( (carVariants, index ) => {
      if( index ===  model ){
        carVariants.data.forEach( (variant) =>{
          Object.keys(variant).forEach( ( column ) => {
            console.log('column:', column)
            if( column === MOTOR && variant[VERSION] === version.label ){
              if(  motores.indexOf( variant[column] ) < 0 ){
                motores.push( variant[column] );
              }
            }
          })
        })
      }
  });
  return prepareOptionsSelectSchema(motores);
}

/**
 *  Step 3 ( match [model, version, motor ])
 *  Iterate over each versions available for this car model
 *  model > data > modelVariants[] 
  */
 export const getYearsByMotor = ( cars, model,  version , motor ) =>{
  let years = [];
  cars.data.forEach( (carVariants, index ) => {
      if( index ===  model ){
        carVariants.data.forEach( (variant) =>{
          Object.keys(variant).forEach( ( column ) => {
            if( column === YEAR && variant[VERSION] === version.label && variant[MOTOR] === motor.label ){
              if(  years.indexOf( variant[column] ) < 0 ){
                years.push( variant[column] );
              }
            }
          })
        })
      }
  });
  return prepareOptionsSelectSchema(years);
}


export const getAllCarSelectedData  = ( cars, model,  version , motor, year ) =>{
  let carData = [];
  cars.data.forEach( (carVariants, index ) => {
      if( index ===  model ){
        carVariants.data.forEach( (variant) =>{
          Object.keys(variant).forEach( ( column ) => {
            if(  variant[VERSION] === version.label 
              && variant[MOTOR] === motor.label 
              && variant[YEAR] === year.label
              ){
              if(  carData.indexOf( variant[column] ) < 0 ){
                carData.push( { column: column,  value: variant[column] } );
              }
            }
          })
        })
      }
  });
  return carData;
}