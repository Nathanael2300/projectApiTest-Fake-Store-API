import 'cypress-mochawesome-reporter/register';
import { faker } from '@faker-js/faker';

class SubjectApi {
    requestHTTP = ({ method, url, body }) => {
        return () => {
            return cy.api({
                method,
                url,
                body
            });
        }
    }
}

describe("MetHod PUT", () => {
    it("Should change the data of the user", () => {
        const api = new SubjectApi();
        const changeCart = {
            id: 10,
            userId: 1,
            products: [
                {productId: faker.number.int({ min: 1, max: 7 }), quantity: 5},
                {productId: faker.number.int({ min: 1, max: 7 }), quantity: 5}
            ]
        }
        const requestPUT = api.requestHTTP({
            method: "PUT",
            url: `/carts/${changeCart.id}`,
            body: changeCart
        });
        return requestPUT().then((res) => {
            cy.wrap(res.status).should("eq", 200);
            cy.wrap(res.body).should("include.keys", {
                "id": changeCart.id,
                "userId": changeCart.userId,
                "products": changeCart.products
            });
        });
    });
});