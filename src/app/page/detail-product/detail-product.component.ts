import { Component, OnInit } from '@angular/core';
import { ProductDetailResponse } from 'src/app/dtos/response/detail.product.response';
import { Product } from 'src/app/dtos/response/product.response';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  currentImageIndex: number = 0;
  totalImage: number = 0;
  productId: number = 1;
  product: Product | undefined;
  imageUrls!: string[];
  productDetail!: ProductDetailResponse;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.productDetail = response;
        this.totalImage = this.productDetail.productImages.length;
      },
      complete: () => {

      },
      error: (error: any) => {
        debugger
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
}
;
