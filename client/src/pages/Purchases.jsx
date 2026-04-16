import { useState, useEffect } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export default function Purchases() {
  const [form, setForm] = useState({
    base: "HQ",
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
        const purchases =
          res.data.logs?.filter(
            (item) => item.type === "purchase"
          ) || [];

        setHistory(purchases);
      });
  };

  useEffect(() => {
    if (
      role === "admin" ||
      role === "logistics"
    ) {
      loadHistory();
    }
  }, []);

  const save = async () => {
    await axios.post(
      `${API}/purchase`,
      form,
      {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    alert("Purchased");

    setForm({
      base: "HQ",
      equipmentType: "",
      quantity: "",
    });

    loadHistory();
  };

  return (
    <div>
      <h1>Purchases</h1>

      <div className="form">
        {/* <input
          placeholder="Base"
          value={form.base}
          onChange={(e) =>
            setForm({
              ...form,
              base: e.target.value,
            })
          }
        /> */}

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
            Purchase History
          </h2>

          <table>
            <thead>
              <tr>
                <th>Base</th>
                <th>Item</th>
                <th>Qty</th>
                <th>User</th>
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