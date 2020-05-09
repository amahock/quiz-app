import React, { useState, useContext } from "react";
import "../styles/loginStyle.css";
import { useHistory } from "react-router-dom";
import networkRequests from "../services/networkRequests";
import { userContext } from "../Context/context";
import FormLayout from "../Components/FormLayout";
import { routes } from "../routes/routes";

const LoginPage = props => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const user = useContext(userContext);

  const history = useHistory();

  const updateEmail = event => {
    setEmail(event.target.value);
  };

  const updatePassword = event => {
    setPassword(event.target.value);
  };

  const formSubmit = event => {
    event.preventDefault();

    networkRequests("/user/login", "POST", { email, password })
      .then(response => {
        user.setIsLoggedIn(true);
        localStorage.setItem("jwtToken", response.jwtToken);
        localStorage.setItem("stuId", response.userId);
        localStorage.setItem("name", response.name);
        const name = JSON.stringify(response.name);
        user.userDetails.name = name;
        user.userDetails.stuId = response.userId;
        user.stuId = response.userId;
        history.push(routes.home, { usrname: name });
      })
      .catch(error => {

        user.setIsLoggedIn(false);
        // console.log(error.status);
        // console.log("entered into login route catch part");
        if(error.status === "user not found"){
          setErrorMessage("***Email is not registered. Please use SignUp link to register");
        } else {
        setErrorMessage("***Invalid username and password!!!");
        }
      });
  };

  const formContent = [
    <div key="formContentLoginPage">
      <form className="form-signin" onSubmit={formSubmit}>
        <div className="form-label-group">
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            onChange={updateEmail}
            required
            autoFocus
          />
          <label htmlFor="inputEmail">Email address</label>
        </div>

        <div className="form-label-group">
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            onChange={updatePassword}
            required
          />
          <label htmlFor="inputPassword">Password</label>
        </div>

       <button
          className="btn btn-lg btn-primary btn-block text-uppercase"
          type="submit"
        >
          Sign in
        </button>

        <hr className="my-4" />
        <button
          className="btn btn-lg btn-primary btn-block text-uppercase"
          type="button"
          onClick={() => history.push(routes.forgotPassword)}
        >
          Forgot Password
        </button>
        <hr className="my-4" />
        <div className="errorMsg">{errorMessage}</div>
      </form>
    </div>
  ];

  return <FormLayout heading="Login" formContent={formContent} />;
};

export default LoginPage;
