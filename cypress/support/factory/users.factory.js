import { faker } from "@faker-js/faker";

export const usersFactory = {
  dataValidUsers(override = {}) {
    return {
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    };
  },
};
