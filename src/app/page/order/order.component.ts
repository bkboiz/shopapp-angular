import { Component, OnInit } from '@angular/core';
import { ProductDetailResponse } from 'src/app/dtos/response/detail.product.response';
import { Product } from 'src/app/dtos/response/product.response';
import { DataService } from 'src/app/service/data.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  fullName!: string;
  email!: string;
  phoneNumber!: string;
  address!: string;
  note!: string;
  shippingMethod!: string;
  paymentMethod!: string;

  productId!: number;
  quantity!: number;
  productDetail!: ProductDetailResponse;

  constructor(private dataService: DataService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productId = this.dataService.getProductId();
    this.quantity = this.dataService.getQuantity();

    this.productService.getProductById(this.productId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.productDetail = response;
        console.log(this.productDetail.name);
      },
      complete: () => {

      },
      error: (error: any) => {
        debugger
        console.log(error);
      }
    })
  }

}
