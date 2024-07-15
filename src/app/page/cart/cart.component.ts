import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isAllSelected: boolean = false;
  productDetails: { productDetail: ProductDetailResponse, quantity: number, selected: boolean }[] = [];
  selectedProducts: { productDetail: ProductDetailResponse, quantity: number }[] = [];;


  constructor(private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let productIdBuyNow = this.cartService.getProductBuyNow();
    this.cart = this.cartService.getCart();
    this.cart.forEach((quantity: number, productId: number) => {
      this.productService.getProductById(productId).subscribe({
        next: (response: any) => {
          console.log(productIdBuyNow, response.id);
          if (response.id == productIdBuyNow) {
            this.productDetails.push({ productDetail: response, quantity, selected: true });
            this.selectedProducts.push({ productDetail: response, quantity });
          } else {
            this.productDetails.push({ productDetail: response, quantity, selected: false });
          }
        },
        complete: () => {
          this.calculateTotalAmount();
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    });
  }

  calculateTotalAmount(): void {

    this.totalAmount = this.productDetails.reduce((total, item) => {
      if (item.selected) {

        return total + (item.productDetail.price * item.quantity);
      }
      return total;
    }, 0);
    ;
  }

  toggleSelection(index: number): void {
    this.productDetails[index].selected = !this.productDetails[index].selected;
    this.calculateTotalAmount(); // Recalculate total amount after selection is toggled

    const product = this.productDetails[index];
    const selectedIdx = this.selectedProducts.indexOf(product);
    if (selectedIdx > -1) {
      // Sản phẩm đã được chọn, loại bỏ khỏi danh sách chọn
      this.selectedProducts.splice(selectedIdx, 1);
    } else {
      this.selectedProducts.push(product);
    }

    // Cập nhật danh sách sản phẩm đã chọn vào service
    this.cartService.setSelectedProducts(this.selectedProducts);

    this.checkSelectAll();
  }

  toggleSelectAll(event: any): void {
    const isChecked = event.target.checked;
    console.log(isChecked);
    this.selectedProducts = [];

    this.productDetails.forEach((item, index) => {
      item.selected = isChecked;
      if (isChecked) {
        this.selectedProducts.push(item);
      }
    });
    console.log('productDetails', this.productDetails)

    // Cập nhật danh sách sản phẩm đã chọn vào service
    this.cartService.setSelectedProducts(this.selectedProducts);
    this.calculateTotalAmount(); // Recalculate total amount after selection is toggled

    this.isAllSelected = isChecked;
  }

  isSelected(idx: number): boolean {
    return this.productDetails[idx].selected;
  }

  checkSelectAll(): void {
    // Kiểm tra xem tất cả các sản phẩm đã được chọn hay chưa
    this.isAllSelected = this.productDetails.every(item => item.selected);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }

  order() {
    this.router.navigate(['/order']);
  }

  increaseQuantity(idx: number) {
    this.productDetails[idx].quantity = this.productDetails[idx].quantity + 1;
  }
  decreaseQuantity(idx: number) {
    this.productDetails[idx].quantity = this.productDetails[idx].quantity - 1;
  }

}
