const { Router } = require("express");
const productController = require("./productsController/productsController.js");

module.exports = (app) => {
  let router = new Router();
  app.use("/api/products", router);

  router.get("/", productController.get);
  router.get("/:id", productController.getId);
  router.post("/", productController.create);
  router.put("/:id", productController.update);
  //router.put("/:pid", productController.update);
};
