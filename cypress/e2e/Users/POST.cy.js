import "cypress-mochawesome-reporter/register";
import usersService from "../../support/service/users.service";
import { usersFactory } from "../../support/factory/users.factory";

describe("Method POST", () => {
  it("Should create a user", () => {
    const userData = usersFactory.dataUsers();
    usersService.createUsers(userData).then((createRes) => {
      expect(createRes.status).to.eql(201);
      expect(createRes.body).to.be.an("object");
      expect(createRes.body).to.have.property("id");

      const userId = createRes.body.id;
      usersService.deleteUsers(userId).then((deleteRes) => {
        expect(deleteRes.status).to.eql(200);
        const userId = createRes.body.id;
        usersService
          .getUsersById(userId, { failOnStatusCode: false })
          .then((getIdRes) => {
            expect(getIdRes.status).to.eql(404);
          });
      });
    });
  });

  it("Should not create a user", () => {
    const userData = usersFactory.dataUsers({
      username: "",
      email: "",
      password: "",
    });
    usersService
      .createUsers(userData, { failOnStatusCode: false })
      .then((createRes) => {
        expect(createRes.body).to.be.an("object");
        expect(createRes.status).to.eql(400);
      });
  });
});
