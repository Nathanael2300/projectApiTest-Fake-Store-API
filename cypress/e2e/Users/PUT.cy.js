import 'cypress-mochawesome-reporter/register';
import { faker } from '@faker-js/faker';

class SubjectApi {
    requestHTTP = ( {method, url, body }) => {
        return () => {
            return cy.api({
                method,
                url,
                body
            });
        }
    }
}

describe("Method PuT", () => {
    it("Should change data of the user", () => {
        const api = new SubjectApi();
        const ChangeUser = {
            username: faker.internet.username(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const requestPUT = api.requestHTTP({
            method: "PUT",
            url: "/Users/1",
            body: ChangeUser
        });

        return requestPUT().then((res) => {
            cy.wrap(res.status).should("eq", 200)
            cy.wrap(res.body).should("include.keys",  {
                "email": res.email, 
                "username": res.username, 
                "password": res.password 
            });
        });
    });
});