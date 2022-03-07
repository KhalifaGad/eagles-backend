import React, { useReducer, useContext, useEffect } from "react";
import { CacheContext, APIContext } from "../../Contexts";
import { cacheInitialState, CacheReducer } from "../../Reducers";
import { ToastsStore } from "react-toasts";

const UserProvider = (props) => {
  const [state, dispatch] = useReducer(CacheReducer, cacheInitialState);
  const { updateClients, updateCompanies, updateProducts } =
    useContext(CacheContext);
  const { API } = useContext(APIContext);

  useEffect(() => {
    async function fetchCompanies() {
      const result = await API.getCompanies();
      if (result.error) {
        ToastsStore.error(result.error);
      } else {
        updateCompanies(dispatch)(result);
      }
    }

    async function fetchClients() {
      const result = await API.getClients();
      if (result.error) {
        ToastsStore.error(result.error);
      } else {
        updateClients(dispatch)(result);
      }
    }

    async function fetchProducts() {
      const result = await API.getProducts();
      if (result.error) {
        ToastsStore.error(result.error);
      } else {
        updateProducts(dispatch)(result);
      }
    }

    fetchProducts();
    fetchCompanies();
    fetchClients();
  }, [API, updateProducts, updateClients, updateCompanies]);

  return (
    <CacheContext.Provider
      value={{
        companies: state.companies,
        clients: state.clients,
        products: state.products,
        updateClients: updateClients(dispatch),
        updateCompanies: updateCompanies(dispatch),
        updateProducts: updateProducts(dispatch),
      }}
    >
      {props.children}
    </CacheContext.Provider>
  );
};

export default UserProvider;
