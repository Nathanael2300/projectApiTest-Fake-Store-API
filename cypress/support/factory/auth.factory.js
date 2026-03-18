import UsersService from "../service/users.service";
import AuthsService from "../service/auth.service";
import { usersFactory } from "../factory/users.factory";

export const authLoginFactory = {
  dataAuthLogin() {
    const userData = usersFactory.dataUsers();
    return UsersService.createUsers(UserFactory).then((createRes) => {
      expect(createRes.status).to.eql(201);
      expect(createRes.body).to.be.an("object");
      return AuthsService.login({
        username: userData.username,
        password: userData.password,
      }).then((authRes) => {
        expect(authRes.status).to.eql(200);
        expect(authRes.body).to.have.property("token");
      });
    });
  },
};
