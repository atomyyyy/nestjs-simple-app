import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

describe('ProductsResolver', () => {
  let resolver: ProductsResolver;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsResolver,
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
    productsService = module.get<ProductsService>(ProductsService);
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const createProductInput: CreateProductInput = {
        name: 'Product 1',
        price: 10.99,
      };

      const createdProduct: Product = {
        id: 1,
        name: 'Product 1',
        price: 10.99,
      };

      jest.spyOn(productsService, 'create').mockResolvedValue(createdProduct);

      const result = await resolver.createProduct(createProductInput);

      expect(productsService.create).toHaveBeenCalledWith(createProductInput);
      expect(result).toEqual(createdProduct);
    });
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

      jest.spyOn(productsService, 'findAll').mockResolvedValue(products);

      const result = await resolver.findAll();

      expect(productsService.findAll).toHaveBeenCalled();
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

      jest.spyOn(productsService, 'findOne').mockResolvedValue(product);

      const result = await resolver.findOne(productId);

      expect(productsService.findOne).toHaveBeenCalledWith(productId);
      expect(result).toEqual(product);
    });
  });

  describe('updateProduct', () => {
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

      jest.spyOn(productsService, 'update').mockResolvedValue(updatedProduct);

      const result = await resolver.updateProduct(updateProductInput);

      expect(productsService.update).toHaveBeenCalledWith(updateProductInput);
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('removeProduct', () => {
    it('should remove a product', async () => {
      const productId = 1;
      const product: Product = {
        id: productId,
        name: 'Product 1',
        price: 10.99,
      };

      jest.spyOn(productsService, 'remove').mockResolvedValue(product);

      const result = await resolver.removeProduct(productId);

      expect(productsService.remove).toHaveBeenCalledWith(productId);
      expect(result).toEqual(product);
    });
  });
});