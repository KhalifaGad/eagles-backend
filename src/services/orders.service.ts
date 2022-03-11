import { ordersRepository } from "../mongo/repositories";
import { OrderInterface } from "../types";

export const createOrder = async (
  order: OrderInterface
): Promise<OrderInterface> => ordersRepository.create(order);

export const listOrders = async (): Promise<OrderInterface[]> =>
  ordersRepository.list();
