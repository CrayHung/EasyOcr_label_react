import React,{useState} from 'react';
import { TableContext } from "../App";


const InputText = ({index , value}) => {
    const [tableData, setTableData] = useState(TableContext);


    const handleDataChange = (index, e) => {    
        console.log(index)              //0
        console.log(e.target.value)     //กรุงเทพมหานครk

        const newData = [...tableData]; 
        console.log(newData);
        setTableData(
            newData.map((item) => (
              <tr>
                <td>
                  <input value={item.filename} />
                </td>
                <td>
                  <input value={item.words} />
                </td>
              </tr>
            ))
          );
    };

      

    return (
        <div>
            <input
            type="text"
            name="words"
            value={value.words}
            onChange={e => handleDataChange(index, e)}
          />
        </div>
    );
}

export default InputText;
