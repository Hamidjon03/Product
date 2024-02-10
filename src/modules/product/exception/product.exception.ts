import { IException } from "../../../common/types/types";

export class ProductNameAlreadyExist extends Error implements IException {
  statusCode: number;

  constructor() {
    super("product name already exist");

    this.statusCode = 400;
  }
}
