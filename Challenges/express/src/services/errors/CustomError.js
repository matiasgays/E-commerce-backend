import EEnum from "./EEnum.js";

export default class CustomError extends Error {
  constructor(code, error) {
    super(error);
    this.code = code;
    this.msg = EEnum[code];
  }

  createError = () => {
    return { status: this.code, msg: this.msg, error: this.message };
  };
}
