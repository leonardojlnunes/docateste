import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  /**
   * Consultar produtos
   * @param productService retorna lista de produtos
   */
  constructor(private productService: ProductService) {
    this.productService.getAll().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
    });
  }

  ngOnInit(): void {}
}
