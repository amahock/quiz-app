import React, { Fragment, useContext } from "../../node_modules/@types/react";
import { NavLink } from "../../node_modules/reactstrap/lib";
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
