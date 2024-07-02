import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDetailResponse } from 'src/app/dtos/response/detail.product.response';
import { Product } from 'src/app/dtos/response/product.response';
import { CartService } from 'src/app/service/cart.service';
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
  isBorderVisible: boolean = false;

  productId!: number;
  quantity!: number;
  totalAmount!: number;
  productDetail!: ProductDetailResponse;
  selectedProducts: { productDetail: ProductDetailResponse, quantity: number; }[] = [];
  paymentType: any;

  constructor(private dataService: DataService,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    // this.productId = this.dataService.getProductId();
    // this.quantity = this.dataService.getQuantity();

    // this.productService.getProductById(this.productId).subscribe({
    //   next: (response: any) => {
    //     console.log(response);
    //     this.productDetail = response;
    //     console.log('product name:' + this.productDetail.name);
    //   },
    //   complete: () => {

    //   },
    //   error: (error: any) => {
    //     debugger
    //     console.log(error);
    //   }
    // })
    this.selectedProducts = this.cartService.getSelectedProducts();
    this.totalAmount = this.selectedProducts.reduce((total, item) => {
      return total + (item.productDetail.price * item.quantity);
    }, 0);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }

  toggleBorder() {
    this.isBorderVisible = !this.isBorderVisible;
  }

}
