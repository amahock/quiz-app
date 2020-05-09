import React, { useState, Fragment } from "../../node_modules/@types/react";
import { useHistory } from "../../node_modules/react-router-dom";
import networkRequests from "../services/networkRequests";
import { Button } from "../../node_modules/reactstrap/lib";
import FormLayout from "../Components/FormLayout";
import { routes } from "../routes/routes";

const ForgotPasswordPage = () => {

  // const btnStyle = {color:"blue",background-color:"#ea4335"};

  const history = useHistory();

  const [email, setEmail] = useState();
  const [showError, setShowError] = useState(false);
  const [messageFromServer, setMessageFromServer] = useState("");
  const [showNullError, setShowNullError] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  // const [checkingEmail,setCheckingEmail] = useState(false);
  // const [statusMessage,setStatusMessage] = useState("");

  const updateEmail = event => {
    setEmail(event.target.value);
  };

  const sendEmail = event => {
    event.preventDefault();
    // setCheckingEmail(true);
    if (email === "") {
      setShowError(false);
      setMessageFromServer("");
      setShowNullError(true);
      // setCheckingEmail(false);
    } else {
      setSendingEmail(true);
      networkRequests(routes.forgotPassword, "POST", { email })
        .then(response => {
          console.log(response.data);
          if (response.data === "email sent") {
            console.log("mail sent sucess");
            setShowError(false);
            setMessageFromServer("recovery email sent");
            setShowNullError(false);
            setSendingEmail(false);
            // setCheckingEmail(false);
          } else if (response.data === "email not in db") {
            // console.log("email not present" + response.data);
            setShowError(true);
            setMessageFromServer("");
            setShowNullError(false);
            setSendingEmail(false);
            // setCheckingEmail(false);
          }else{
            console.log("some error happened in sending email");
            setShowError(true);
            setMessageFromServer("");
            setShowNullError(false);
            setSendingEmail(false);
          }

        })
        .catch(error => {
          console.log("error message from server" + error);
        });
    }
  };

  const formContent = [
    <div key="formContent-forgotPasswordPage">
    <form className="form-signin" onSubmit={sendEmail}>
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
      <button
        className="btn btn-lg btn-primary btn-block text-uppercase"
        type="submit"
      >
        Send Password Reset Email
      </button>
    </form>
    </div>
  ];
  return (
    <Fragment>
      <FormLayout heading="Forgot Password" formContent={formContent} />
      <div>
      {/* {checkingEmail && !sendingEmail? (
          <div>
            <h4>Verifying email address. Please wait....</h4>
          </div>
        ) : null} */}
        {sendingEmail && messageFromServer === "" ? (
          <div>
            <h4>Sending email. Please wait....</h4>
          </div>
        ) : null}
        {showNullError && (
          <div>
            <p>The email address cannot be null.</p>
          </div>
        )}
        {showError && (
          <div>
            <h4 className="errorMsg">
              That email address isn&apos;t recognized. Please try again with valid email address
            </h4>
          </div>
        )}
        {messageFromServer === "recovery email sent" && (
          <div>
            <h3>Password Reset Email Successfully Sent!</h3>
          </div>
        )}
        <hr/>
        <Button className="btn-home" onClick={()=> history.push(routes.home)}>Go Home</Button>
        
      </div>
    </Fragment>
  );
};

export default ForgotPasswordPage;
