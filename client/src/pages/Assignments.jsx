

import { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;


export default function Assignments() {
  const [form, setForm] = useState({
    equipmentType: "",
    quantity: "",
    soldier: "",
  });

  const [history, setHistory] = useState([]);

  const role = localStorage.getItem("role");

  const loadHistory = () => {
    axios
      .get(`${API}/dashboard`, {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const assignments =
          res.data.logs?.filter(
            (item) =>
              item.type === "assignment"
          ) || [];

        setHistory(assignments);
      });
  };

  useEffect(() => {
    if (
      role === "admin" ||
      role === "commander"
    ) {
      loadHistory();
    }
  }, [role]);

  const save = async () => {
    await axios.post(
      `${API}/assignment`,
      form,
      {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    alert("Assigned Successfully");

    setForm({
      equipmentType: "",
      quantity: "",
      soldier: "",
    });

    loadHistory();
  };

  return (
    <div>
      <h1>Assignments</h1>

      <div className="form">
        <input
          placeholder="Equipment"
          value={form.equipmentType}
          onChange={(e) =>
            setForm({
              ...form,
              equipmentType:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({
              ...form,
              quantity:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Soldier Name"
          value={form.soldier}
          onChange={(e) =>
            setForm({
              ...form,
              soldier:
                e.target.value,
            })
          }
        />

        <button onClick={save}>
          Save
        </button>
      </div>

      {/* HISTORY FOR ADMIN / COMMANDER */}
      {(role === "admin" ||
        role === "commander") && (
        <>
          <h2 style={{ marginTop: "30px" }}>
            Assignment History
          </h2>

          <table>
            <thead>
              <tr>
                <th>Base</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Assigned To</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item, i) => (
                <tr key={i}>
                  <td>{item.base}</td>
                  <td>
                    {item.equipmentType}
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.doneBy}</td>
                  <td>
                    {new Date(
                      item.date
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}