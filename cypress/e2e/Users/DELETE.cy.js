import "cypress-mochawesome-reporter/register";
import usersService from "../../support/service/users.service";
import { usersFactory } from "../../support/factory/users.factory";

describe("DELETE /Users", () => {
  it("Should delete a user successfully", () => {
    const userData = usersFactory.dataValidUsers();

    return usersService
      .createUsers(userData)
      .then((createRes) => {
        expect(createRes.status).to.eql(201);
        expect(createRes.body).to.be.an("object");
        const userId = createRes.body.id;

        return usersService.deleteUsers(userId).then((deleteRes) => {
          return { deleteRes, userId };
        });
      })
      .then(({ deleteRes, userId }) => {
        expect(deleteRes.status).to.eql(200);

        return usersService.getUsersById(userId, { failOnStatusCode: false });
      })
      .then((getUserById) => {
        expect(getUserById.status).to.eql(404);
      });
  });
});
