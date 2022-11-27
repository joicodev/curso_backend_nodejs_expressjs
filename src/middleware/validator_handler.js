const boom = require("@hapi/boom");

function validatorHandler (schema, reqPropery) {
  return (req, res, next) => {
    const data = req[reqPropery];
    const {error} = schema.validate(data);
    if (error) {
      next(boom.badRequest(error));
    }

    next();
  };
}

module.exports = validatorHandler;