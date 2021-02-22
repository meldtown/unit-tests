export class AuthService {
  _loggedUsers = [];

  login(user) {
    if (user) {
      this._loggedUsers.push(user);
      return true;
    } else {
      return false;
    }
  }
};
