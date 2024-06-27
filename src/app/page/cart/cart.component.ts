import { Component, OnInit } from '@angular/core';
import { ProductDetailResponse } from 'src/app/dtos/response/detail.product.response';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  totalAmount: number = 0;
  cart!: any;
  productDetails: { productDetail: ProductDetailResponse, quantity: number, selected: boolean }[] = [];


  constructor(private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    console.log(this.cart);
    this.cart.forEach((quantity: number, productId: number) => {
      console.log(productId, quantity);
      this.productService.getProductById(productId).subscribe({
        next: (response: any) => {
          console.log(response);
          this.productDetails.push({ productDetail: response, quantity, selected: false });
          console.log('productDetail:' + this.productDetails);
        },
        complete: () => {
          console.log(this.productDetails);
          console.log(this.productDetails[0].productDetail.name);
        },
        error: (error: any) => {
          console.log(error);
        }
      }
      )
    })
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.productDetails.reduce((total, item) => {
      if (item.selected) {
        return total + (item.productDetail.price * item.quantity);
      }
      return total;
    }, 0);
  }

  toggleSelection(index: number): void {
    this.productDetails[index].selected = !this.productDetails[index].selected;
    this.calculateTotalAmount(); // Recalculate total amount after selection is toggled
  }

}
