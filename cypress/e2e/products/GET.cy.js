import 'cypress-mochawesome-reporter/register';

class SubjectApi {
    requestHTTP = ({ method, url }) => {
        return () => {
            return cy.api({
                method,
                url,
            });
        }
    }
}

describe("Method GET", () => {
    it("Should get all the products", () => {
        const api = new SubjectApi();
        const requestGET = api.requestHTTP({
            method: "GET",
            url: "/products"
        });
        return requestGET().then((res) => {
            for(let i = 0; i < res.body.length; i++) {
                cy.wrap(res.status).should("eq", 200);
                cy.wrap(res.body[i]).should("include.keys", [
                    "id",
                    "title",
                    "price",
                    "description",
                    "category",
                    "image",
                    "rating"
                ]);
                cy.log(`Quantidade de produtos: ${res.body.length}`)
            }
        });
    });

    it("Should get a product", () => {
        const api = new SubjectApi();
        const requestGET = api.requestHTTP({
            method: "GET",
            url: "/products/1"
        })
        return requestGET().then((res) => {
            cy.wrap(res.status).should("eq", 200);
            cy.wrap(res.body).should("include.keys", [
                "id",
                "title",
                "price",
                "description",
                "category",
                "image",
                "rating"
            ]);
        });
    });
});