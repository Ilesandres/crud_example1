import {  IsNumber, IsOptional, IsString } from "class-validator";

export class EditProductEntityDto{
    @IsOptional()
    @IsString()
    name:string;
    @IsOptional()
    @IsNumber()
    price:number;
}