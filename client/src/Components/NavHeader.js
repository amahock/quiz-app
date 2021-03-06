import React, { useState, useContext, Fragment } from "react";
import "../styles.css";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavLink,
  Nav
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { userContext } from "../Context/context";
import { routes } from "../routes/routes";

const NavHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("in Navheader:" + isOpen);
  const history = useHistory();
  const user = useContext(userContext);
  const toggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) console.log("isOpen value :" + isOpen);
    else console.log("isOpen value is false : " + isOpen);
  };
  const logout = event => {
    event.preventDefault();
    user.setIsLoggedIn(false);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("stuId");
    localStorage.removeItem("name");
    localStorage.removeItem("startQuiz");
    history.push(routes.home);
  };
  return (
    <div>
      <Navbar light expand="md" className="nav-bar-x">
        <NavbarBrand href={routes.home}>ABC Schools</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Nav className="mr-auto" navbar></Nav>
         {user.isLoggedIn ? (
            <Fragment>
              <NavLink className="nav-header-login-btn" href="" onClick={logout}>
                Logout
              </NavLink>
            </Fragment>
          ) : (
            <>
              <NavLink className="nav-header-login-btn" href={routes.login}>Student Login</NavLink>
              <NavLink className="nav-header-login-btn" href={routes.signUp}>SignUp</NavLink>
            </>
          )}
      </Navbar>
    </div>
  );
};

export default NavHeader;
