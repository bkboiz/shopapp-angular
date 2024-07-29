import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cart!: any;
  cartItemCnt: number = 0;
  notificationCnt: number = 0;
  username: string | null = null;
  isDropdownVisible = false;
  constructor(private cartService: CartService,
    private userService: UserService) { }

  ngOnInit(): void {
    // this.cartItemCnt = this.cartService.getCartItemCnt();
    // this.cartService.cartItemCount$.subscribe(count => {
    //   console.log("count:" + count)
    //   this.cartItemCnt += count;
    // });
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCnt += count;
    });
    console.log("cartItemcnt: " + this.cartItemCnt);
    const user = localStorage.getItem('user');
    console.log('user', user);
    if (user) {
      this.username = JSON.parse(user).fullName;
      console.log(this.username);

      //cart
      var userId = JSON.parse(user).userId;
      this.cartService.getCartByUserId(userId).subscribe({
        next: (response: any) => {
          console.log("cart", response);
          this.cart = response;
          this.cartItemCnt = 0;
          this.cart.forEach((item: any) => this.cartItemCnt += item.quantity);
          console.log('cnt', this.cartItemCnt);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      }
      )
    } else {
      this.userService.user$.subscribe(user => {
        this.username = user ? user.fullName : null;
      });
    }
  }

  logout() {
    this.username = null;
    localStorage.removeItem('user');
  }
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

}
