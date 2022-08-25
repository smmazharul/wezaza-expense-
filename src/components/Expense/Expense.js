import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { dataRef } from "../utilities/Firebase";
import "./Expense.css";
const Expense = () => {
  const [expenseData, setExpenseData] = useState({
    firstName: "",
    date: "",
    catagory: "",
    itemsName: "",
    unitCost: "",
    quantity: "",
    note:""
    
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
    const { firstName, date,catagory, itemsName,unitCost,quantity,note } = expenseData;
    if (firstName && date && catagory && itemsName && unitCost && quantity ) {
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
            note,
            catagory,
            unitCost,
            quantity
           
          }),
        }
      );
      if (res) {
        setExpenseData({
          firstName: "",
          date: "",
          catagory:"",
          itemsName: "",
          note:"",
          unitCost: "",
          quantity:""
         
        });
        // alert("uploaded");
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

        setExpenseList(getData);
      });
  }, []);
  let total = 0;
  for (const cost of expenseList) {
    const quantity = parseInt(cost.quantity);
    const subtotal = parseInt(cost.unitCost);
   total=total+(quantity*subtotal)
  }
  //         console.log(costs);
  // console.log(expenseList);

  return (
    <div className="expense-container">
      <form method="post">
        <select
          id="cars"
          name="firstName"
          onChange={postExpenseData}
          value={expenseData.firstName}
        >
           <option value=""> --Please choose a Name-- </option>
          <option value="Rubel">Rubel</option>
          <option value="Akib">Akib</option>
          <option value="Shihab">Shihab</option>
          <option value="Kofir">Kofir</option>
          <option value="Kofir">Mazharul</option>
        </select>
        {/* <input
          type="text"
          placeholder="your name"
          name="firstName"
          value={expenseData.firstName}
          onChange={postExpenseData}
        /> */}
        <input
          type="date"
          name="date"
          value={expenseData.date}
          onChange={postExpenseData}
        />
       <select
          id="cars"
          name="catagory"
          onChange={postExpenseData}
          value={expenseData.catagory}
          
        >
          <option value="">Please choose a Catagory</option>
          <option value="Head Office">Head Office </option>
          <option value="Field Office">Field Office</option>
          <option value="Livestock">Livestock Feed</option>
          <option value="Mushroom Project">Mushroom Project</option>
          <option value="Horticulture Project">Horticulture Project</option>
          <option value="Transportation">Transportation </option>
        </select>
        <input
          type="text"
          placeholder="Item name"
          name="itemsName"
          value={expenseData.itemsName}
          onChange={postExpenseData}
        />
        <input
          type="text"
          placeholder="Special Note"
          name="note"
          value={expenseData.note}
          onChange={postExpenseData}
        />
        <input
          type="number"
          placeholder="unit Cost"
          name="unitCost"
          value={expenseData.unitCost}
          onChange={postExpenseData}
        />
        <input
          type="number"
          placeholder="quantity"
          name="quantity"
          value={expenseData.quantity}
          onChange={postExpenseData}
        />
        
        <button onClick={handleExpenseSubmit}>Submit</button>
      </form>
      <div className="bf-table-responsive bf-table-responsive--zebra">
        <table className="bf-table">
          <tr>
            <th>Empoyee Name</th>
            <th>Date</th>
            <th>Catagory</th>
            <th>Item Name</th>
            <th>Special Note</th>
            <th>Unit Cost</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>

          {expenseList.map((expense, index) => (
            <tr>
              <td>{expense.firstName}</td>
              <td>{expense.date}</td>
              <td>{expense.catagory}</td>
              <td>{expense.itemsName}</td>
              <td>{expense.note}</td>
              <td>{expense.unitCost}</td>
              <td>{expense.quantity}</td>
              <td>{expense.quantity * expense.unitCost}</td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Total Expense</td>
            <td>{total}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Expense;
