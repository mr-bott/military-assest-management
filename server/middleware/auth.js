const jwt = require("jsonwebtoken");

module.exports = (roles = []) => {
  return (req, res, next) => {
    const token =
      req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(401).json({
        msg: "No Token",
      });

    const user = jwt.verify(token, process.env.JWT_SECERET);

    if (
      roles.length &&
      !roles.includes(user.role)
    ) {
      return res.status(403).json({
        msg: "Access Denied",
      });
    }

    req.user = user;
    next();
  };
};