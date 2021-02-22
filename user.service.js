import axios from "axios";

export class UserService {
  _apiUrl = 'http://localhost:4000/users';

  constructor(auth, users = []) {
    this.auth = auth;
    this.users = [...users];
  }

  getUser(id) {
    const user = this.users.find(user => user.id === id);

    if (user) {
      return user;
    } else {
      return null
    }
  }

  addUser(user) {
    this.users.push(user);
  }

  updateUser(id, user) {
    const targetUser = this.getUser(id);

    Object.assign(targetUser, user);
  }

  log(message) {
    return message;
  }

  login(user) {
    const isLogged = this.auth.login(user);

    if (isLogged) {
      this.log('Successful login');
    } else {
      throw new Error('Failed login');
    }
  }

  removeUser(id) {
    this.users = this.users.filter(user => user.id !== id)
  }

  async fetchUsers() {
    const {data: users} = await axios.get(this._apiUrl);

    return users;
  }
}
