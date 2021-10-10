import React, { useReducer } from "react";
import { UserContext } from "../../Contexts";
import UserReducer, { userInitialState } from "../../Reducers/User.reducer";
import { userActions } from "../../Reducers";

const UserProvider = (props) => {
  const [userData, dispatch] = useReducer(UserReducer, userInitialState);

  function setUser(user) {
    dispatch({ action: userActions.SET_USER, payload: user });
  }

  function setBranch(branch) {
    dispatch({ action: userActions.SET_BRANCH, payload: branch });
  }

  return (
    <UserContext.Provider
      value={{
        ...userData,
        setUser,
        setBranch,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
