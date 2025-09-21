import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './enity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductEntityDto } from './enity/create.product.dto';
import { EditProductEntityDto } from './enity/edit.product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) { }

    async create(product: CreateProductEntityDto): Promise<ProductEntity> {
        try {
            if (!product) throw 'No product data';
            const newProduct = this.productRepository.create(product);
            return await this.productRepository.save(newProduct);
        } catch (error) {
            return error;
        }
    }

    async findAll(): Promise<ProductEntity[] > {
        try {
            const products= await this.productRepository.find();
            if(products.length==0) throw new NotFoundException('No products found');
            return products;
        } catch(error) {
            throw error;
        }
    }

    async editById(id: number, product: EditProductEntityDto): Promise<ProductEntity> {
        try {
            if (!id) throw new BadRequestException('no id provided');
            if (!product) throw new BadRequestException('no product data provided');
            const productFind = await this.productRepository.findOne({ where: { id: id } });
            if (!productFind) throw new NotFoundException('product is not found');

            productFind.name = product.name ?? productFind.name;
            productFind.price = product.price ?? productFind.price;
            return await this.productRepository.save(productFind);
        } catch (error) {
            throw error;
        }
    }

}
