import 'cypress-mochawesome-reporter/register';

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

describe("Method POST", () => {
    it("Should to add a product in cart", () => {
        const api = new SubjectApi()
        const createProduct = {
            id: 10,
            userId: 1,
            products: [
                {productId: 10, quantity: 5},
                {productId: 13, quantity: 5}
            ]
        }
        const requestPOST = api.requestHTTP({
            method: "POST",
            url: "/carts",
            body: createProduct
        })
        return requestPOST().then((res) => {
            cy.wrap(res.status).should("eq", 201)
            cy.wrap(res.body).should("have.keys", ["id", "userId", "products"])
        })
    });
});