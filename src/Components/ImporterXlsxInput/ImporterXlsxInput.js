import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function ImporterXlsxInput() {
  const onDrop = useCallback(e => {
    // Do something with the files
    console.log("Droped", e);
    e.stopPropagation(); e.preventDefault();
    var files = e.dataTransfer.files, f = files[0];
    var reader = new FileReader();
    reader.onload = (e) =>{
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, {type: 'array'});
      var SheetName = workbook.SheetNames[0];
      var Sheet = workbook.Sheets.Sheet1;

      document.getElementById("result").append( SheetName )
      console.log('nuestra hoja magica',Sheet)
      /* DO SOMETHING WITH workbook HERE */
    }
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
export default ImporterXlsxInput;
