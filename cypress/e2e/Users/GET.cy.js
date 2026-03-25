import "cypress-mochawesome-reporter/register";
import usersService from "../../support/service/users.service";
import { usersFactory } from "../../support/factory/users.factory";
import { usersSchema } from "../../schemas/users.schema";
import { userSchema } from "../../schemas/user.schema";
import { validateSchema } from "../../support/schemaValidator";

describe("GET /Users", () => {
  it("Should get all users successfully", () => {
    return usersService.getAllUsers().then((getListUsersRes) => {
      expect(getListUsersRes.status).to.eql(200);
      expect(getListUsersRes.body).to.be.an("array");

      const result = validateSchema(usersSchema, getListUsersRes.body);
      expect(result.valid, JSON.stringify(result.errors, null, 2)).to.eql(true);
    });
  });

  it("Should get a user off the list successfully", () => {
    const userData = usersFactory.dataValidUsers();
    return usersService
      .createUsers(userData)
      .then((createRes) => {
        expect(createRes.body).to.be.an("object");
        expect(createRes.status).to.eql(201);

        const userId = createRes.body.id;

        return usersService.getUsersById(userId);
      })
      .then((getListUsersRes) => {
        expect(getListUsersRes.status).to.eql(200);
        expect(getListUsersRes.body).to.be.an("object");

        const result = validateSchema(userSchema, getListUsersRes.body);
        expect(result.valid, JSON.stringify(result.errors, null, 2)).to.eql(
          true,
        );
      });
  });
});
