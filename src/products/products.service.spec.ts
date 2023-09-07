import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products: Product[] = [
        {
          id: 1,
          name: 'Product 1',
          price: 10.99,
        },
        {
          id: 2,
          name: 'Product 2',
          price: 15.99,
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(products);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      const productId = 1;
      const product: Product = {
        id: productId,
        name: 'Product 1',
        price: 10.99,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(product);

      const result = await service.findOne(productId);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: productId } });
      expect(result).toEqual(product);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductInput: UpdateProductInput = {
        id: 1,
        name: 'Updated Product',
        price: 20.99,
      };

      const updatedProduct: Product = {
        id: 1,
        name: 'Updated Product',
        price: 20.99,
      };

      jest.spyOn(repository, 'save').mockResolvedValue(updatedProduct);

      const result = await service.update(updateProductInput);

      expect(repository.save).toHaveBeenCalledWith(updateProductInput);
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createProductInput: CreateProductInput = {
        name: 'Product 1',
        price: 10.99,
      };

      const newProduct: Product = {
        id: 1,
        name: 'Product 1',
        price: 10.99,
      };

      jest.spyOn(repository, 'create').mockReturnValue(newProduct);
      jest.spyOn(repository, 'save').mockResolvedValue(newProduct);

      const result = await service.create(createProductInput);

      expect(repository.create).toHaveBeenCalledWith(createProductInput);
      expect(repository.save).toHaveBeenCalledWith(newProduct);
      expect(result).toEqual(newProduct);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const productId = 1;
      const product: Product = {
        id: productId,
        name: 'Product 1',
        price: 10.99,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(product);
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      const result = await service.remove(productId);

      expect(service.findOne).toHaveBeenCalledWith(productId);
      expect(repository.delete).toHaveBeenCalledWith(productId);
      expect(result).toEqual(product);
    });
  });
});