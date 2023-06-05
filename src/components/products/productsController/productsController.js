const products = require("../../../products.json");
const { ProductManager } = require("../../../productManager");
const productManager = new ProductManager();
let database = require("../../../products.json");

class Product {
  async get(req, res) {
    const limit = req.query.limit;
    let productsList = await database;
    if (limit) {
      let arrayProds = productsList;
      const productsLimit = arrayProds.slice(0, limit);
      return res.send(productsLimit);
    } else {
      res.json(productsList);
    }
  }

  async getId(req, res) {
    const productId = req.params.id;
    const products = await database;
    const existProduct = products.find((prod) => prod.id == productId);
    const response = existProduct
      ? existProduct
      : {
          error: `El producto con el id ${productId} no existe en nuestra base de datos`,
        };
    res.status(existProduct ? 200 : 400).send(response);
  }

  async create(req, res) {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;
    const products = await require("../../../products.json");
    const automaticId = products.length + 1;

    const existCode = products.find((prod) => prod.code === code);
    if (existCode) {
      return res
        .status(404)
        .send(`Error, el código ${code} coincide con un código ya existente`);
    }

    const existId = products.find((prod) => prod.id === automaticId);
    if (existId) {
      return console.log(
        `El id ${automaticId}, ya se encuentra en nuestra base de datos`
      );
    }

    if (!title || !description || !code || !price || !stock || !category) {
      return res
        .status(404)
        .send(`Por favor, complete todos los campos solicitados`);
    } else {
      const newProduct = {
        id: automaticId,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails,
      };
      res.send(newProduct);
      products.push(newProduct);
      res
        .status(201)
        .json({ message: "Producto creado exitosamente", product: newProduct });
    }
    res.json(products);
  }

  async update(req, res) {
    const productId = req.params.id;
    const product = req.body;

    const producto = await productManager.updateProduct(productId, product);
    res.send(producto);
  }
}

module.exports = new Product();
