import { ProductEntity } from "../domain/entities";
import { repositories as repos } from "../infra/db/Mongo";
import ErrorService from "./Error.service";

class ProductService {
  async list() {
    try {
      return await repos.Product.list();
    } catch (err) {
      return ErrorService.handleError(err);
    }
  }

  async add(productData, branchId) {
    const productEntity = new ProductEntity({
      ...productData,
      byBranchId: branchId,
    });
    try {
      return await repos.Product.create(productEntity);
    } catch (error) {
      return ErrorService.handleError(error);
    }
  }
}

export default new ProductService();
