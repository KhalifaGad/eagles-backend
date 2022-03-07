import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../Contexts";

const PrivateRoute = (props) => {
  const { user } = useContext(UserContext);
  return !user._id ? (
    <Redirect to="/login" />
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};

export default PrivateRoute;
