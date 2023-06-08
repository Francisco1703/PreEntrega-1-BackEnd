let database = require("../../../../products.json");

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
    const productId = req.params.pid;
    const products = await database;
    const existProduct = products.find((prod) => prod.id === Number(productId));
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
    const automaticId = database.length + 1;

    const existCode = database.find((prod) => prod.code === code);
    if (existCode) {
      return res
        .status(404)
        .send(`Error, el código ${code} coincide con un código ya existente`);
    }
    const existId = database.find((prod) => prod.id === automaticId);
    if (existId) {
      console.log(
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

      database.push(newProduct);
      res
        .status(200)
        .json({ message: "Producto creado exitosamente", product: newProduct });
    }
  }

  async update(req, res) {
    try {
      let pid = parseInt(req.params.pid);
      let obj = req.body;

      const findIndex = database.findIndex((product) => product.id === pid);
      if (findIndex === -1) {
        return res.status(404).send({
          message: `El producto con el id ${pid} no se encuentra en nuestra base de datos`,
        });
      }
      database[findIndex] = { ...database[findIndex], ...obj };

      res.status(200).json({
        message: `Se ha actualizado el producto con éxito`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(req, res) {
    let pid = req.params.pid;
    const productIndex = database.findIndex((prod) => prod.id === Number(pid));
    if (productIndex !== -1) {
      database.splice(productIndex, 1);
      res
        .status(200)
        .json({ message: `El producto con el id ${pid} fue eliminado` });
    } else {
      res.status(404).json({
        message: `El producto con el id ${pid} no se encuentra en nuestra base de datos`,
      });
    }
  }
}

module.exports = Product;
