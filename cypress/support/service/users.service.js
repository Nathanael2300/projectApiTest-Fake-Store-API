class UsersService {
  getAllUsers() {
    return cy.api({
      method: "GET",
      url: `/users`,
    });
  }

  getUsersById(id, options = {}) {
    return cy.api({
      method: "GET",
      url: `/users/${id}`,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }

  createUsers(data, options = {}) {
    return cy.api({
      method: "POST",
      url: "/users",
      body: data,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }

  updateUsers(id, data, options = {}) {
    return cy.api({
      method: "PUT",
      url: `/users/${id}`,
      body: data,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }

  deleteUsers(id, options = {}) {
    return cy.api({
      method: "DELETE",
      url: `/users/${id}`,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }
}

export default new UsersService();
