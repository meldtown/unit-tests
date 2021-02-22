import axios from 'axios';

import {UserService} from './user.service';

jest.mock('axios');

describe('UserService', () => {
  let userService;
  let users;
  let logSpy;

  const user = {id: 1, name: 'Mike'};
  const mockAuth = {login: jest.fn().mockReturnValue(true)};

  beforeEach(() => {
    users = [{id: 1, name: 'Mike'}, {id: 2, name: 'Mark'}];
    userService = new UserService(mockAuth, users);
    logSpy = jest.spyOn(userService, 'log');
  });

  afterEach(() => logSpy.mockClear());

  describe('on init', () => {
    it('should be created', () => {

      expect(userService).toBeTruthy();
    });

    it('should have empty users list by default', () => {
      userService = new UserService();

      expect(userService.users).toHaveLength(0);
    });

    it('should be initialized with users list', () => {
      // Assert
      expect(userService.users).toEqual([...users]);
    });
  });

  describe('find user by id', () => {
    it('should be successful', () => {
      // Act
      const expectedUser = userService.getUser(1);

      // Assert
      expect(expectedUser).toEqual(user);
    });

    it('should return null', () => {
      const expectedUser = userService.getUser(19);

      expect(expectedUser).toBeNull();

    })

  })

  it('should add user', () => {
    const newUser = {id: 3, name: 'Test user'};

    // Act
    userService.addUser(newUser);

    expect(userService.users).toHaveLength(3);
    expect(userService.users.pop()).toEqual(newUser);
  });

  it('should update user', () => {
    userService.updateUser(1, {name: 'Duke'});

    const user = userService.getUser(1);

    expect(user.name).toBe('Duke');
  });

  describe('login', () => {
    it('should be done', () => {
      userService.login(user);

      expect(mockAuth.login).toHaveBeenCalledWith(user);
    });

    it('should show successful message for success', () => {
      userService.login(user);

      expect(logSpy).toHaveBeenCalledWith('Successful login');
    });

    it('should throw error on failed login', () => {
      mockAuth.login.mockReturnValue(false);

      expect(() => userService.login(user)).toThrowError('Failed login');
    });
  });

  it('should delete user', () => {
    userService.removeUser(1)

    expect(userService.getUser(1)).toBeNull()
  });

  it('should fetch users', async () => {
    const usersFromServer = [
      {id: 3, name: 'Vernon'},
      {id: 4, name: 'Will'},
      {id: 5, name: 'Jimbo'}
    ];
    const mockResponse = {data: usersFromServer};

    axios.get.mockResolvedValue(mockResponse);

    const users = await userService.fetchUsers();

    expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/users');
    expect(users).toEqual(usersFromServer);
  });
});
