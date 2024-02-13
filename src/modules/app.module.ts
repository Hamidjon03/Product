import { Router } from "express";
import * as product from "./product/product.module";
import * as user from "./user/user.module";

const router = Router();

router.use("/product", product.router);
router.use("/user", user.router);

export { router };
