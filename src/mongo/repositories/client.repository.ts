import Repository from "./baseRepository";
import { userModel, UserDocument } from "../schemas";

class userRepository extends Repository<UserDocument> {
  constructor() {
    super(userModel);
  }
}

export default new userRepository();
