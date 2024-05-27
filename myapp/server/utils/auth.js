const jwt = require("jsonwebtoken");

async function authenticate(req, res, next) {
  let token = req.cookies.authToken;

  try {
    const user = await verifyToken(token);
    if (!user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: "Failed to authenticate token" });
  }
}

async function signInRequired(req, res, next) {
  if (!req.user) {
    const error = new Error("SignIn Required");
    error.status = 403;
    return next(error);
  }
  next();
}

function createToken(visibleUser, maxAge = 60 * 60 * 24 * 3) {
  return jwt.sign(visibleUser, process.env.JWT_SECRET || "MyJWT", {
    expiresIn: maxAge,
  });
}

async function verifyToken(_token) {
  if (!_token) {
    return null;
  }
  try {
    return jwt.verify(_token, process.env.JWT_SECRET || "MyJWT");
  } catch (err) {
    return null;
  }
}

module.exports = {
  createToken,
  verifyToken,
  authenticate,
  signInRequired,
};
