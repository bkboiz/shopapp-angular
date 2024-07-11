import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {
  response!: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    debugger
    const responseCode = this.route.snapshot.queryParamMap.get('vnp_ResponseCode');
    console.log(responseCode);
    if (responseCode) {
      this.response = responseCode;
      console.log(this.response);
    }
  }

}
