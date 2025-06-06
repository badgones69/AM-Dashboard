const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

const airlineQueries = require("./queries/airline");
const userQueries = require("./queries/user");

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000);

/* AIRLINE ENDPOINTS */
app.get("/airlines/list", async function (_req, res) {
  res.send(await airlineQueries.findAllAirlines());
});
app.get("/airline", async function (_req, res) {
  res.send(await airlineQueries.findAirline());
});
app.get("/airline/check-logo", async function (_req, res) {
  res.send(await fs.promises.readdir("src\\images", { withFileTypes: true }));
});
app.put("/airline/update", async function (req, res) {
  res.send({
    value: await airlineQueries.updateAirline(req.body.airlineUpdated),
  });
});

/* USER ENDPOINTS */
app.post("/user/authentication", async function (req, res) {
  res.send(
    await userQueries.authenticateUser(req.body.login, req.body.password),
  );
});
app.get("/users/list", async function (_req, res) {
  res.send(await userQueries.findAllUsers());
});
app.get("/user/:id", async function (req, res) {
  res.send(await userQueries.findUser(req.params.id));
});
app.post("/user/create", async function (req, res) {
  res.send({ value: await userQueries.createUser(req.body.userToCreate) });
});
app.put("/user/reset-password", async function (req, res) {
  res.send({
    value: await userQueries.resetUserPassword(req.body.userToResetPassword),
  });
});
app.put("/user/update/:id", async function (req, res) {
  res.send({ value: await userQueries.updateUser(req.body.userUpdated) });
});
app.delete("/user/delete/:id", async function (req, res) {
  res.send({ value: await userQueries.deleteUser(req.params.id) });
});
