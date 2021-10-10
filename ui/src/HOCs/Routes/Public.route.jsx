import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../Contexts";

const PublicRoute = (props) => {
  const { user } = useContext(UserContext);
  return user._id ? (
    <Redirect to="/" />
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};

export default PublicRoute;
