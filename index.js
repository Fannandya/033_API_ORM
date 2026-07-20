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

app.post("/komik", async (req, res) => {
  const data = req.body;
  try {
    const komik = await db.komik.create(data);
    res.send(komik);
  } catch (err) {
    res.send(err);
  }
});

app.get("/komik", async (req, res) => {
  try {
    const komik = await db.komik.findAll();
    res.send(komik);
  } catch (err) {
    res.send(err);
  }
});

app.put("/komik/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const komik = await db.komik.findByPK(id);
    if (!komik) {
      return res.status(404).send({ message: "komik tidak ditemukan" });
    }

    await komik.update(data);
    res.send({ message: "komik berhasil diupdaet", komik });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/komik/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const komik = await db.komik.findByPK(id);
    if (!komik) {
      return res.status(404).send({ message: "komik tidak ditemukan" });
    }

    await komik.destroy();
    res.send({ message: "komik berhasil dihapus" });
  } catch (err) {
    res.status(500).send(err);
  }
});
