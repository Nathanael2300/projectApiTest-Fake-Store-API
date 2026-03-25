import { faker } from "@faker-js/faker";

export const productsFactory = {
  dataValidProducts(override = {}) {
    return {
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      image: faker.image.url(),
      ...override,
    };
  },
};
