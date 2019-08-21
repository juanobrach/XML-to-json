import * as XLSX from "xlsx";
import { string } from "prop-types";
import axios from "axios";
/*
 *  Get XLSX Workbook from public url of the server
 *  Every Sheet in the workbook is a model.We need to  remove "Historico" sheet is
 *  not a model.
 *  @return json
 *
 */
export const XlsxToJson = async xlsx => {
  console.log("called");
  let response = [];
  let models = [];
  let url = "cars.xlsx";

  let req = await makeRequest("GET", url);
  
  var data = new Uint8Array(req);
  
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
  return response;
};

function makeRequest(method, url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "arraybuffer";
    xhr.open(method, url);
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}
