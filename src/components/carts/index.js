const { Router } = require("express");

module.exports = (app) => {
  let router = new Router();
  app.use("/api/carts", router);
  router.get("/", (req, res) => res.send("Todo okey desde carts GET!"));
  router.post("/", (req, res) => res.send("Todo okey desde carts POST!"));
};
