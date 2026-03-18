import { faker } from "@faker-js/faker";

export const usersFactory = {
  dataUsers(overrides = {}) {
    return {
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...overrides,
    };
  },
};
