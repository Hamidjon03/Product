import { IException } from "../../../common/types/types";

export class UserLoginAlreadyExist extends Error implements IException {
  statusCode: number;

  constructor() {
    super("user login already exist");

    this.statusCode = 400;
  }
}

export class UserNotFoundException extends Error implements IException {
  statusCode: number;

  constructor() {
    super("user not found");

    this.statusCode = 404;
  }
}
