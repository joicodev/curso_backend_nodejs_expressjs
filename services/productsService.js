const {
  faker
} = require('@faker-js/faker');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
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
        image: faker.image.image()
      });
    }
  }

  crear(args) {
    try {
      console.log(args);
      const commerce = faker.commerce;
      const product = {
        id: faker.datatype.uuid(),
        name: args["name"] ? ? commerce.productName(),
        price: args["price"] != null ? parseInt(args["price"], 10) : parseInt(commerce.price(100), 10),
        description: args["description"] ? ? commerce.productDescription(),
        image: args["image"] ? ? faker.image.image()
      };

      this.products.push(product);
      return product["id"];
    } catch (error) {
      return null;
    }

  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find(item => item.id === id);
  }

  update() {}

  delete() {}
}

module.exports = ProductsService;
