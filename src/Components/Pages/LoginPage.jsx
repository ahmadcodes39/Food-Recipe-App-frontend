import React, { useState } from "react";
import loginImg from "../../assets/loginImg.webp";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../ApiRoutes/apiRoutes";
import { useContext } from "react";
import { userContext } from "../UseContext/userContext";

const LoginPage = () => {
  const {setUserInfo} = useContext(userContext)
  const navigate = useNavigate()
  const [isBoxChecked,setIsBoxChecked] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange=(e)=>{
    const {name,value} = e.target
    setFormData((preV)=>{
      return({
        ...preV,
        [name]:value
      })
    })
  }
  const handleShowPassword=()=>{
    setIsBoxChecked(!isBoxChecked)
  }

  const handleformSubmit=async(e)=>{
    e.preventDefault()
    await loginUser(formData,setUserInfo,navigate)
  }



  return (
    <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
      <div className="row justify-content-center align-items-stretch">
        <div className="content text-center p-4 col-sm-7  col-lg-4 col-md-6 rounded-corners rounded">
          <h1 className="mb-5 text-success mt-4">Login Account</h1>
          <form onSubmit={handleformSubmit}>
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
              <div className="forgotPass mb-3 d-sm-block d-md-flex">
                <Link
                  to="/forgotPassword"
                  className="text-decoration-none links-color  "
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div className="mb-3 d-flex justify-content-center align-items-center">
              <button type="submit" className="btn btn-success w-100 ">
                Login
              </button>
            </div>
            <div className="mt-3 text-center">
              <span>
                I have no account{" "}
                <Link
                  to="/signup"
                  className="text-decoration-none  links-color"
                >
                  Register here
                </Link>{" "}
              </span>
            </div>
          </form>
        </div>
        <div className="col-lg-7 col-md-6 col-sm-5 margin d-flex justify-content-center align-items-center ">
          <img
            src={loginImg}
            alt=""
            className="img-fluid img-styling rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
