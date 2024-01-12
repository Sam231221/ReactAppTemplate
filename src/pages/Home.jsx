import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export const Home = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    console.log("Initiating data request...");
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3001/users/");
    console.log(result.data);
    setUser(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3001/users/${id}/`);
    loadUsers();
  };

  return (
    <div className="container py-4">
      <Header />
      <div className="container mt-2 mb-3">
        <Link to={"/users/add/"} className="btn btn-sm btn-outline-secondary">
          <i class="bi bi-plus-lg"></i> Add User
        </Link>
      </div>
      <table className="table shadow-lg">
        <thead>
          <tr className="table-dark">
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">City</th>
            <th scope="col">Street</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td>{user.address.street}</td>
              <td>
                <Link
                  to={"/users/" + user.id + "/"}
                  className="btn btn-sm btn-primary"
                >
                  <i class="bi bi-eye"></i>
                </Link>
                <Link
                  to={"/users/update/" + user.id + "/"}
                  className="btn btn-sm btn-outline-info mx-2 me-2"
                >
                  <i class="bi bi-arrow-counterclockwise"></i>
                </Link>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="btn btn-sm btn-danger"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
