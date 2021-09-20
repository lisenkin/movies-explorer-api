const rateLimit = require('express-rate-limit');
// попробуем вынести лимиты
module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
