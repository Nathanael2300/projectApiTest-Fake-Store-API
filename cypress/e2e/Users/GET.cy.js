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




describe("MetHod GET", () => {
    it("Shold get all users", () => {
        const api = new SubjectApi();
        const requestGET = api.requestHTTP({
            method: "GET",
            url: "/Users"
        })

        return requestGET().then((res) => {
            for (let i = 0; i < res.body.length; i++) {
                cy.wrap(res.status).should("eq", 200)
                cy.wrap(res.body[i]).should("include.keys", [
                    "address",
                    "id",
                    "email",
                    "username",
                    "password",
                    "name",
                    "phone"
                ]);
            }
            cy.log("Quantidade de usuarios:", res.body.length)
        });
    });

    it("Shold get one user of", () => {
        const api = new SubjectApi()
        const request = api.requestHTTP({
            method: "GET",
            url: "/Users/1"
        });

        return request().then((res) => {
            cy.wrap(res.status).should("eq", 200)
            cy.wrap(res.body).should("include.keys", [
                "address",
                "id",
                "email",
                "username",
                "password",
                "name",
                "phone"
            ]);
        });
    });
});