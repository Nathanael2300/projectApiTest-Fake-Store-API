class CartsService {
  getAllCarts() {
    return cy.api({
      method: "GET",
      url: "/carts",
    });
  }

  getCartById(id, options = {}) {
    return cy.api({
      method: "GET",
      url: `carts/${id}`,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }

  createCart(data, options = {}) {
    return cy.api({
      method: "POST",
      url: "/carts",
      body: data,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }

  updataCart(id, data, options = {}) {
    return cy.api({
      method: "PUT",
      url: `/carts/${id}`,
      body: data,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }

  delete(id, options = {}) {
    return cy.api({
      method: "DELETE",
      url: `/carts/${id}`,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }
}

export default new CartsService();
