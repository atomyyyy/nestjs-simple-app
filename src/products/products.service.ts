import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: Product['id']): Promise<Product> {
    return await this.productRepository.findOne({
      where: { id }
    })
  }

  async update(product: UpdateProductInput): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async create(productInput: CreateProductInput): Promise<Product> {
    const newProduct = this.productRepository.create(productInput);

    return this.productRepository.save(newProduct);
  }

  async remove(id: Product['id']): Promise<Product> {
    const product = this.findOne(id);
    await this.productRepository.delete(id);

    return product;
  }
}