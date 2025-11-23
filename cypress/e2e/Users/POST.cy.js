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

describe("Method POST", () => {
    it("Should create a user", () => {
        const api = new SubjectApi()
        const CreaterUser = {
            username: faker.internet.username(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const requestPOST = api.requestHTTP({
            method: "POST",
            url: "/Users",
            body: CreaterUser
        
        });
        
        return requestPOST().then((res) => {
            cy.wrap(res.status).should("eq", 201)
            cy.wrap(res.body).should("have.keys", "id")
        
            const id = res.body.id
        
            const requestGET = api.requestHTTP({
                method: "GET",
                url: `/Users/${id}`
            })
            return requestGET().then((res) => {
                cy.wrap(res.status).should("eq", 200)
            });
        });
    });
});