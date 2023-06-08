const carts = require("..");
let database = require("../../../../carts.json");

class Cart {
  async create(req, res) {
    const { products } = req.body;
    const automaticId = database.length + 1;
    const existId = await database.find((cart) => cart.id === automaticId);
    if (existId) {
      console.log(
        `El id ${automaticId}, ya se encuentra en nuestra base de datos`
      );
    }
    if (!products) {
      return res
        .status(404)
        .json("Por favor, complete todos los campos solicitados");
    } else {
      const newCart = {
        id: automaticId,
        products,
      };

      database.push(newCart);
      res
        .status(200)
        .json({ message: `Carrito creado exitosamente`, cart: newCart });
    }
  }

  async cartCid(req, res) {
    const cid = req.params.cid;
    const cart = database.find((cart) => cart.id === Number(cid));

    if (!cart) {
      return res.status(404).json({ message: "El carrito no fu encontrado" });
    }

    res.send(cart);
  }

  async createProd(req, res) {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const findCart = database.findIndex((cart) => cart.id === Number(cid));

    if (findCart === -1) {
      return res
        .status(404)
        .send({ message: `No se encontró el carrito con el id ${cid}` });
    }

    const selectCart = database[findCart];
    const selectProduct = selectCart.products.find(
      (cart) => cart.product === pid
    );

    if (selectProduct) {
      selectProduct.quantity += 1;
    } else {
      selectCart.products.push({ product: pid, quantity: 1 });
    }

    database[findCart] = selectCart;
    res.send(selectCart);
  }
}

module.exports = Cart;
