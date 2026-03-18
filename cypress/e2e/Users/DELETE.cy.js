import "cypress-mochawesome-reporter/register";
import usersService from "../../support/service/users.service";
import { usersFactory } from "../../support/factory/users.factory";

describe("Method DELETE", () => {
  it("Should delete a user off the list", () => {
    const userData = usersFactory.dataUsers();

    usersService.createUsers(userData).then((createRes) => {
      expect(createRes.body).to.be.an("object");
      expect(createRes.status).to.eql(201);

      const userId = createRes.body.id;
      usersService.deleteUsers(userData).then((deleteRes) => {
        expect(createRes.body).to.be.an("object");
        expect(deleteRes.status).to.eql(200);
      });
    });
  });
});
