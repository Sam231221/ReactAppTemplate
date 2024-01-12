import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewUser = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
    },
  });

  //from the url get id param using react-router-dom
  //It is identified when $ sign is used
  const { id } = useParams();

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3001/users/${id}/`);
    console.log(res.data);
    setUser(res.data);
  };
  //data populating in the field for the first render with useEffect
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="container py-4">
      <div className="card p-3 mb-3">
        <div className="card-title">
          <h5>User Id: {id}</h5>
          <hr />
        </div>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>City:</strong> {user.address.city}
        </p>
        <p>
          <strong>Street:</strong> {user.address.street}
        </p>
        <p>
          <strong>Zipcode:</strong> {user.address.zipcode}
        </p>
      </div>
      <Link className="btn btn-primary" to="/">
        <i className="bi bi-arrow-left"></i> back to Home
      </Link>
    </div>
  );
};

export default ViewUser;
