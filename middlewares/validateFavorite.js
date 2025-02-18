const { BadRequest } = require("http-errors");
const validateFavorite = (shema) => {
  const func = (req, res, next) => {
    if (JSON.stringify(req.body) === JSON.stringify({})) {
      next(BadRequest("missing fields favorite"));
    }
    const { error } = shema.validate(req.body);
    if (error) {
      next(BadRequest(error.message));
    }
    next();
  };
  return func;
};

module.exports = validateFavorite;
