import { productsRepository } from "../mongoDB/repositories";
import { ProductInterface } from "../types";

export const createProduct = async (product: ProductInterface): Promise<ProductInterface> =>
  productsRepository.create(product);

export const listProducts = async (): Promise<ProductInterface[]> => productsRepository.list();
