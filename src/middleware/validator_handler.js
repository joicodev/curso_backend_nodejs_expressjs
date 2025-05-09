const boom = require("@hapi/boom");

function validatorHandler (schema, reqProp) {
  return (req, res, next) => {
    const data = req[reqProp];
    const {error} = schema.validate(data);
    if (error) {
      next(boom.badRequest(error));
    }

    next();
  };
}

module.exports = validatorHandler;