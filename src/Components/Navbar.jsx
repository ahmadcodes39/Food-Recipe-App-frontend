import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "./UseContext/userContext";
import { useContext, useState } from "react";
import { verifyProfile } from "./ApiRoutes/apiRoutes";
import { logoutUser } from "./ApiRoutes/apiRoutes";
import { QueryContext } from "./UseContext/searchQuery";

const Navbar = () => {
  const { query, setQuery, setIsQuery } = useContext(QueryContext);
  const { userInfo, setUserInfo } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserLogin = async () => {
      await verifyProfile(setUserInfo);
    };

    checkUserLogin();
  }, []);

  const username = userInfo?.name;

  const handleClick = async () => {
    await logoutUser(setUserInfo, navigate);
  };
  const handleSearchQuery = (e) => {
    setQuery(e.target.value);
    const value = e.target.value
   setIsQuery(value.length===0)
   console.log(value)
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top ">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <h2 style={{ color: "#28a745" }}>FlavorFusion</h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div className=" navbar-collapse" id="navbarSupportedContent">
                {username ? (
                  <>
                    <ul className="navbar-nav text-start">
                      <li className="nav-item">
                        <Link
                          className="nav-link fs-5 btn hoverLinks text-start"
                          to="/add-recipe"
                        >
                          Add Recipe
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link fs-5 hoverLinks"
                          to="/my-recipe"
                        >
                          My Recipes
                        </Link>
                      </li>
                    </ul>
                    <input
                      type="search"
                      name="search"
                      className="form-control inputBg w-50 w-sm-100  ms-lg-4 mb-3 mb-lg-0 d-md-block"
                      required
                      autoComplete="off"
                      placeholder="e.g: Chicken Biryani...."
                      value={query}
                      onChange={handleSearchQuery}
                      // onBlur={() => setIsQuery(true)}
                    />
                    <Link
                      className="ms-auto btn btn-danger hoverBtn text-light"
                      to="/logout"
                      onClick={handleClick}
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <div className="ms-auto d-flex">
                    <Link
                      className="btn btn-success text-light me-2"
                      to="/login"
                    >
                      Login
                    </Link>
                    <Link
                      className="btn btn-outline-success hoverBtn"
                      to="/signup"
                    >
                      SignUp
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
     
    </>
  );
};
export default Navbar;
