import 'cypress-mochawesome-reporter/register';

class SubjectApi {
    requestHTTP = ({ method, url,  failOnStatusCode}) => {
        return () => {
            return cy.api({
                method,
                url,
                failOnStatusCode
            });
        }
    }
}

describe("MetHod DELETE", () => {
    it("Should delete a product from the cart", () => {
        const api = new SubjectApi();
        const requestDELETE = api.requestHTTP({
            method: "DELETE",
            url: "/carts/1",
            failOnStatusCode: false
        });

        return requestDELETE().then((res) => {
            cy.wrap(res.status).should("eq", 200)
            cy.wrap(res.body).should("include.keys", [
                "id",
                "userId",
                "date",
                "products"
            ]);
        });
    });
});