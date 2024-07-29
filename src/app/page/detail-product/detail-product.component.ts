import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProductDetailResponse } from 'src/app/dtos/response/detail.product.response';
import { Product } from 'src/app/dtos/response/product.response';
import { CartService } from 'src/app/service/cart.service';
import { DataService } from 'src/app/service/data.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  currentImageIndex: number = 0;
  totalImage: number = 0;
  productId: number = 0;
  quantity: number = 0;
  product: Product | undefined;
  imageUrls!: string[];
  productDetail!: ProductDetailResponse;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productId = id !== null ? +id : +0;
    this.productService.getProductById(this.productId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.productDetail = response;
        console.log(this.productDetail);
        this.totalImage = this.productDetail.productImages.length;
      },
      complete: () => {

      },
      error: (error: any) => {
        console.log(error);
      }
    })

  }

  nextImage() {
    this.currentImageIndex = this.currentImageIndex == this.totalImage - 1 ? 0 : this.currentImageIndex + 1;
  }

  previousImage() {
    this.currentImageIndex = this.currentImageIndex == 0 ? this.totalImage - 1 : this.currentImageIndex - 1;
  }

  selectThumbnail(idx: number) {
    console.log(idx);
    this.currentImageIndex = idx;
  }

  addToCart() {
    if (this.productDetail) {
      const user = localStorage.getItem('user');

      if (!user) {
        this.router.navigate(['/login']);
        return;
      }

      const userId = JSON.parse(user).userId;
      var cartDTO = {
        userId: userId,
        productId: this.productDetail.id,
        quantity: this.quantity
      };
      const jsonData = JSON.stringify(cartDTO);
      this.cartService.addToCart(jsonData).subscribe({
        next: (response: any) => {
          this.cartService.updateCartCount(this.quantity);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    } else {
      console.error('Lỗi khi thêm giỏ hàng, product = ', this.product);
    }
  }

  buyNow() {
    this.addToCart();
    this.cartService.setProductBuyNow(this.productId);
    this.router.navigate(['/cart']);
  }

  increaseQuantity() {
    this.quantity++;
  }
  decreaseQuantity() {
    this.quantity = this.quantity == 0 ? 0 : this.quantity - 1;
  }
}
;
