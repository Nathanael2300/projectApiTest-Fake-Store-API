import "cypress-mochawesome-reporter/register";
import usersService from "../../support/service/users.service";
import { usersFactory } from "../../support/factory/users.factory";

describe("Method PUT", () => {
  it("Should change data off the user wich true data", () => {
    const userData = usersFactory.dataUsers();
    usersService.createUsers(userData).then((createRes) => {
      expect(createRes.body).to.be.an("object");
      expect(createRes.status).to.eql(201);

      const userId = createRes.body.id;
      usersService
        .updateUsers(userId, usersFactory.dataUsers())
        .then((updateRes) => {
          expect(updateRes.body).to.be.an("object");
          expect(updateRes.status).to.eql(200);

          usersService.deleteUsers(userId).then((deleteRes) => {
            expect(deleteRes.status).to.eql(200);
            usersService.getUsersById(userId).then((getIdRes) => {
              expect(getIdRes.status).to.eql(404);
            });
          });
        });
    });
  });

  const invalidFields = {
    username: 123,
    email: 456,
    password: 789,
  };
  for (const [field, invalidValue] of Object.entries(invalidFields)) {
    it("Should not update data user when field was invalid type", () => {
      const userData = usersFactory.dataUsers(invalidFields);
      usersService.createUsers(userData).then((createRes) => {
        expect(createRes.body).to.be.an("object");
        expect(createRes.status).to.eql(201);

        const userId = createRes.body.id;
        usersService
          .updateUsers(userId, { [field]: invalidValue })
          .then((updataRes) => {
            expect(updataRes.body).to.be.an("object");
            expect(updataRes.status).to.eql(400);
          });
      });
    });
  }
});
