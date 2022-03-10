import Repository from "./baseRepository";
import { userModel } from "../schemas";
import { UserInterface } from "../../types";

class UsersRepository extends Repository<UserInterface> {
  constructor() {
    super(userModel);
  }
}

export default new UsersRepository();
