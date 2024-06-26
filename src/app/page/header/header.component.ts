import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartItemCnt: number = 0;
  notificationCnt: number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItemCnt = this.cartService.getCartItemCnt();
    this.cartService.cartItemCount$.subscribe(count => {
      console.log("count:" + count)
      this.cartItemCnt += count;
    });
    console.log("cartItemcnt: " + this.cartItemCnt);
  }

}
