import React, { Fragment, useContext } from "../../node_modules/@types/react";
import { userContext} from "../Context/context";

const HomePage = props => {
  const user = useContext(userContext);
  return (
    <Fragment>
      <div className="column-middle">
      {user.isLoggedIn ? (
        <h2>Welcome {user.userDetails.name}</h2>
      ) : (
        <h2>Welcome</h2>
      )}
        <p> Welcome to ABC Schools!!!!</p>
      </div>

    </Fragment>
  );
};

export default HomePage;
