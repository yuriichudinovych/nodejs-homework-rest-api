const mongoose = require("mongoose");
const app = require("./app");
// 8fyEtd5HUYMgc8Oy

// const dotenv = require("dotenv");
// dotenv.config();
const { DB_HOST, PORT = 3000 } = process.env;

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
