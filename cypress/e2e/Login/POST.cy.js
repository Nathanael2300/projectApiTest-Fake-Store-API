import 'cypress-mochawesome-reporter/register';

class SubjectApi {
    requestHTTP = ({ method, url, body, failOnStatusCode }) => {
        return () => {
            return cy.api({
                method,
                url,
                body,
                failOnStatusCode
            });
        }
    }
}

describe("MetHod POST", () => {
    it("Should do login wich success", () => {
        const api = new SubjectApi();
        const credentials = { username: 'johnd', password: 'm38rmF$' };

        const requestPOST = api.requestHTTP({
            method: "POST",
            url: "auth/login",
            headers: { 'Content-Type': 'application/json' },
            body: credentials,
            failOnStatusCode: false
        });
        return requestPOST().then((res) => {
            cy.wrap(res.status).should("eq", 200);
            cy.wrap(res.body).should("have.a.property", "token");
        });
    });
});
