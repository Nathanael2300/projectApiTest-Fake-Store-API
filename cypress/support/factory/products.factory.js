import { faker } from "@faker-js/faker";

export const productsFactory = {
  dataProducts(overrides = {}) {
    return {
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      image: faker.image.url(),
      ...overrides,
    };
  },
};
