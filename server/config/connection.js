const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("CONNECTED TO DATABASE SUCCESSFUL");
  })
  .catch((err) => {
    console.log(err);
  });
