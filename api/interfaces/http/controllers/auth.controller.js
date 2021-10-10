import boom from "@hapi/boom";
import { AuthService } from "../../../services";

class AuthController {
  async login(req, res, next) {
    const { mobile, password } = req.body;
    const loginRes = await AuthService.login(mobile, password, res);
    if (boom.isBoom(loginRes)) return next(loginRes);
    return res.status(200).send(loginRes);
  }
}

export default new AuthController();
