import EEnum from "../../services/errors/EEnum.js";
export default (error, req, res, next) => {
  console.log(error.cause);
  switch (error.code) {
    case EEnum.INVALID_TYPE_ERROR:
      res.send({ status: 404, payload: error.name });
      break;
    case EEnum.INVALID_PARAM_ERROR:
      res.send({ status: 404, payload: error.name });
      break;
    default:
      res.send({ status: 404, payload: "error unknown" });
      break;
  }
};
