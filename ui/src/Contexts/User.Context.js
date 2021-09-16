import React from "react";
import { userInitialState } from "../Reducers/User.reducer";

export default React.createContext({
  ...userInitialState,
  setUser: () => {
    console.log("PROVIDER NOT IMPELEMENTED YET");
  },
  setBranch: () => {
    console.log("PROVIDER NOT IMPELEMENTED YET");
  },
});
