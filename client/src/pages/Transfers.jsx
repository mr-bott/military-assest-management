
import { useState, useEffect } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export default function Transfers() {
  const [form, setForm] = useState({
    fromBase: "",
    toBase: "",
    equipmentType: "",
    quantity: "",
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
        const transfers =
          res.data.logs?.filter(
            (item) => item.type === "transfer"
          ) || [];

        setHistory(transfers);
      });
  };

  useEffect(() => {
    if (
      role === "admin" ||
      role === "logistics"
    ) {
      loadHistory();
    }
  }, [role]);

  const save = async () => {
    await axios.post(
      `${API}/transfer`,
      form,
      {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    alert("Transferred");

    setForm({
      fromBase: "",
      toBase: "",
      equipmentType: "",
      quantity: "",
    });

    loadHistory();
  };

  return (
    <div>
      <h1>Transfers</h1>

      <div className="form">
        <input
          placeholder="From Base"
          value={form.fromBase}
          onChange={(e) =>
            setForm({
              ...form,
              fromBase: e.target.value,
            })
          }
        />

        <input
          placeholder="To Base"
          value={form.toBase}
          onChange={(e) =>
            setForm({
              ...form,
              toBase: e.target.value,
            })
          }
        />

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

        <button onClick={save}>
          Save
        </button>
      </div>

      {/* HISTORY ONLY FOR ADMIN / LOGISTICS */}
      {(role === "admin" ||
        role === "logistics") && (
        <>
          <h2 style={{ marginTop: "30px" }}>
            Transfer History
          </h2>

          <table>
            <thead>
              <tr>
                <th>From Base</th>
                <th>To Base</th>
                <th>Item</th>
                <th>Qty</th>
                <th>User</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item, i) => (
                <tr key={i}>
                  <td>{item.fromBase}</td>
                  <td>{item.toBase}</td>
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