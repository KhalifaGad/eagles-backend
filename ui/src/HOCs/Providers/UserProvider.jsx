import React, { useReducer } from "react";
import { UserContext } from "../../Contexts";
import UserReducer, { userInitialState } from "../../Reducers/User.reducer";

const UserProvider = (props) => {
  const [userData] = useReducer(UserReducer, userInitialState);

  return (
    <UserContext.Provider
      value={{
        ...userData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
