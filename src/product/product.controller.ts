import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './enity/product.entity';
import { CreateProductEntityDto } from './enity/create.product.dto';
import { EditProductEntityDto } from './enity/edit.product.dto';
import { error } from 'console';

@Controller('product')
export class ProductController {
    constructor (
        private readonly productService:ProductService
    ){}

    @Get('/all')
    async getAll ():Promise<any>{
        try {
            return await this.productService.findAll()
        } catch (error) {
            throw error;
        }
    }

    @Post('/create')
    async create(@Body() dto:CreateProductEntityDto):Promise<any>{
        try {
            return await this.productService.create(dto);
        } catch (error) {
            throw error;
        }
    }

    @Post('/edit/:id')
    async editById(@Param('id') id :number, @Body() dto:EditProductEntityDto):Promise<any>{
        try{
            return await this.productService.editById(id,dto);
        }catch(error){
            throw error;
        }
    }
}
