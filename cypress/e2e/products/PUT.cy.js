import "cypress-mochawesome-reporter/register";
import productsService from "../../support/service/products.service";
import { productsFactory } from "../../support/factory/products.factory";

describe("PUT /Products", () => {
  it.only("Should change data off the product wich true data", () => {
    const productData = productsFactory.dataValidProducts();
    return productsService
      .createProducts(productData)
      .then((createRes) => {
        expect(createRes.status).to.eql(201);
        expect(createRes.body).to.be.an("object");

        const productId = createRes.body.id;
        return productsService.updateProducts(productId).then((updateRes) => {
          return { updateRes, productId };
        });
      })
      .then(({ updateRes, productId }) => {
        expect(updateRes.status).to.eql(200);
        expect(updateRes.body).to.be.an("object");
        expect(updateRes.body).to.include(productData);
        return productsService.deleteProducts(productId).then((deleteRes) => {
          return { deleteRes, productId };
        });
      })
      .then(({ deleteRes, productId }) => {
        expect(deleteRes.status).to.eql(200);

        return productsService.getProductsById(productId, {
          failOnStatusCode: false,
        });
      })
      .then((getProductById) => {
        expect(getProductById.status).to.eql(404);
      });
  });

  for (const [field, invalidValue] of Object.entries(
    productsFactory.dataValidProducts({
      tittle: "",
      price: -100,
      description: "",
      category: "",
      image: "",
    }),
  )) {
    it(`Should not update product when ${field} is invalid`, () => {
      const productData = productsFactory.dataValidProducts();
      return productsService
        .createProducts(productData)
        .then((createRes) => {
          expect(createRes.status).to.eql(201);
          expect(createRes.body).to.be.an("object");

          const productId = createRes.body.id;
          return productsService.updateProducts(productId, {
            [field]: invalidValue,
          });
        })
        .then((updateRes) => {
          expect(updateRes.status).to.eql(400);
          expect(updateRes.body).to.be.an("object");
        });
    });
  }
});
