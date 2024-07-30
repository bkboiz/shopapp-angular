import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDetailResponse } from 'src/app/dtos/response/detail.product.response';
import { OrderDetail } from 'src/app/dtos/response/order.detail';
import { CartService } from 'src/app/service/cart.service';
import { DataService } from 'src/app/service/data.service';
import { LocalStorageService } from 'src/app/service/localstorage.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  userId!: number;
  fullName!: string;
  email!: string;
  phoneNumber!: string;
  address!: string;
  note!: string;
  shippingMethod!: string;
  paymentMethod!: string;
  bankCode!: string;
  isBorderVisible: boolean = false;

  productId!: number;
  quantity!: number;
  totalAmount!: number;
  productDetail!: ProductDetailResponse;
  selectedProducts: { productDetail: ProductDetailResponse, quantity: number; }[] = [];
  paymentType: any;
  orderDetails: OrderDetail[] = [];

  constructor(private dataService: DataService,
    private productService: ProductService,
    private orderService: OrderService,
    private cartService: CartService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selectedProducts = this.cartService.getSelectedProducts();
    this.totalAmount = this.selectedProducts.reduce((total, item) => {
      return total + (item.productDetail.price * item.quantity);
    }, 0);
  }

  orderNow() {
    this.userId = this.localStorageService.getUserId();
    if (this.userId == 0) {
      this.router.navigate(['/login']);
    }

    var orderDetailRequest = this.selectedProducts.map(product => {
      return {
        productId: product.productDetail.id,
        quantity: product.quantity,
        price: product.productDetail.price,
        totalMoney: product.productDetail.price * product.quantity
      }
    })

    var data = {
      userId: this.userId,
      fullName: this.fullName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address,
      note: this.note,
      shippingMethod: this.shippingMethod,
      paymentMethod: this.paymentMethod,
      bankCode: this.bankCode,
      totalMoney: this.totalAmount,
      lstOrderDetail: orderDetailRequest
    }
    console.log('order info', data);
    this.orderService.order(data).subscribe({
      next: (response: any) => {
        console.log(response.data);
        window.location.href = response.data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }

  toggleBorder() {
    this.isBorderVisible = !this.isBorderVisible;
  }

  selectBank(bankCode: string) {
    this.bankCode = bankCode;
  }

  onPaymentMethodChange() {
    this.bankCode = '';
  }

}
