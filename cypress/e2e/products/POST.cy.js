import "cypress-mochawesome-reporter/register";
import productsService from "../../support/service/products.service";
import { productsFactory } from "../../support/factory/products.factory";

describe("POST /Products", () => {
  it("Should to create a product successfully", () => {
    const productData = productsFactory.dataValidProducts();

    return productsService
      .createProducts(productData)
      .then((createRes) => {
        expect(createRes.status).to.eql(201);
        expect(createRes.body).to.have.property("id");
        expect(createRes.body).to.be.an("object");

        const productId = createRes.body.id;
        return productsService
          .getProductsById(productId)
          .then((getProductById) => {
            return { getProductById, productId };
          });
      })
      .then(({ getProductById, productId }) => {
        expect(getProductById.status).to.eql(200);

        return productsService.deleteProducts(productId);
      })
      .then((deleteRes) => {
        expect(deleteRes.status).to.eql(200);
      });
  });

  it("Should not create a product", () => {});
});
