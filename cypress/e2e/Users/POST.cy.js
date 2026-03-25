import "cypress-mochawesome-reporter/register";
import usersService from "../../support/service/users.service";
import { userSchema } from "../../schemas/user.schema";
import { usersFactory } from "../../support/factory/users.factory";
import { validateSchema } from "../../support/schemaValidator";

describe("POST /Users", () => {
  it.only("Should create and delete a user successfully", () => {
    const userData = usersFactory.dataValidUsers();
    return usersService
      .createUsers(userData)
      .then((createRes) => {
        expect(createRes.status).to.eql(201);
        expect(createRes.body).to.have.property("id");

        const userId = createRes.body.id;
        return usersService.getUsersById(userId).then((getUserById) => {
          return { getUserById, userId };
        });
      })
      .then(({ getUserById, userId }) => {
        expect(getUserById.status).to.eql(200);

        const result = validateSchema(userSchema, getUserById.body);
        expect(result.valid, JSON.stringify(result.errors, null, 2)).to.eql(
          true,
        );

        return usersService.deleteUsers(userId).then((deleteRes) => {
          return { deleteRes, userId };
        });
      })
      .then(({ deleteRes, userId }) => {
        expect(deleteRes.status).to.eql(200);

        return usersService.getUsersById(userId);
      })
      .then((getUsersById) => {
        expect(getUsersById.status).to.eql(404);
      });
  });

  it("Should not create a user", () => {
    const userData = usersFactory.dataValidUsers({
      username: "",
      email: "",
      password: "",
    });
    return usersService
      .createUsers(userData, { failOnStatusCode: false })
      .then((createRes) => {
        expect(createRes.status).to.eql(400);
        expect(createRes.body).to.be.an("object");
      });
  });
});
