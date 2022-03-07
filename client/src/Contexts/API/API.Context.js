import React from "react";
import axios from "axios";
import * as URLs from "./URLs";

class CoreAPI {
  constructor() {
    this.client = axios.create({
      baseURL: URLs.BASE_URL,
      headers: {
        "Accept-Language": "en",
      },
      withCredentials: true,
    });
    this._setupClient();
  }

  _setupClient() {
    this.client.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        const errorMsg = error.response?.data?.error ?? "Something went wrong";
        return { error: errorMsg };
      }
    );
  }

  login(mobile, password) {
    return this.client.post(URLs.LOGIN, { password, mobile });
  }

  getCities() {
    return this.client.get(URLs.CITIES);
  }

  addClient(client, address) {
    return this.client.post(URLs.CLIENTS, { client, address });
  }

  getClients() {
    return this.client.get(URLs.CLIENTS);
  }

  addCompany(company, managers, address) {
    return this.client.post(URLs.COMPANIES, { company, managers, address });
  }

  getCompanies() {
    return this.client.get(URLs.COMPANIES);
  }

  getProducts() {
    return this.client.get(URLs.PRODUCTS);
  }

  addProduct(data) {
    return this.client.post(URLs.PRODUCTS, data);
  }
}

export default React.createContext({
  API: new CoreAPI(),
});
