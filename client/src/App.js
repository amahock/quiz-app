import React, { useEffect, useState } from "react";
import "./styles.css";
import {Switch,Route,useHistory,useLocation} from "react-router-dom";
import NavHeader from "./Components/NavHeader";
import StartQuiz from "./Components/StartQuiz";
import Quiz from "./Components/Quiz";
import Result from "./Components/Result";
import networkRequests from "./services/networkRequests";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import LeftSideBar from "./Pages/LeftSideBar";
import { userContext ,userDetails} from "./Context/context";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import { routes } from "./routes/routes";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import SignupPage from "./Pages/SignupPage";
import NotFoundPage from "./Pages/NotFoundPage";

const App = () => {
  const location = useLocation();
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stuId,setStuId] = useState("");

  useEffect(() => {
    if (location.pathname === "/") {
      history.replace("/home");
    }

    networkRequests("/user/isLoggedIn")
      .then(response => {
        if (response.loggedInStatus) {
          console.log("Inside the /user/isLoggedIn page then loop" + response);
          console.log("isloggedin value is   :   " + isLoggedIn);
          setIsLoggedIn(true);
          userDetails.stuId = localStorage.getItem("stuId");
          userDetails.name = localStorage.getItem("name");
          userDetails.startQuiz = localStorage.getItem("startQuiz");
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(error => {
        console.log("isloggedin catch part" + error);
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <userContext.Provider value={{ isLoggedIn, setIsLoggedIn ,userDetails,stuId,setStuId }}>
      <div className="App">
        <NavHeader />

        <div className="row">
          <div className="column-side-left" />

          <div className="column-middle">
            <br />
            <br />
            <Switch>
            {/* <Route path="/">
                <HomePage />
              </Route> */}
              <Route path={routes.home}>
                <HomePage />
              </Route>
              <Route path={routes.signUp}>
                <SignupPage />
              </Route>
              <Route path={routes.forgotPassword}>
                <ForgotPasswordPage />
              </Route>
              <Route path={routes.login}>
                <LoginPage />
              </Route>
              <Route path={routes.resetPassword}>
                <ResetPasswordPage />
              </Route>
              <Route path={routes.startQuiz}>
                <StartQuiz/>
              </Route>
              <Route path={routes.quiz}>
                <Quiz/>
              </Route>
              <Route path={routes.quizResult}>
                <Result/>
              </Route>
              {/* <Redirect to="/home" /> */}
              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
          </div>

          <div className="column-side-right">
            <LeftSideBar />
          </div>
        </div>
      </div>
    </userContext.Provider>
  );
};

export default App;
