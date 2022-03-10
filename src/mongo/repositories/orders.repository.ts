import Repository from "./baseRepository";
import { orderModel } from "../schemas";
import { OrderInterface } from "../../types";

class OrdersRepository extends Repository<OrderInterface> {
  constructor() {
    super(orderModel);
  }
}

export default new OrdersRepository();
