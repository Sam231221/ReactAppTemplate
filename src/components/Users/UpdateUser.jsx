import React, { useState, useEffect } from "react";
import {Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const UpdateUser = () => {

  let redirect = useNavigate();

  //from the url get id param using react-router-dom  
  //It is identified when $ sign is used
  const { id } = useParams();
  const [user, updateUser] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
    },
  });
  const { name, username, email, address } = user;
  const onInputChange = (e) => {

    if (e.target.name == "name" || e.target.name == "username" || e.target.name == "email" ){
      updateUser({ ...user, [e.target.name]: e.target.value });
      console.log({ ...user, [e.target.name]: e.target.value });
    } else {
      updateUser({ ...user,address:{...user.address,[e.target.name]: e.target.value }});
      console.log({ ...user,address:{...user.address,[e.target.name]: e.target.value } });
    } 

  };


  //getUser data for populating in the field for the first render with useEffect
  const getUser = async () => {
    const user = await axios.get(`http://localhost:3001/users/${id}/`);
    console.log(user.data);
    //update the user state
    updateUser(user.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    //using put method
    await axios.put(`http://localhost:3001/users/${id}/`, user);
    //redirect to home page after posting
    redirect("/");
  };

  return (
    <div className="container">
      <div className="row mt-2">

        <div className="col-md-6 m-auto ">
        <Link className="mb-5 btn btn-sm btn-primary" to="/">
           <i class="bi bi-arrow-left"></i> back to Home
        </Link>
          <form onSubmit={(e) => handleOnSubmit(e)} className="row g-3 p-3 shadow-lg">
            <h4>UPDATE USER</h4><hr />
            <div className="col-md-6 ">
           
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                id="name"
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="col-md-6 ">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                id="username"
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="col-md-6 ">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="example@gmail.com"
                value={email}
                id="inputEmail4"
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="col-12">
              <label htmlFor="inputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                name="suite"
                placeholder="1234 Main St"
                value={address.street}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                name="city"
                placeholder="Pokhara"
                value={address.city}
                id="inputCity"
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="col-md-2">
              <label htmlFor="inputZip" className="form-label">
                Zip
              </label>
              <input
                type="text"
                className="form-control"
                name="zipcode"
                value={address.zipcode}
                placeholder="2030"
                id="inputZip"
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="col-12">
              <input type="submit" className="btn btn-primary" value="update" />
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
