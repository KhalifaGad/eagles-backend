import React from "react";
import { cacheInitialState } from "../Reducers/Cache.reducer";
import { cacheActions } from "../Reducers/Actions";

export default React.createContext({
  ...cacheInitialState,
  updateCompanies: (dispatch) => (payload) => {
    dispatch({ action: cacheActions.UPDATE_COMPANIES, payload: payload });
  },
  updateClients: (dispatch) => (payload) => {
    dispatch({ action: cacheActions.UPDATE_CLIENTS, payload: payload });
  },
  updateProducts: (dispatch) => (payload) => {
    dispatch({ action: cacheActions.UPDATE_PRODUCTS, payload: payload });
  },
});
