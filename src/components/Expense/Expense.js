import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { dataRef } from "../utilities/Firebase";
import "./Expense.css";
const Expense = () => {
  const [expenseData, setExpenseData] = useState({
    firstName: "",
    date: "",
    itemsName: "",
    cost: "",
  });
  const [expenseList, setExpenseList] = useState([]);

  let name, value;
  const postExpenseData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setExpenseData({ ...expenseData, [name]: value });
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    const { firstName, date, itemsName, cost } = expenseData;
    if (firstName && date && itemsName && cost) {
      const res = fetch(
        "https://wezaza-35afa-default-rtdb.firebaseio.com/expenseData.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            date,
            itemsName,
            cost,
          }),
        }
      );
      if (res) {
        setExpenseData({
          firstName: "",
          date: "",
          itemsName: "",
          cost: "",
        });
        alert("data uploaded");
      }
    } else {
      alert("please fill the data");
    }
  };



  useEffect(() => {
    dataRef
      .ref()
      .child("expenseData")
      .on("value", (data) => {
        const getData = Object.values(data.val());
        
        setExpenseList(getData)
      });
  }, []);
  let costs = 0;
        for (const cost of expenseList) {

         costs=costs+parseInt(cost.cost)
        }
        console.log(costs);
console.log(expenseList);

  return (
    <div className="expense-container">
      <form method="post">
        <input
          type="text"
          placeholder="your name"
          name="firstName"
          value={expenseData.firstName}
          onChange={postExpenseData}
        />
        <input
          type="date"
          name="date"
          value={expenseData.date}
          onChange={postExpenseData}
        />
        <input
          type="text"
          placeholder="item name"
          name="itemsName"
          value={expenseData.itemsName}
          onChange={postExpenseData}
        />
        <input
          type="number"
          placeholder="cost"
          name="cost"
          value={expenseData.cost}
          onChange={postExpenseData}
        />
        <button onClick={handleExpenseSubmit}>Submit</button>
      </form>
      <div>
        <table>
        <tr>
                <th>Empoyee Name</th>
                <th>Date</th>
                <th>Item Name</th>
                <th>Expense</th>
       </tr>
      
        {
          expenseList.map((expense, index) => <tr>
          <td>{expense.firstName}</td>
          <td>{expense.date}</td>
          <td>{expense.itemsName}</td>
          <td>{expense.cost}</td>
            
          
      
          </tr>
          )
          }
          <tr>
            <td></td>
            <td></td>
            <td>Total Expense</td>
          <td>{ costs}</td>
          </tr>
          </table>
      </div>
    </div>
  );
};

export default Expense;
