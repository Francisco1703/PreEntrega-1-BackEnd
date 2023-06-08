const Product = require("./productsController/productsController.js");
const { Router } = require("express");

const productController = new Product("products.json");

module.exports = (app) => {
  let router = new Router();

  app.use("/api/products", router);

  router.get("/", productController.get);
  router.get("/:pid", productController.getId);
  router.post("/", productController.create);
  router.put("/:pid", productController.update);
  router.delete("/:pid", productController.delete);
};
