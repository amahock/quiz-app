import React, { Fragment, useContext } from "react";
import { NavLink } from "reactstrap";
import {routes} from "../routes/routes";
import {userContext} from "../Context/context";

const LeftSideBar = () => {
  const user = useContext(userContext);
  return (
<Fragment>
      <br/>
      <br/>
      {user.isLoggedIn ? (
      <NavLink href={routes.startQuiz}>Start Quiz</NavLink> 
      ) : null }
</Fragment>
  );
};

export default LeftSideBar;
