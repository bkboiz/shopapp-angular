import { Injectable, NgModule } from "@angular/core";
import { DetailProductComponent } from "./page/detail-product/detail-product.component";
import { HomeComponent } from "./page/home/home.component";
import { LoginComponent } from "./page/login/login.component";
import { OrderConfirmComponent } from "./page/order-confirm/order-confirm.component";
import { OrderComponent } from "./page/order/order.component";
import { RegisterComponent } from "./page/register/register.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'product/:id', component: DetailProductComponent },
    { path: 'order', component: OrderComponent },
    { path: 'order/:id', component: OrderConfirmComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }