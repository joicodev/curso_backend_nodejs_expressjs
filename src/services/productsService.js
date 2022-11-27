const {
  faker
} = require('@faker-js/faker');
const boom = require("@hapi/boom");

class PrivateProductService {
  static _instance = null;

  constructor() {
    this.products = [];
    this.generate();
  }

  static getInstance() {
    if (PrivateProductService._instance === null) {
      PrivateProductService._instance = new PrivateProductService();
    }

    return PrivateProductService._instance;
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      const commerce = faker.commerce;
      this.products.push({
        id: faker.datatype.uuid(),
        name: commerce.productName(),
        price: parseInt(commerce.price(100), 10),
        description: commerce.productDescription(),
        image: faker.image.image(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  create(data) {
    try {
      const commerce = faker.commerce;
      const product = {
        id: faker.datatype.uuid(),
        name: data["name"],
        price: parseInt(data["price"], 10),
        description: data["description"] || commerce.productDescription(),
        image: data["image"] || faker.image.image(),
        isBlocked: faker.datatype.boolean
      };

      this.products.push(product);
      return product["id"];
    } catch (error) {
      throw boom.internal("Error to create Products");
    }
  }

  getAll() {
    return this.products;
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      const product = this.products.find(item => item.id === id);
      if (!product) {
        const boomErr = boom.notFound("Product not found", {
          id: id,
          status: false,
          message: "Product not found"
        });

        reject(boomErr);
      } else if (product.isBlocked) {
        reject(boom.conflict("Producto bloqueado", {
          id: id,
          status: false,
          message: "Producto no puede ser mostrado"
        }));
      }

      resolve(product);
    });

    /*const product = this.products.find(item => item.id === id);
    if (!product) {
      const boomErr = boom.notFound("Product not found", {
        id: id,
        status: false,
        message: "Product not found"
      });

      throw boomErr;
    } else if (product.isBlocked) {
      throw boom.conflict("Producto bloqueado", {
        id: id,
        status: false,
        message: "Producto no puede ser mostrado"
      });
    }

    return product; */
  }

  update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound("Error to update: Product not found");
    }

    this.products[index] = {
      ...this.products[index],
      ...changes
    }

    return id;
  }

  delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound("Error to delete: Product not found");
    }

    this.products.splice(index, 1);
    return id;
  }
}

/*class ProductsService {
  constructor() {
    throw new Error('Use ProductsService.getInstance()');
  }

  static getInstance() {
    if (!ProductsService.instancia) {
      ProductsService.instancia = new PrivateProductService();
    }

    return ProductsService.instancia;
  }
}*/



module.exports = PrivateProductService.getInstance();
