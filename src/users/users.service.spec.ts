import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        { id: 1, name: 'User 1', email: 'user1@example.com', age: 25, order: [] },
        { id: 2, name: 'User 2', email: 'user2@example.com', age: 30, order: [] },
      ];

      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      const result = await service.findAll();

      expect(userRepository.find).toHaveBeenCalledWith({ relations: ['order'] });
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

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await service.findOne(userId);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
        relations: ['order'],
      });
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
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

      jest.spyOn(userRepository, 'save').mockResolvedValue(updatedUser);
      jest.spyOn(service, 'findOne').mockResolvedValue(updatedUser);

      const result = await service.update(updateUserInput);

      expect(userRepository.save).toHaveBeenCalledWith(updateUserInput);
      expect(service.findOne).toHaveBeenCalledWith(updateUserInput.id);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserInput: CreateUserInput = {
        name: 'New User',
        email: 'newuser@example.com',
        age: 35,
        order: [],
      };

      const newUser: User = {
        id: 1,
        name: 'New User',
        email: 'newuser@example.com',
        age: 35,
        order: [],
      };

      jest.spyOn(userRepository, 'create').mockReturnValue(newUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(newUser);

      const result = await service.create(createUserInput);

      expect(userRepository.create).toHaveBeenCalledWith(createUserInput);
      expect(userRepository.save).toHaveBeenCalledWith(newUser);
      expect(result).toEqual(newUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = 1;
      const user: User = {
        id: userId,
        name: 'User 1',
        email: 'user1@example.com',
        age: 25,
        order: [],
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'delete').mockResolvedValue({} as any);

      const result = await service.remove(userId);

      expect(service.findOne).toHaveBeenCalledWith(userId);
      expect(userRepository.delete).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });
  });
});