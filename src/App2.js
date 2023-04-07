import ImportCsv from './importCsv/importCsv';
import React, { createContext, useState } from "react";



//全域tableContext
export const TableContext = createContext();
function TableProvider({ children }) {
  const [tableData, setTableData] = useState([]);
  return (
    <TableContext.Provider value={{ tableData, setTableData }}>
      {children}
    </TableContext.Provider>
  );
}



function App() {
  return (
    <TableProvider>
      <ImportCsv></ImportCsv>
    </TableProvider>
  );
}

export default App;
