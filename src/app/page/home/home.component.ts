import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/dtos/response/category.response';
import { Product } from 'src/app/dtos/response/product.response';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  currentPage: number = 1;
  itemPerPage: number = 15;
  pages: number[] = [];
  totalPages: number = 0;
  keyword: string = '';
  visiblePages: number[] = [];
  selectedCategory: number = 0;

  constructor(private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProduct(this.currentPage, this.itemPerPage, this.selectedCategory, this.keyword);
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response;

      },
      complete: () => {

      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  getProduct(page: number, limit: number, categoryId: number, keyword: string) {
    this.productService.getProducts(page, limit, categoryId, keyword).subscribe({
      next: (response: any) => {
        response.lstProduct.forEach((product: Product) => {
          product.url = product.thumbnail != null ? `http://localhost:8039/api/v1/product/images/${product.thumbnail}` : "";
        });
        this.products = response.lstProduct;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArr(this.currentPage, this.totalPages);
      },
      complete: () => {

      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  generateVisiblePageArr(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }

  onSearchChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.keyword = inputElement.value;
    console.log(this.keyword);
    this.getProduct(this.currentPage, this.itemPerPage, this.selectedCategory, this.keyword);
  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = Number(selectElement.value);
    console.log(this.selectedCategory);
  }

  goToLastPage() {
    this.currentPage = this.totalPages;
    this.getProduct(this.currentPage, this.itemPerPage, this.selectedCategory, this.keyword);
  }
  goToNextPage() {
    this.currentPage = Math.min(this.currentPage + 1, this.totalPages);
    this.getProduct(this.currentPage, this.itemPerPage, this.selectedCategory, this.keyword);
  }
  goToPrevPage() {
    this.currentPage = Math.max(this.currentPage - 1, 1);
    this.getProduct(this.currentPage, this.itemPerPage, this.selectedCategory, this.keyword);
  }
  goToFirstPage() {
    this.currentPage = 1;
    this.getProduct(this.currentPage, this.itemPerPage, this.selectedCategory, this.keyword);
  }

}
