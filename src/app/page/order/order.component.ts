import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDetailResponse } from 'src/app/dtos/response/detail.product.response';
import { OrderDetail } from 'src/app/dtos/response/order.detail';
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
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.selectedProducts = this.cartService.getSelectedProducts();
    this.totalAmount = this.selectedProducts.reduce((total, item) => {
      return total + (item.productDetail.price * item.quantity);
    }, 0);
  }

  orderNow() {
    var data = {
      fullName: this.fullName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address,
      note: this.note,
      shippingMethod: this.shippingMethod,
      bankCode: this.bankCode,
    }
    console.log(data);
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

}
