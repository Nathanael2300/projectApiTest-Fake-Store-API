import "cypress-mochawesome-reporter/register";
import usersService from "../../support/service/users.service";
import { usersFactory } from "../../support/factory/users.factory";
import { userSchema } from "../../schemas/user.schema";
import { validateSchema } from "../../support/schemaValidator";

describe("Users API ", () => {
  let userId;

  beforeEach(() => {
    userData = usersFactory.dataValidUsers();

    usersService.createUsers(userData).then((createRes) => {
      userId = createRes.body.id;
    });
  });

  afterEach(() => {
    if (userId) {
      usersService.deleteUsers(userId);
    }
  });

  it("GET /users/:id should return the user", () => {
    usersService.getUsersById(userId).then((getUserId) => {
      expect(getUserId.status).to.eql(200);
      expect(getUserId.body).to.be.an("object");
      expect(getUserId.body.id).to.eql(userId);
      expect(getUserId.body).to.include;
    });
  });
});
