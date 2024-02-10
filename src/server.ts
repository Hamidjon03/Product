import express, { Express } from "express";
import cors from "cors";
import { config } from "./common/config";
import * as modules from "./modules/app.module";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use("/api", modules.router);

app.listen(config.port, () => {
  console.log(`http://localhost${config.port}`);
});
