import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AddUser = () => {
  let redirect = useNavigate();

  const [user, addUser] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
    },

  });


  const { name, username, email, street, city, zipcode } = user;
  const onInputChange = (e) => {
    //update the previous state
    console.log(e.target.name,e.target.value)
    
    if (e.target.name == "name" || e.target.name == "username" || e.target.name == "email" ){
      addUser({ ...user, [e.target.name]: e.target.value });
      console.log({ ...user, [e.target.name]: e.target.value });
    } else {
      addUser({ ...user,address:{...user.address,[e.target.name]: e.target.value }});
      console.log({ ...user,address:{...user.address,[e.target.name]: e.target.value } });
    } 
   
    
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/users/", user);
    //redirect to home page after posting
    redirect("/");
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 m-auto ">
          <form onSubmit={(e) => onSubmit(e)} className="row g-3 p-3 shadow-lg">
            <h4>ADD USER</h4><hr />
            <div className="col-md-6 ">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter Your Name"
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
                name="usernam"
                placeholder="Set a Username"
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
              <label htmlFor="inputStreet" className="form-label">
                Street
              </label>
              <input
                type="text"
                className="form-control"
                id="inputStreet"
                name="street"
                placeholder="1234 Main St"
                value={street}
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
                value={city}
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
                value={zipcode}
                placeholder="2030"
                id="inputZip"
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="col-12">
              <input type="submit" className="btn btn-primary" value="create" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
