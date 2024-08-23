import React, { useState } from "react";
import signUpImg from "../../assets/signUpImge.jpg";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../ApiRoutes/apiRoutes";

const SignUpPage = () => {
  const [isBoxChecked,setIsBoxChecked] = useState(false)

  const navigate  = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preV) => {
      return {
        ...preV,
        [name]: value,
      };
    });
  };

  const handleShowPassword=()=>{
    setIsBoxChecked(!isBoxChecked)
  }


  const handleFormSubmit= async(e)=>{
    e.preventDefault()
    await registerUser(formData,navigate)
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
      <div className="row justify-content-center align-items-stretch">
        <div className="content text-center p-4 col-sm-7  col-lg-4 col-md-6 rounded-corners rounded">
          <h2 className="mb-5 text-success">Create New Account</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                className="form-control custome-border w-100 "
                required
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                className="form-control custome-border w-100 "
                required
                placeholder="Your E-mail"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type={`${isBoxChecked?'text':'password'}`}
                name="password"
                className="form-control custome-border w-100"
                required
                placeholder="Your Password"
                value={formData.password}
                onChange={handleChange}
              />
              <p className="mt-3 text-start fw-bold">Password length is up to 5 characters</p>
            </div>
            <div className="actionLinks d-flex justify-content-between align-items-center mb-3 mt-3">
              <div className="mb-3 form-check ms-1">
                <input
                  type="checkbox"
                  className="form-check-input border border-secondary"
                  id="exampleCheck1"
                  checked={isBoxChecked}
                  onChange={handleShowPassword}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Show Password
                </label>
              </div>
            </div>
            <div className="mb-3 d-flex justify-content-center align-items-center">
              <button type="submit" className="btn btn-success w-100 ">
                Register
              </button>
            </div>
            <div className="mt-3 text-center">
              <span>
                Already have an Account{" "}
                <Link to="/login" className="text-decoration-none  links-color">
                  Login here
                </Link>{" "}
              </span>
            </div>
          </form>
        </div>
        <div className="col-lg-7 col-md-6 col-sm-5 margin d-flex justify-content-center align-items-center ">
          <img
            style={{ width: "100%" }}
            src={signUpImg}
            alt=""
            className="img-fluid img-styling rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
