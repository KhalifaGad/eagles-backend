import { cacheActions } from "./Actions";

export const cacheInitialState = {
  companies: [],
  clients: [],
  products: [],
};

export default function CacheReducer(state, { action, payload }) {
  switch (action) {
    case cacheActions.UPDATE_COMPANIES:
      const newCompanies = Array.isArray(payload) ? payload : [payload];
      return { ...state, companies: [...state.companies, ...newCompanies] };
    case cacheActions.UPDATE_CLIENTS:
      const newClients = Array.isArray(payload) ? payload : [payload];
      return { ...state, clients: [...state.clients, ...newClients] };
    case cacheActions.UPDATE_PRODUCTS:
      const newProducts = Array.isArray(payload) ? payload : [payload];
      return { ...state, products: [...state.products, ...newProducts] };
    default:
      return state;
  }
}
