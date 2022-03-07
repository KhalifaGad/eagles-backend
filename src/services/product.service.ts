import { productRepository } from "../mongo/repositories";
import { ProductEntity } from "../types";

export const createProduct = async (
  company: ProductEntity
): Promise<ProductEntity> => productRepository.create(company);

export const listProducts = async (): Promise<ProductEntity[]> =>
  productRepository.list();
