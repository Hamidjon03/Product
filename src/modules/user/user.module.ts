import { Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

const userService = new UserService();
const userController = new UserController(userService);

const router = Router();
router.post("/", (req: Request, res: Response) => {
  userController.create(req, res);
});

router.get("/", (req: Request, res: Response) => {
  userController.getAll(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
  userController.getById(req, res);
});

router.put("/:id", (req: Request, res: Response) => {
  userController.update(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  userController.delete(req, res);
});

export { router };
