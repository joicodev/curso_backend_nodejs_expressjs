const {
  faker
} = require('@faker-js/faker');

class ProductsService {
  
  constructor() {
    this.products = [];
    this.generate();
  }

  static _productsServiceInstance = null;
  static getInstance() {
    if (ProductsService._productsServiceInstance === null) {
      ProductsService._productsServiceInstance= new ProductsService();
    }

    return ProductsService._productsServiceInstance;
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

  create(data) {
    try {
      const commerce = faker.commerce;
      const product = {
        id: faker.datatype.uuid(),
        name: data["name"] ?? commerce.productName(),
        price: data["price"] != null ? parseInt(data["price"], 10) : parseInt(commerce.price(100), 10),
        description: data["description"] ?? commerce.productDescription(),
        image: data["image"] ?? faker.image.image()
      };

      this.products.push(product);
      return product["id"];
    } catch (error) {
      throw new Error("Er");
    }
  }

  getAll() {
    return this.products;
  }

  findOne(id) {
    return this.products.find(item => item.id === id);
  }

  update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error("Product not found");
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
      throw new Error("Product not found");
    }

    this.products.splice(index, 1);
    return id;
  }
}

module.exports = ProductsService;
