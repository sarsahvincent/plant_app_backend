import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET; // Replace with your own secret key
const accessToken = jwt.sign({ userId: "123" }, secretKey, {
  expiresIn: "15m",
});

/* const refreshToken = jwt.sign({ userId: "123" }, secretKey, {
  expiresIn: "7d",
}); */

export const generateRefreshToken = (userId) => {
  // return jwt.sign( userId,"this_was_@example.com", {expiresIn: "7d"} )
  {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.JWT_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "pickurpage.com",
        audience: userId,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          // reject(err)
          reject(createError.InternalServerError());
        }

        client.SET(userId, token, "EX", 365 * 24 * 60 * 60, (err, reply) => {
          if (err) {
            console.log(err.message);
            reject(createError.InternalServerError());
            return;
          }
          resolve(token);
        });
      });
    });
  }
};

const decoded = jwt.verify(accessToken, secretKey);
console.log(decoded.userId); // Output: 123
