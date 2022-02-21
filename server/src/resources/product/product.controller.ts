import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/shared/http-exception.filter';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
import { ProductService } from './product.service';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async findAll() {
    return await this.productService.findAll();
  }
}
