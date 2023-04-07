/**
 * 
 * 1. images under public/images folder
 * 2. click 大圖 show big pic   (or original pic?
 * 3. click plate number can change word and save
 */
import React, { useState,useEffect } from "react";
import Papa from "papaparse";
import { TableContext } from "../App";
import ReactTable from "./ReactTable"
import ImgButton from "./ImgButton";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/src/modal'
import InputText from "./InputText";


export default function ImportCsv() {
  const [tableData, setTableData] = useState(TableContext);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);


  //for pagenation
  useEffect(() => {
    const start = (page - 1) * 10;
    const end = start + 10;
    setPageData(tableData.slice(start, end));
  }, [page, tableData]);



  //csv->json
  function importCsv(e) {
    Papa.parse(e.target.files[0], {
      header: true,
      dynamicTyping: true,
      complete: results => {
        setTableData(results.data);
      }
    });
  }

  //for 修改資料
  const handledateChange = (e, index) => {
    const newData = tableData.map((d) => {
      if (e.index === index) {
        return { ...d, text: e.target.value };
      }
      return d;
    });
    setTableData(newData);
  };


  return (
    <div>
      <input type="file" onChange={importCsv} />
      <div>
      <table>
        <thead>
          <tr>
            <th>filename</th>
            <th>words</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((value,index) => (
            <tr key={index}>
              <td>{value.filename}</td>
              <td>
                <input type="text" value={value.words} onChange={(e) => handledateChange(e, index)} />
              </td>
            </tr>
          ))}
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

    </div>
  );
}

