import jwt from "jsonwebtoken";

const TOKEN_KEY = "DJASHJDHJSAHDJSAHDISJ";
export const authMiddleware = (role) => {
  return (req, res, next) => {
    try {
      let token = req.headers.authorization;

      if (!token || !token.startsWith("Bearer")) {
        return res.status(401).json({ message: "UnAuthorized" });
      }
      token = token.slice(7);
      let decoded = jwt.verify(token, TOKEN_KEY);
      if (!role.includes(decoded.role)) {
        return res.status(401).json({ message: "u dont have access" });
      }
      req.kepenek = decoded;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: error });
    }
  };
};
