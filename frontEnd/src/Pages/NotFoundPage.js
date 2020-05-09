import React from "../../node_modules/@types/react";
import { Button } from "../../node_modules/reactstrap/lib";
import {useHistory} from "../../node_modules/react-router-dom";
import { routes } from "../routes/routes";
// import PageNotFoundImage from "../Images/PageNotFoundImage.png";

const NotFoundPage = () => {
  const history = useHistory();
  return (
    <div>
      {/* <img src={PageNotFoundImage} alt="Page Not Found" /> */}
      <h2 style={{ textAlign: "center" }}> Page Not Found </h2>
      <p style={{ textAlign: "center" }}>
      <Button className="btn-home" onClick={()=> history.push(routes.home)}>Go Home</Button>
      </p>
    </div>
  );
};

export default NotFoundPage;
