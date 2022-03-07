import Repository from "./baseRepository";
import { productModel, ProductDocument } from "../schemas";

class ProductRepository extends Repository<ProductDocument> {
  constructor() {
    super(productModel);
  }
}

export default new ProductRepository();
