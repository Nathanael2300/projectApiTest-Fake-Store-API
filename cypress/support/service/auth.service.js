class authService {
  login(data, options = {}) {
    return cy.api({
      method: "POST",
      url: `/auth/login`,
      body: data,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }
}
