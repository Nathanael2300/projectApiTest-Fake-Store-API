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

describe("Method PUT", () => {
    it("Should change the data of the product", () => {
        const api = new SubjectApi();
        const changeProduct = {
            id: faker.number.int({ min: 1, max: 100 }),
            title: faker.commerce.productName(),
            price: 10.0,
            description: "test",
            category: faker.commerce.department(),
            image: faker.image.url()
        };
        const requestPUT = api.requestHTTP({
            method: "PUT",
            url: "/products/1",
            body: changeProduct
        });
        return requestPUT().then((res) => {
            cy.wrap(res.status).should("eq", 200)
            cy.wrap(res.body).should("include.keys", {
                "id": res.id,
                "title": res.title,
                "price": res.price,
                "description": res.describe,
                "category": res.category,
                "image": res.image,
            });
        });
    });
});