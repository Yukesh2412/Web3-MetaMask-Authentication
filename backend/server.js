const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const MONGO_URI = "mongodb://127.0.0.1:27017/actordatabase";
app.use(express.json());
mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("DB connected");
  }
);
// const authRoute = require("./routes/auth");
// app.use("/api/auth", authRoute);

const DauthRoute = require("./routes/Dauth");
app.use("/api/auth", DauthRoute);

app.listen(PORT, function () {
  console.log("server running on port", PORT);
});
