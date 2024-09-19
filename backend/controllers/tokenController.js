const Token = require("../models/tokenModel");
const crypto = require("crypto");

const TokenController = {
  async verifyToken(req, res){
    const token = req.params.token

    if (!token) {
      return res.status(400).json({ message: 'Token is missing' });
    }
  
    try {
      // Verify the token using the same secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Token is valid, attach the decoded data to the request
      customer = decoded;
      res.json({customer})
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token', error });
    }

  },

  // async getByToken(req, res) {
  //   //only needed in the token route
  //   const token = req.params.token;
  //   try {
  //     const foundToken = await Token.getByToken(token);
  //     res.json({ token: foundToken });
  //   } catch (error) {
  //     res.status(404).json({ message: "token not found", error: error });
  //   }
  // },

//   async createAndStore() {
//     // needed in the send mail function
//     const token = crypto.randomBytes(32).toString("hex");
//     const expiresAtTimestamp = Date.now() + 86400000; //expires in 1 day

//     const formatDateForMySql = (timestamp) => {
//       const date = new Date(timestamp);
//       return date.toISOString().slice(0, 19).replace("T", " ");
//     };

//     const expiresAT = formatDateForMySql(expiresAtTimestamp);


//     try {
//       const tokenInfo = await Token.create([token, expiresAT, false]);
//       console.log("token created in db: ", tokenInfo);
//     } catch (error) {
//       console.error("error storing token in db: ", error);
//     }

//     return { token: token, expiresAT: expiresAT };
//   },
};

module.exports = TokenController;
