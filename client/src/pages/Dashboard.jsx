
import { useEffect, useState } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export default function Dashboard() {
  const [data, setData] = useState({});

  const role = localStorage.getItem("role");
  const userBase = localStorage.getItem("base");

  useEffect(() => {
    axios
      .get(`${API}/dashboard`, {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => setData(res.data));
  }, []);

  // TOTAL SUMMARY
  const totalItems = {};

  data.assets?.forEach((item) => {
    if (totalItems[item.equipmentType]) {
      totalItems[item.equipmentType] += item.quantity;
    } else {
      totalItems[item.equipmentType] = item.quantity;
    }
  });

  return (
    <div>
      <h1>Dashboard</h1>

      {/* ADMIN VIEW */}
      {role === "admin" && (
        <>
          <h2 style={{ marginTop: "30px" }}>
            Total Assets Summary
          </h2>

          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Total Quantity</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(totalItems).map(
                ([name, qty], i) => (
                  <tr key={i}>
                    <td>{name}</td>
                    <td>{qty}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <h2 style={{ marginTop: "30px" }}>
            Inventory By Base
          </h2>

          <table>
            <thead>
              <tr>
                <th>Base</th>
                <th>Item Name</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              {data.assets?.map((item, i) => (
                <tr key={i}>
                  <td>{item.base}</td>
                  <td>{item.equipmentType}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* COMMANDER VIEW */}
      {role === "commander" && (
        <>
          <h2 style={{ marginTop: "30px" }}>
            {userBase} Base Inventory Summary
          </h2>

          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Total Quantity</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(totalItems).map(
                ([name, qty], i) => (
                  <tr key={i}>
                    <td>{name}</td>
                    <td>{qty}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </>
      )}

      {/* RECENT TRANSACTIONS FOR ALL */}
      <h2 style={{ marginTop: "30px" }}>
        Recent Transactions
      </h2>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Item</th>
            <th>Qty</th>
            <th>Base</th>
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.logs?.map((x, i) => (
            <tr key={i}>
              <td>{x.type}</td>
              <td>{x.equipmentType}</td>
              <td>{x.quantity}</td>

              <td>
                {x.base ||
                  `${x.fromBase || ""} → ${
                    x.toBase || ""
                  }`}
              </td>

              <td>{x.doneBy}</td>

              <td>
                {new Date(
                  x.date
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}