const {faker} = require('@faker-js/faker');

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

  crear() {}

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