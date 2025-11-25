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

describe("MetHod POST", () => {
    it("Should to create a product", () => {
        const api = new SubjectApi()
        const createProduct = {
            id: faker.number.int({ min: 1, max: 100 }),
            title: faker.commerce.productName(),
            price: 10.0,
            description: "test",
            category: faker.commerce.department(),
            image: faker.image.url()
        }
        const requestPOST = api.requestHTTP({
            method: "POST",
            url: "/products",
            body: createProduct,
        });
        return requestPOST().then((res) => {
            cy.wrap(res.status).should("eq", 201);
            cy.wrap(res.body).should("include.keys",{
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