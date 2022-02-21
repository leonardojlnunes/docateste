import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteApi } from 'src/app/enums/route-api';
import { Product } from 'src/app/interfaces/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  /**
   * Busca de produtos
   * @returns lista de produtos
   */
  public getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.server + RouteApi.PRODUCT);
  }
}
