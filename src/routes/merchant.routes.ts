import { Router } from "express";
import { merchantController } from "../controllers";

const router = Router();

router.route("/merchants").get(merchantController.list).post(merchantController.bulkCreate);

router.route("/merchant").post(merchantController.create);

router
  .route("/merchant/:id")
  .get(merchantController.show)
  .put(merchantController.update)
  .delete(merchantController.delete);

export default router;
