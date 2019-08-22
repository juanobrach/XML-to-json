import * as XLSX from "xlsx";

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
    
    var result = makeRequest("GET", url).then( ( file, I ) =>{
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
        models : Object.keys(sheets),
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
