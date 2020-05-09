import React, { Fragment, useContext } from "react";
import { Button } from "reactstrap";
import {useHistory} from "react-router-dom";
import {routes} from "../routes/routes";
import {userContext} from "../Context/context";

const LeftSideBar = () => {
  const user = useContext(userContext);
  const history = useHistory();

  const startingQuiz = () =>{
    localStorage.setItem("startQuiz",true);
    user.userDetails.startQuiz = true;
    history.push(routes.startQuiz);
  }
  return (
<Fragment>
      <br/>
      <br/>
      {user.isLoggedIn && user.userDetails.startQuiz === false ? (
      // <NavLink href={routes.startQuiz}>Start Quiz</NavLink> 
        <Button className="btn-other" onClick={startingQuiz}>Start Quiz</Button>
      ) : null }
</Fragment>
  );
};

export default LeftSideBar;
