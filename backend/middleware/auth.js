const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      console.log("token Nih " + token);
      
      if (!token) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized",
          data: null,
        });
      }
      token = token.split(" ")[1];
      if (token === null || !token)
        throw { message: "Unauthorized", code: 401 };

      let verifyUser = jwt.verify(token, "coding-is-easy");

      if (!verifyUser) throw { message: "Unauthorized tes", code: 401 };

      req.user = verifyUser;
      next();
    } catch (error) {
      res.status(error.code || 500).send({
        success: false,
        message: error + "terjadi kesalahan",
        data: null,
      });
    }
  },

  checkRole: async (req, res, next) => {
    console.log("role jalan loh sat");
    next();
  },
};
