const bcrypt = require("bcrypt");
const { MD5 } = require("crypto-js");
const jwt = require("jsonwebtoken");

// bcrypt.genSalt(10, (err, salt) => {
//   if (err) return next(err);
//   bcrypt.hash("pasword123", salt, (err, hash) => {
//     if (err) return next(err);
//     console.log(hash);
//   });
// });

//-----------------------------------------------
//// the process of getting and comparing token
// const secret = "mysecretpassword";
// const sercretsalt = "sdffsdfdsfd";
// const user = {
//   id: 1,
//   token: MD5("sadasdsad00").toString() + sercretsalt
// };

// const receivedToken = "ce679b5dc636123069483aa1aa4d8c71sdffsdfdsfd";

// if (receivedToken === user.token) {
//   console.log("login");
// }

// console.log(user);

//-----------------------------------------------

const id = "1000";
const secret = "secretpassword";

//receive token
const receiveToken =
  "eyJhbGciOiJIUzI1NiJ9.MTAwMA.iELQA-AYiFy87ZcrBJS0rIT14fFpctrIDFeVOYIXT0U";

//encoding
const token = jwt.sign(id, secret);
//decoding
const decodeToken = jwt.verify(receiveToken, secret);

console.log(decodeToken);
