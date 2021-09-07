import BaseRepo from "../baseRepo";
import Model from "./product.model";

class ProductRepo extends BaseRepo {
  constructor() {
    super(Model);
  }
}

export default new ProductRepo();
