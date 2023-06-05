const express = require("express");
const PORT = 8080;
const routes = require("./routes");

class Server {
  constructor() {
    this.app = express();
    this.settings();
    //this.middleware();
    this.routes();
  }

  settings() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    //Rutas públicas
    this.app.use("/img", express.static(`${__dirname}/public`));
  }

  /* middleware() {
    //middleware incluido de terceros
    this.app.use(cors(`*`));
    this.app.use((req, res, next) => {
      //res.send("No estás admitido!!");
      console.log("En mi middleware a nivel de app");
      next();
    });
  } */

  routes() {
    routes(this.app);
  }

  listen() {
    this.app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  }
}

module.exports = new Server();
