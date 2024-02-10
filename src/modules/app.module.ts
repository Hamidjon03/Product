import { Router } from "express";
import * as product from "./product/product.module";

const router = Router();

router.use("/product", product.router);

export { router };
