import { productRepository } from "../mongo/repositories";
import { ProductInterface } from "../types";

export const createProduct = async (
  organization: ProductInterface
): Promise<ProductInterface> => productRepository.create(organization);

export const listProducts = async (): Promise<ProductInterface[]> =>
  productRepository.list();
