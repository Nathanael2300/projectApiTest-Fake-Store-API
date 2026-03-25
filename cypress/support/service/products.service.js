class ProductsService {
  getAllProducts() {
    return cy.api({
      method: "GET",
      url: "/products",
    });
  }

  getProductsById(id, options = {}) {
    return cy.api({
      method: "GET",
      url: `/products/${id}`,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }

  createProducts(data, options = {}) {
    return cy.api({
      method: "POST",
      url: "/products",
      body: data,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }

  updateProducts(id, data, options = {}) {
    return cy.api({
      method: "PUT",
      url: `/users/${id}`,
      body: data,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }

  deleteProducts(id, options = {}) {
    return cy.api({
      method: "DELETE",
      url: `products/${id}`,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }
}
export default new ProductsService();
