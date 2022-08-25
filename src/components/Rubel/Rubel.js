import React, { useEffect, useState } from 'react';
import { dataRef } from '../utilities/Firebase';
const Rubel = () => {
    const [expenseList, setExpenseList] = useState([]);
    useEffect(() => {
        dataRef
          .ref()
          .child("expenseData")
          .on("value", (data) => {
            const getData = Object.values(data.val());
            // console.log(getData);
            setExpenseList(getData)
          });
    }, []);
    const Rubel=[]
    for (const name of expenseList) {
        if (name.firstName === 'Rubel') {
            const firstName = name.firstName;
            const cost = name.cost;
            const itemsName = name.itemsName;
            const date = name.date;
            Rubel.push({firstName,cost,itemsName,date})

        }
    }
    console.log(Rubel);
    console.log(expenseList);
    return (
        <div>
            <h1>this is home</h1>
            <table >
                <tr>
                    <th>Name</th>
                    <th>date</th>
                    <th>ItemName</th>
                    <th>Cost</th>
                </tr>
                {
                    Rubel.map((ru, index) =>  (
                        <tr>
                        <td>{ru.firstName }</td>
                        <td>{ru.date }</td>
                        <td>{ru.itemsName }</td>
                        <td>{ru.cost }</td>
                    </tr> ))
               }
            </table>
        </div>
    );
};

export default Rubel;