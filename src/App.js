import React, { useState, useEffect } from 'react';
import Papa from "papaparse";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/src/modal'
import CsvDownloadButton from 'react-json-to-csv';



export default function App() {
  const [data, setData] = useState([]);
  const [csvName, setCsvName] = useState(null);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
   
  // //for merge new .csv data
  // const[mergeData , setMergerData] = useState([]);



  //csv->json
  function importCsv(e) {
    const csvFile = e.target.files[0];
    const csvName = csvFile.name;
    console.log(csvName);
    setCsvName(csvName);

    Papa.parse(e.target.files[0], {
      header: true,
      download: true,
      delimiter: ",",
      dynamicTyping: true,
      complete: results => {
        setData(results.data);
        console.log(data);
      }
    });
  }

//  使用pspsparser會使存下來的.csv內容亂碼
//   const handleOnSubmit = () => {
//     //json->csv
//     const csvData = Papa.unparse(data);

//     const saveDataAsFile = (csvName, data) => {
//       const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
//       const link = document.createElement('a');
//       const csvUrl = URL.createObjectURL(blob);
//       link.setAttribute('href', csvUrl);
//       // link.setAttribute('download', `${csvName}.csv`);
//       link.setAttribute('download', `${csvName}`);
//       link.style.visibility = 'hidden';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     };
  
//     saveDataAsFile(csvName, csvData);
// };




  //分頁用, 每頁資料10筆
  useEffect(() => {
    const start = (page - 1) * 10;
    const end = start + 10;
    setPageData(data.slice(start, end));
  }, [page, data]);


  //當文字內容改變時,pageData和Data要同時儲存
  const handleChange = (e, index) => {
    const updatedItems = [...pageData]
    // const updatedItems = [...data]
    updatedItems[index].words=e.target.value
    console.log(updatedItems);
    console.log(index);
    setPageData(updatedItems);

  };



  return (
    <div>
      <input type="file" onChange={importCsv} />
      <table>
        <thead>
          <tr>
            <th>filename</th>
            <th>words</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* {data.map((value,index) => ( */}
          {pageData.map((value,index) => (
            <tr key={index}>
              <td><img   src={`./images/${value.filename}` }/></td>
              <td><img  style={{ width: "100%", height: "100%" }} src={`./images/${value.filename}` }/></td>
              <td><img  style={{ width: 200, height: 100 }}  src={`./images/${value.filename}` }/></td>

              <td>
                <input type="text" value={value.words} defaultValue={value.words} onChange={(e) => handleChange(e, index)} />
              </td>
            </tr>
          ))}
          <td>
            <CsvDownloadButton data={data} filename={`${csvName}`}> save </CsvDownloadButton>
            {/* <button onClick={handleOnSubmit}>save</button> */}
          </td>
        </tbody>
      </table>

      <div>
        Page:
        <select value={page} onChange={(e) => setPage(Number(e.target.value))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </div>

    </div>
  );
}