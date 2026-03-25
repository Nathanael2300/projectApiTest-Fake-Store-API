import { faker } from "@faker-js/faker";

export const cartsFactory = {
  dataCarts(override = {}) {
    return [
      {
        id: faker.number.int(),
        title: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        image: faker.image.url(),
        ...override,
      },
    ];
  },
};
