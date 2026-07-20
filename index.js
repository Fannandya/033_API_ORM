const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./models");
const { Result } = require("pg");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.listen(PORT, () => {
  console.log("ALHAMDULILLAH SERVER JALAN DI PORT 3000");
});

db.sequelize
  .sync()
  .then((result) => {
    app.listen(3000, () => {
      console.log("server dimulai😈");
    });
  })
  .catch((err) => {
    console.log(err);
  });
