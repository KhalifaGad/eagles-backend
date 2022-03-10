import Repository from "./baseRepository";
import { productModel } from "../schemas";
import { ProductInterface } from "../../types";

class ProductsRepository extends Repository<ProductInterface> {
  constructor() {
    super(productModel);
  }
}

export default new ProductsRepository();
