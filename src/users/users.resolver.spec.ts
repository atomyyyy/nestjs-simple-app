import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    userService = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserInput: CreateUserInput = {
        name: 'New User',
        email: 'newuser@example.com',
        age: 35,
        order: [],
      };

      const createdUser: User = {
        id: 1,
        name: 'New User',
        email: 'newuser@example.com',
        age: 35,
        order: [],
      };

      jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

      const result = await resolver.createUser(createUserInput);

      expect(userService.create).toHaveBeenCalledWith(createUserInput);
      expect(result).toEqual(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        { id: 1, name: 'User 1', email: 'user1@example.com', age: 25, order: [] },
        { id: 2, name: 'User 2', email: 'user2@example.com', age: 30, order: [] },
      ];

      jest.spyOn(userService, 'findAll').mockResolvedValue(users);

      const result = await resolver.findAll();

      expect(userService.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const userId = 1;
      const user: User = {
        id: userId,
        name: 'User 1',
        email: 'user1@example.com',
        age: 25,
        order: [],
      };

      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      const result = await resolver.findOne(userId);

      expect(userService.findOne).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updateUserInput: UpdateUserInput = {
        id: 1,
        name: 'Updated User',
        email: 'updateduser@example.com',
        age: 30,
        order: [],
      };

      const updatedUser: User = {
        id: 1,
        name: 'Updated User',
        email: 'updateduser@example.com',
        age: 30,
        order: [],
      };

      jest.spyOn(userService, 'update').mockResolvedValue(updatedUser);

      const result = await resolver.updateUser(updateUserInput);

      expect(userService.update).toHaveBeenCalledWith(updateUserInput);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('removeUser', () => {
    it('should remove a user', async () => {
      const userId = 1;
      const user: User = {
        id: userId,
        name: 'User 1',
        email: 'user1@example.com',
        age: 25,
        order: [],
      };

      jest.spyOn(userService, 'remove').mockResolvedValue(user);

      const result = await resolver.removeUser(userId);

      expect(userService.remove).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });
  });
});