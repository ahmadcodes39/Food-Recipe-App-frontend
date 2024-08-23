import React, { useState } from "react";
import { forgotPassword } from "../ApiRoutes/apiRoutes";
import { useNavigate } from "react-router-dom";

const ForgotPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit=async(e)=>{
    e.preventDefault()
    await forgotPassword(email,navigate)

  }
  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{ height: "70vh" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <form className="forgot-container p-5 border rounded-3 shadow" onSubmit={handleSubmit}>
              <h1 className="text-success mt-3 mb-3 text-center">
                Forgot Password
              </h1>
              <div className="mb-4">
                <input
                  style={{ padding: "0.6rem" }}
                  type="email"
                  name="email"
                  className="form-control border-1 border-secondary fs-5"
                  required
                  autoComplete="off"
                  autoFocus
                  placeholder="Your E-mail"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-3 mb-3">
                <button type="submit" className="btn btn-success w-100 fs-5">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPage;
