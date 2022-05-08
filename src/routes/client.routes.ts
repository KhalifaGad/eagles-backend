import { Router } from "express";
import { clientController } from "../controllers";

const router = Router();

router.route("/clients").get(clientController.list).post(clientController.bulkCreate);

router.route("/client").post(clientController.create);

router.route("/client/:id").get(clientController.show).put(clientController.update).delete(clientController.delete);

export default router;
