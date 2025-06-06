import { User } from '../models/User';
import { capitaliseFirstLetter } from '../utils/labels-utils';

export class UserMapper {
  public usersListFromDB(usersListFromDB: any[]): User[] {
    let usersList: User[] = [];

    usersListFromDB.forEach((userFromDB) => {
      usersList.push(this.userFromDB(userFromDB));
    });
    return usersList;
  }

  public userFromDB(userFromDB: any): User {
    return {
      id: userFromDB.userID,
      givenName: userFromDB.userGivenName,
      surname: userFromDB.userSurname,
      login: userFromDB.userLogin,
      profile: userFromDB.userProfile,
    } as User;
  }

  public userToDB(userToDB: any): any {
    return {
      userID: userToDB.id,
      userGivenName: capitaliseFirstLetter(userToDB.givenName),
      userSurname: userToDB.surname.toUpperCase(),
      userLogin: userToDB.login,
      userPassword: userToDB.password,
      userProfile: userToDB.profile,
    };
  }
}
