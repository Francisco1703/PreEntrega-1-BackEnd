const Cart = require("./cartsController/cartsController.js");
const { Router } = require("express");
const cartController = new Cart("carts.json");

module.exports = (app) => {
  let router = new Router();
  app.use("/api/carts", router);

  router.post("/", cartController.create);
  router.get("/:cid", cartController.cartCid);
  router.post("/:cid/product/:pid", cartController.createProd);
};
